import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertAssessmentResponseSchema, insertCorporateProfileSchema, insertLeadershipAssessmentResultSchema, insertMiddleManagementAssessmentResultSchema, insertTeamCommunicationAssessmentResultSchema, insertCareerGrowthAssessmentResultSchema, insertSalesAssessmentResultSchema, insertIndividualAssessmentResultSchema, updateProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Profile routes
  app.get('/api/profile', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put('/api/profile', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      
      // Validate request body
      const validatedData = updateProfileSchema.parse(req.body);
      
      const updatedUser = await storage.updateUserProfile(userId, {
        ...validatedData,
        profileCompleted: 'true',
      });
      
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Assessment routes
  app.post('/api/assessments', async (req, res) => {
    try {
      const validatedData = insertAssessmentResponseSchema.parse(req.body);
      const assessment = await storage.saveAssessmentResponse(validatedData);
      res.json(assessment);
    } catch (error) {
      console.error("Error saving assessment:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save assessment" });
      }
    }
  });

  app.get('/api/assessments', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const assessments = await storage.getUserAssessments(userId);
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  app.get('/api/assessments/:type', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const { type } = req.params;
      const assessment = await storage.getAssessmentByTypeAndUser(userId, type);
      res.json(assessment);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });

  // Leadership assessment routes
  app.post('/api/leadership-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertLeadershipAssessmentResultSchema.parse({
        ...req.body,
        userId,
      });
      const result = await storage.saveLeadershipAssessmentResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving leadership assessment result:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save leadership assessment result" });
      }
    }
  });

  app.get('/api/leadership-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const results = await storage.getUserLeadershipAssessmentResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching leadership assessment results:", error);
      res.status(500).json({ message: "Failed to fetch leadership assessment results" });
    }
  });

  app.get('/api/leadership-assessment/latest', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const result = await storage.getLatestLeadershipAssessmentResult(userId);
      if (!result) {
        return res.status(404).json({ message: "No assessment results found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching latest leadership assessment result:", error);
      res.status(500).json({ message: "Failed to fetch latest leadership assessment result" });
    }
  });

  // Middle management assessment routes
  app.post('/api/middle-management-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertMiddleManagementAssessmentResultSchema.parse({
        ...req.body,
        userId,
      });
      const result = await storage.saveMiddleManagementAssessmentResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving middle management assessment result:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save middle management assessment result" });
      }
    }
  });

  app.get('/api/middle-management-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const results = await storage.getUserMiddleManagementAssessmentResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching middle management assessment results:", error);
      res.status(500).json({ message: "Failed to fetch middle management assessment results" });
    }
  });

  app.get('/api/middle-management-assessment/latest', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const result = await storage.getLatestMiddleManagementAssessmentResult(userId);
      if (!result) {
        return res.status(404).json({ message: "No assessment results found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching latest middle management assessment result:", error);
      res.status(500).json({ message: "Failed to fetch latest middle management assessment result" });
    }
  });

  // Team communication assessment routes
  app.post('/api/team-communication-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertTeamCommunicationAssessmentResultSchema.parse({
        ...req.body,
        userId,
      });
      const result = await storage.saveTeamCommunicationAssessmentResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving team communication assessment result:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save team communication assessment result" });
      }
    }
  });

  app.get('/api/team-communication-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const results = await storage.getUserTeamCommunicationAssessmentResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching team communication assessment results:", error);
      res.status(500).json({ message: "Failed to fetch team communication assessment results" });
    }
  });

  app.get('/api/team-communication-assessment/latest', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const result = await storage.getLatestTeamCommunicationAssessmentResult(userId);
      if (!result) {
        return res.status(404).json({ message: "No assessment results found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching latest team communication assessment result:", error);
      res.status(500).json({ message: "Failed to fetch latest team communication assessment result" });
    }
  });

  // Career growth assessment routes
  app.post('/api/career-growth-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertCareerGrowthAssessmentResultSchema.parse({
        ...req.body,
        userId,
      });
      const result = await storage.saveCareerGrowthAssessmentResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving career growth assessment result:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save career growth assessment result" });
      }
    }
  });

  app.get('/api/career-growth-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const results = await storage.getUserCareerGrowthAssessmentResults(userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching career growth assessment results:", error);
      res.status(500).json({ message: "Failed to fetch career growth assessment results" });
    }
  });

  app.get('/api/career-growth-assessment/latest', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const result = await storage.getLatestCareerGrowthAssessmentResult(userId);
      if (!result) {
        return res.status(404).json({ message: "No assessment results found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching latest career growth assessment result:", error);
      res.status(500).json({ message: "Failed to fetch latest career growth assessment result" });
    }
  });

  // Sales assessment routes
  app.post('/api/sales-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertSalesAssessmentResultSchema.parse({
        ...req.body,
        userId,
      });
      const result = await storage.saveSalesAssessmentResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving sales assessment result:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save sales assessment result" });
      }
    }
  });

  app.get('/api/sales-assessment/latest', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const result = await storage.getLatestSalesAssessmentResult(userId);
      if (!result) {
        return res.status(404).json({ message: "No assessment results found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching latest sales assessment result:", error);
      res.status(500).json({ message: "Failed to fetch latest sales assessment result" });
    }
  });

  // Individual assessment routes  
  app.post('/api/individual-assessment', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertIndividualAssessmentResultSchema.parse({
        ...req.body,
        userId,
      });
      const result = await storage.saveIndividualAssessmentResult(validatedData);
      res.json(result);
    } catch (error) {
      console.error("Error saving individual assessment result:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid assessment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save individual assessment result" });
      }
    }
  });

  app.get('/api/individual-assessment/latest', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const result = await storage.getLatestIndividualAssessmentResult(userId);
      if (!result) {
        return res.status(404).json({ message: "No assessment results found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching latest individual assessment result:", error);
      res.status(500).json({ message: "Failed to fetch latest individual assessment result" });
    }
  });

  // Corporate profile routes
  app.post('/api/corporate-profile', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const validatedData = insertCorporateProfileSchema.parse({
        ...req.body,
        userId,
      });
      const profile = await storage.saveCorporateProfile(validatedData);
      res.json(profile);
    } catch (error) {
      console.error("Error saving corporate profile:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save profile" });
      }
    }
  });

  app.get('/api/corporate-profile', async (req: any, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }
      const userId = req.user.id;
      const profile = await storage.getUserCorporateProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching corporate profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // ============ ADMIN ROUTES ============
  // Middleware to check if user is admin
  const isAdmin = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated() || req.user.email !== 'resistanceintellegence@gmail.com') {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // Admin KPI Dashboard - Get stats for time period (24h, 7d, 30d)
  app.get('/api/admin/kpis', isAdmin, async (req: any, res) => {
    try {
      const { period = '7d' } = req.query;
      
      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      switch (period) {
        case '24h':
          startDate.setHours(now.getHours() - 24);
          break;
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
      }

      const kpis = await storage.getAdminKPIs(startDate, now);
      res.json(kpis);
    } catch (error) {
      console.error("Error fetching admin KPIs:", error);
      res.status(500).json({ message: "Failed to fetch KPIs" });
    }
  });

  // Admin Time Series - Get daily stats for charts
  app.get('/api/admin/time-series', isAdmin, async (req: any, res) => {
    try {
      const { period = '30d', metric = 'users' } = req.query;
      
      const now = new Date();
      let startDate = new Date();
      switch (period) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
      }

      const timeSeries = await storage.getAdminTimeSeries(startDate, now, metric as string);
      res.json(timeSeries);
    } catch (error) {
      console.error("Error fetching time series:", error);
      res.status(500).json({ message: "Failed to fetch time series data" });
    }
  });

  // Admin Users Search
  app.get('/api/admin/users', isAdmin, async (req: any, res) => {
    try {
      const { search = '', limit = '50', offset = '0' } = req.query;
      const users = await storage.searchUsers(search as string, parseInt(limit as string), parseInt(offset as string));
      res.json(users);
    } catch (error) {
      console.error("Error searching users:", error);
      res.status(500).json({ message: "Failed to search users" });
    }
  });

  // Admin Get User Details
  app.get('/api/admin/users/:userId', isAdmin, async (req: any, res) => {
    try {
      const { userId } = req.params;
      const userDetails = await storage.getAdminUserDetails(userId);
      if (!userDetails) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(userDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Failed to fetch user details" });
    }
  });

  // Admin Update User
  app.put('/api/admin/users/:userId', isAdmin, async (req: any, res) => {
    try {
      const { userId } = req.params;
      
      // Validate and sanitize update data
      const updateSchema = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        role: z.string().optional(),
        companySize: z.string().optional(),
        industry: z.string().optional(),
        yearsExperience: z.string().optional(),
        primaryGoal: z.string().optional(),
        teamSizeManaged: z.string().optional(),
        decisionEnvironment: z.string().optional(),
      });
      
      const validatedData = updateSchema.parse(req.body);
      const updatedUser = await storage.updateUserProfile(userId, validatedData);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Admin Companies Search
  app.get('/api/admin/companies', isAdmin, async (req: any, res) => {
    try {
      const { search = '', limit = '50', offset = '0' } = req.query;
      const companies = await storage.searchCompanies(search as string, parseInt(limit as string), parseInt(offset as string));
      res.json(companies);
    } catch (error) {
      console.error("Error searching companies:", error);
      res.status(500).json({ message: "Failed to search companies" });
    }
  });

  // Admin Update Company
  app.put('/api/admin/companies/:companyId', isAdmin, async (req: any, res) => {
    try {
      const { companyId } = req.params;
      
      // Validate and sanitize update data
      const updateSchema = z.object({
        name: z.string().optional(),
        segment: z.string().optional(),
        employeeCount: z.number().int().positive().nullable().optional(),
        industry: z.string().optional(),
        plan: z.enum(['free', 'paid']).optional(),
        seats: z.number().int().positive().nullable().optional(),
        utilizationRate: z.number().int().min(0).max(100).nullable().optional(),
      });
      
      const validatedData = updateSchema.parse(req.body);
      const updatedCompany = await storage.updateCompany(companyId, validatedData);
      res.json(updatedCompany);
    } catch (error) {
      console.error("Error updating company:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update company" });
    }
  });

  // Admin Assessments List with Filters
  app.get('/api/admin/assessments', isAdmin, async (req: any, res) => {
    try {
      const { 
        type, 
        resistanceLevel, 
        startDate, 
        endDate, 
        limit = '50', 
        offset = '0' 
      } = req.query;
      
      const filters = {
        type: type as string | undefined,
        resistanceLevel: resistanceLevel as string | undefined,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      };

      const assessments = await storage.getAdminAssessments(
        filters, 
        parseInt(limit as string), 
        parseInt(offset as string)
      );
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Admin Distribution Data - Resistance Bands & Archetypes
  app.get('/api/admin/distribution', isAdmin, async (req: any, res) => {
    try {
      const { period = '30d' } = req.query;
      
      const now = new Date();
      let startDate = new Date();
      switch (period) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
      }

      const distribution = await storage.getAdminDistribution(startDate, now);
      res.json(distribution);
    } catch (error) {
      console.error("Error fetching distribution data:", error);
      res.status(500).json({ message: "Failed to fetch distribution data" });
    }
  });

  // ============ RESISTANCE MAP ROUTES ============

  // Get archetypes filtered by assessment context
  app.get('/api/resistance-map/archetypes', async (req: any, res) => {
    try {
      const context = req.query.context as string | undefined;
      const archetypes = await storage.getArchetypesByContext(context);
      res.json(archetypes);
    } catch (error) {
      console.error("Error fetching archetypes:", error);
      res.status(500).json({ message: "Failed to fetch archetypes" });
    }
  });

  // Get teams for an organization
  app.get('/api/resistance-map/organizations/:orgId/teams', async (req: any, res) => {
    try {
      const { orgId } = req.params;
      const teams = await storage.getTeamsByOrganization(orgId);
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  });

  // Create a team
  app.post('/api/resistance-map/teams', isAdmin, async (req: any, res) => {
    try {
      const team = await storage.createTeam(req.body);
      res.json(team);
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ message: "Failed to create team" });
    }
  });

  // Get team resistance map
  app.get('/api/resistance-map/teams/:teamId', async (req: any, res) => {
    try {
      const { teamId } = req.params;
      const { template = 'leadership_free_v1', window = 'latest_per_person' } = req.query;
      
      const mapData = await storage.getTeamResistanceMap(teamId, template as string, window as string);
      
      if (!mapData) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(mapData);
    } catch (error) {
      console.error("Error fetching team resistance map:", error);
      res.status(500).json({ message: "Failed to fetch team resistance map" });
    }
  });

  // Get organization resistance map
  app.get('/api/resistance-map/organizations/:orgId', async (req: any, res) => {
    try {
      const { orgId } = req.params;
      const { template = 'leadership_free_v1', window = 'latest_per_person' } = req.query;
      
      const mapData = await storage.getOrgResistanceMap(orgId, template as string, window as string);
      
      if (!mapData) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      res.json(mapData);
    } catch (error) {
      console.error("Error fetching organization resistance map:", error);
      res.status(500).json({ message: "Failed to fetch organization resistance map" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
