import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret:
      process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // passport.use(
  //   new LocalStrategy(async (username, password, done) => {
  //     try {
  //       const user = await storage.getUserByUsername(username);
  //       if (!user || !user.password || !(await comparePasswords(password, user.password))) {
  //         return done(null, false, { message: "Invalid username or password" });
  //       }
  //       return done(null, user);
  //     } catch (error) {
  //       return done(error);
  //     }
  //   }),
  // );
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // 👈 Tell Passport to expect `email`
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email); // 👈 Look up by email
          if (
            !user ||
            !user.password ||
            !(await comparePasswords(password, user.password))
          ) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      if (!user) {
        // User not found - session is stale, return null to clear it
        return done(null, null);
      }
      done(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      done(null, null); // Return null instead of error to prevent session loop
    }
  });

  // Register endpoint
  app.post("/api/register", async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Validation
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const user = await storage.createUser({
        email,
        password: await hashPassword(password),
        firstName: firstName || "",
        lastName: lastName || "",
      });

      // Auto-login after successful registration
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Registration successful but login failed" });
        }
        res
          .status(201)
          .json({ success: true, message: "Registration successful", user: { id: user.id, email: user.email } });
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Check if email exists
  app.post("/api/check-email", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const existingUser = await storage.getUserByEmail(email);
      
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      res.status(200).json({ available: true });
    } catch (error) {
      console.error("Email check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!user) {
        return res
          .status(401)
          .json({ error: info.message || "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Login failed" });
        }
        res
          .status(200)
          .json({
            success: true,
            user: { id: user.id, email: user.email },
          });
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
    });
  });

  // Get current user
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(req.user);
  });

  // Forgot password endpoint (placeholder for now)
  app.post("/api/forgot-password", async (req, res) => {
    // For now, just return a success message
    // In production, you'd send an email with reset link
    res.json({
      success: true,
      message: "Password reset instructions sent to your email",
    });
  });
}
