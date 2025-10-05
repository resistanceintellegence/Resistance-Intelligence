import {
  users,
  companies,
  assessmentResponses,
  corporateProfiles,
  leadershipAssessmentResults,
  middleManagementAssessmentResults,
  teamCommunicationAssessmentResults,
  careerGrowthAssessmentResults,
  salesAssessmentResults,
  individualAssessmentResults,
  teams,
  memberships,
  archetypes,
  assessmentTemplates,
  assessmentAttempts,
  archetypeScores,
  derivedMetrics,
  type User,
  type UpsertUser,
  type InsertUser,
  type Company,
  type AssessmentResponse,
  type InsertAssessmentResponse,
  type CorporateProfile,
  type InsertCorporateProfile,
  type LeadershipAssessmentResult,
  type InsertLeadershipAssessmentResult,
  type MiddleManagementAssessmentResult,
  type InsertMiddleManagementAssessmentResult,
  type TeamCommunicationAssessmentResult,
  type InsertTeamCommunicationAssessmentResult,
  type CareerGrowthAssessmentResult,
  type InsertCareerGrowthAssessmentResult,
  type SalesAssessmentResult,
  type InsertSalesAssessmentResult,
  type IndividualAssessmentResult,
  type InsertIndividualAssessmentResult,
  type Team,
  type Archetype,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, like, or, sql, count, inArray } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Email/password auth operations
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: string, profileData: Partial<User>): Promise<User>;
  
  // Assessment operations
  saveAssessmentResponse(assessment: InsertAssessmentResponse): Promise<AssessmentResponse>;
  getUserAssessments(userId: string): Promise<AssessmentResponse[]>;
  getAssessmentByTypeAndUser(userId: string, assessmentType: string): Promise<AssessmentResponse | undefined>;
  
  // Corporate profile operations
  saveCorporateProfile(profile: InsertCorporateProfile): Promise<CorporateProfile>;
  getUserCorporateProfile(userId: string): Promise<CorporateProfile | undefined>;
  
  // Leadership assessment operations
  saveLeadershipAssessmentResult(result: InsertLeadershipAssessmentResult): Promise<LeadershipAssessmentResult>;
  getUserLeadershipAssessmentResults(userId: string): Promise<LeadershipAssessmentResult[]>;
  getLatestLeadershipAssessmentResult(userId: string): Promise<LeadershipAssessmentResult | undefined>;
  
  // Middle management assessment operations
  saveMiddleManagementAssessmentResult(result: InsertMiddleManagementAssessmentResult): Promise<MiddleManagementAssessmentResult>;
  getUserMiddleManagementAssessmentResults(userId: string): Promise<MiddleManagementAssessmentResult[]>;
  getLatestMiddleManagementAssessmentResult(userId: string): Promise<MiddleManagementAssessmentResult | undefined>;
  
  // Team communication assessment operations
  saveTeamCommunicationAssessmentResult(result: InsertTeamCommunicationAssessmentResult): Promise<TeamCommunicationAssessmentResult>;
  getUserTeamCommunicationAssessmentResults(userId: string): Promise<TeamCommunicationAssessmentResult[]>;
  getLatestTeamCommunicationAssessmentResult(userId: string): Promise<TeamCommunicationAssessmentResult | undefined>;
  
  // Career growth assessment operations
  saveCareerGrowthAssessmentResult(result: InsertCareerGrowthAssessmentResult): Promise<CareerGrowthAssessmentResult>;
  getUserCareerGrowthAssessmentResults(userId: string): Promise<CareerGrowthAssessmentResult[]>;
  getLatestCareerGrowthAssessmentResult(userId: string): Promise<CareerGrowthAssessmentResult | undefined>;
  
  // Sales assessment operations
  saveSalesAssessmentResult(result: InsertSalesAssessmentResult): Promise<SalesAssessmentResult>;
  getUserSalesAssessmentResults(userId: string): Promise<SalesAssessmentResult[]>;
  getLatestSalesAssessmentResult(userId: string): Promise<SalesAssessmentResult | undefined>;
  
  // Individual assessment operations
  saveIndividualAssessmentResult(result: InsertIndividualAssessmentResult): Promise<IndividualAssessmentResult>;
  getUserIndividualAssessmentResults(userId: string): Promise<IndividualAssessmentResult[]>;
  getLatestIndividualAssessmentResult(userId: string): Promise<IndividualAssessmentResult | undefined>;
  
  // Admin operations
  getAdminKPIs(startDate: Date, endDate: Date): Promise<any>;
  getAdminTimeSeries(startDate: Date, endDate: Date, metric: string): Promise<any>;
  searchUsers(search: string, limit: number, offset: number): Promise<any[]>;
  getAdminUserDetails(userId: string): Promise<any>;
  searchCompanies(search: string, limit: number, offset: number): Promise<any[]>;
  updateCompany(companyId: string, updateData: Partial<Company>): Promise<Company>;
  getAdminAssessments(filters: any, limit: number, offset: number): Promise<any[]>;
  getAdminDistribution(startDate: Date, endDate: Date): Promise<any>;
  
  // Resistance Map operations
  getArchetypesByContext(context?: string): Promise<any[]>;
  getTeamsByOrganization(organizationId: string): Promise<any[]>;
  createTeam(teamData: any): Promise<any>;
  getTeamResistanceMap(teamId: string, templateSlug: string, window: string): Promise<any>;
  getOrgResistanceMap(organizationId: string, templateSlug: string, window: string): Promise<any>;
  
  // Session store for authentication
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      conObject: { connectionString: process.env.DATABASE_URL },
      createTableIfMissing: true,
      tableName: 'sessions'
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }


  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUserProfile(userId: string, profileData: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...profileData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async saveAssessmentResponse(assessment: InsertAssessmentResponse): Promise<AssessmentResponse> {
    const [response] = await db
      .insert(assessmentResponses)
      .values(assessment)
      .returning();
    return response;
  }

  async getUserAssessments(userId: string): Promise<AssessmentResponse[]> {
    return await db
      .select()
      .from(assessmentResponses)
      .where(eq(assessmentResponses.userId, userId))
      .orderBy(desc(assessmentResponses.completedAt));
  }

  async getAssessmentByTypeAndUser(userId: string, assessmentType: string): Promise<AssessmentResponse | undefined> {
    const [assessment] = await db
      .select()
      .from(assessmentResponses)
      .where(and(eq(assessmentResponses.userId, userId), eq(assessmentResponses.assessmentType, assessmentType)))
      .orderBy(desc(assessmentResponses.completedAt))
      .limit(1);
    return assessment;
  }

  async saveCorporateProfile(profile: InsertCorporateProfile): Promise<CorporateProfile> {
    const [corporateProfile] = await db
      .insert(corporateProfiles)
      .values(profile)
      .returning();
    return corporateProfile;
  }

  async getUserCorporateProfile(userId: string): Promise<CorporateProfile | undefined> {
    const [profile] = await db
      .select()
      .from(corporateProfiles)
      .where(eq(corporateProfiles.userId, userId));
    return profile;
  }

  async saveLeadershipAssessmentResult(result: InsertLeadershipAssessmentResult): Promise<LeadershipAssessmentResult> {
    const [assessmentResult] = await db
      .insert(leadershipAssessmentResults)
      .values(result)
      .returning();
    return assessmentResult;
  }

  async getUserLeadershipAssessmentResults(userId: string): Promise<LeadershipAssessmentResult[]> {
    return await db
      .select()
      .from(leadershipAssessmentResults)
      .where(eq(leadershipAssessmentResults.userId, userId))
      .orderBy(desc(leadershipAssessmentResults.completedAt));
  }

  async getLatestLeadershipAssessmentResult(userId: string): Promise<LeadershipAssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(leadershipAssessmentResults)
      .where(eq(leadershipAssessmentResults.userId, userId))
      .orderBy(desc(leadershipAssessmentResults.completedAt))
      .limit(1);
    return result;
  }

  async saveMiddleManagementAssessmentResult(result: InsertMiddleManagementAssessmentResult): Promise<MiddleManagementAssessmentResult> {
    const [assessmentResult] = await db
      .insert(middleManagementAssessmentResults)
      .values(result)
      .returning();
    return assessmentResult;
  }

  async getUserMiddleManagementAssessmentResults(userId: string): Promise<MiddleManagementAssessmentResult[]> {
    return await db
      .select()
      .from(middleManagementAssessmentResults)
      .where(eq(middleManagementAssessmentResults.userId, userId))
      .orderBy(desc(middleManagementAssessmentResults.completedAt));
  }

  async getLatestMiddleManagementAssessmentResult(userId: string): Promise<MiddleManagementAssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(middleManagementAssessmentResults)
      .where(eq(middleManagementAssessmentResults.userId, userId))
      .orderBy(desc(middleManagementAssessmentResults.completedAt))
      .limit(1);
    return result;
  }

  async saveTeamCommunicationAssessmentResult(result: InsertTeamCommunicationAssessmentResult): Promise<TeamCommunicationAssessmentResult> {
    const [assessmentResult] = await db
      .insert(teamCommunicationAssessmentResults)
      .values(result)
      .returning();
    return assessmentResult;
  }

  async getUserTeamCommunicationAssessmentResults(userId: string): Promise<TeamCommunicationAssessmentResult[]> {
    return await db
      .select()
      .from(teamCommunicationAssessmentResults)
      .where(eq(teamCommunicationAssessmentResults.userId, userId))
      .orderBy(desc(teamCommunicationAssessmentResults.completedAt));
  }

  async getLatestTeamCommunicationAssessmentResult(userId: string): Promise<TeamCommunicationAssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(teamCommunicationAssessmentResults)
      .where(eq(teamCommunicationAssessmentResults.userId, userId))
      .orderBy(desc(teamCommunicationAssessmentResults.completedAt))
      .limit(1);
    return result;
  }

  async saveCareerGrowthAssessmentResult(result: InsertCareerGrowthAssessmentResult): Promise<CareerGrowthAssessmentResult> {
    const [assessmentResult] = await db
      .insert(careerGrowthAssessmentResults)
      .values(result)
      .returning();
    return assessmentResult;
  }

  async getUserCareerGrowthAssessmentResults(userId: string): Promise<CareerGrowthAssessmentResult[]> {
    return await db
      .select()
      .from(careerGrowthAssessmentResults)
      .where(eq(careerGrowthAssessmentResults.userId, userId))
      .orderBy(desc(careerGrowthAssessmentResults.completedAt));
  }

  async getLatestCareerGrowthAssessmentResult(userId: string): Promise<CareerGrowthAssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(careerGrowthAssessmentResults)
      .where(eq(careerGrowthAssessmentResults.userId, userId))
      .orderBy(desc(careerGrowthAssessmentResults.completedAt))
      .limit(1);
    return result;
  }

  async saveSalesAssessmentResult(result: InsertSalesAssessmentResult): Promise<SalesAssessmentResult> {
    const [assessmentResult] = await db
      .insert(salesAssessmentResults)
      .values(result)
      .returning();
    return assessmentResult;
  }

  async getUserSalesAssessmentResults(userId: string): Promise<SalesAssessmentResult[]> {
    return await db
      .select()
      .from(salesAssessmentResults)
      .where(eq(salesAssessmentResults.userId, userId))
      .orderBy(desc(salesAssessmentResults.completedAt));
  }

  async getLatestSalesAssessmentResult(userId: string): Promise<SalesAssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(salesAssessmentResults)
      .where(eq(salesAssessmentResults.userId, userId))
      .orderBy(desc(salesAssessmentResults.completedAt))
      .limit(1);
    return result;
  }

  async saveIndividualAssessmentResult(result: InsertIndividualAssessmentResult): Promise<IndividualAssessmentResult> {
    const [assessmentResult] = await db
      .insert(individualAssessmentResults)
      .values(result)
      .returning();
    return assessmentResult;
  }

  async getUserIndividualAssessmentResults(userId: string): Promise<IndividualAssessmentResult[]> {
    return await db
      .select()
      .from(individualAssessmentResults)
      .where(eq(individualAssessmentResults.userId, userId))
      .orderBy(desc(individualAssessmentResults.completedAt));
  }

  async getLatestIndividualAssessmentResult(userId: string): Promise<IndividualAssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(individualAssessmentResults)
      .where(eq(individualAssessmentResults.userId, userId))
      .orderBy(desc(individualAssessmentResults.completedAt))
      .limit(1);
    return result;
  }

  // ============ ADMIN METHODS ============
  async getAdminKPIs(startDate: Date, endDate: Date): Promise<any> {
    const now = new Date();
    
    // Get total and new users
    const [totalUsersResult] = await db.select({ count: count() }).from(users);
    const [newUsersResult] = await db
      .select({ count: count() })
      .from(users)
      .where(and(gte(users.createdAt, startDate), lte(users.createdAt, endDate)));

    // Calculate DAU/WAU/MAU using updatedAt as a proxy for activity
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [dauResult] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.updatedAt, oneDayAgo));
    
    const [wauResult] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.updatedAt, sevenDaysAgo));
    
    const [mauResult] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.updatedAt, thirtyDaysAgo));

    // Get total and new companies
    const [totalCompaniesResult] = await db.select({ count: count() }).from(companies);
    const [newCompaniesResult] = await db
      .select({ count: count() })
      .from(companies)
      .where(and(gte(companies.createdAt, startDate), lte(companies.createdAt, endDate)));

    // Get paid companies counts
    const [totalPaidCompaniesResult] = await db
      .select({ count: count() })
      .from(companies)
      .where(eq(companies.plan, 'paid'));
    
    // Get paid companies in the selected period
    const [newPaidCompaniesResult] = await db
      .select({ count: count() })
      .from(companies)
      .where(and(
        eq(companies.plan, 'paid'),
        gte(companies.updatedAt, startDate), // Assuming plan change updates updatedAt
        lte(companies.updatedAt, endDate)
      ));

    // Aggregate assessments from all assessment types
    const allAssessmentTables = [
      leadershipAssessmentResults,
      middleManagementAssessmentResults,
      teamCommunicationAssessmentResults,
      careerGrowthAssessmentResults,
      salesAssessmentResults,
      individualAssessmentResults,
    ];

    let totalCompleted = 0;
    let periodCompleted = 0;

    for (const table of allAssessmentTables) {
      const [total] = await db.select({ count: count() }).from(table);
      const [period] = await db
        .select({ count: count() })
        .from(table)
        .where(and(gte(table.completedAt, startDate), lte(table.completedAt, endDate)));
      
      totalCompleted += total.count;
      periodCompleted += period.count;
    }

    // Calculate free to paid conversion rate (new paid companies / new users in period)
    const totalPeriodUsers = newUsersResult.count;
    const newPaidCompanies = newPaidCompaniesResult.count;
    const freeToPayedConversion = totalPeriodUsers > 0 
      ? Math.round((newPaidCompanies / totalPeriodUsers) * 100 * 10) / 10
      : 0;

    // Calculate completion rate (all assessments are completed in this system)
    const completionRate = 100;

    return {
      totalUsers: totalUsersResult.count,
      newUsers: newUsersResult.count,
      dau: dauResult.count,
      wau: wauResult.count,
      mau: mauResult.count,
      totalCompanies: totalCompaniesResult.count,
      newCompanies: newCompaniesResult.count,
      paidCompanies: totalPaidCompaniesResult.count,
      newPaidCompanies: newPaidCompaniesResult.count,
      totalAssessmentsCompleted: totalCompleted,
      periodAssessmentsCompleted: periodCompleted,
      assessmentCompletionRate: completionRate,
      freeToPayedConversion,
      // Placeholder values for features not yet implemented
      assessmentsStarted: periodCompleted, // Same as completed since we don't track "started"
      mrr: 0,
      newMrr: 0,
      churnRate: 0,
      avgTimeToComplete: 0,
      microLearningEnrollments: 0,
      activeLearners: 0,
      moduleCompletionRate: 0,
    };
  }

  async getAdminTimeSeries(startDate: Date, endDate: Date, metric: string): Promise<any> {
    // For 'all' or 'users', return user time series
    if (metric === 'all' || metric === 'users') {
      const results = await db
        .select({
          date: sql<string>`DATE(${users.createdAt})`,
          count: count(),
        })
        .from(users)
        .where(and(gte(users.createdAt, startDate), lte(users.createdAt, endDate)))
        .groupBy(sql`DATE(${users.createdAt})`)
        .orderBy(sql`DATE(${users.createdAt})`);
      return results;
    } else if (metric === 'assessments') {
      // Combine all assessment types
      const results = await db
        .select({
          date: sql<string>`DATE(${leadershipAssessmentResults.completedAt})`,
          count: count(),
        })
        .from(leadershipAssessmentResults)
        .where(and(
          gte(leadershipAssessmentResults.completedAt, startDate),
          lte(leadershipAssessmentResults.completedAt, endDate)
        ))
        .groupBy(sql`DATE(${leadershipAssessmentResults.completedAt})`)
        .orderBy(sql`DATE(${leadershipAssessmentResults.completedAt})`);
      return results;
    } else if (metric === 'companies') {
      const results = await db
        .select({
          date: sql<string>`DATE(${companies.createdAt})`,
          count: count(),
        })
        .from(companies)
        .where(and(gte(companies.createdAt, startDate), lte(companies.createdAt, endDate)))
        .groupBy(sql`DATE(${companies.createdAt})`)
        .orderBy(sql`DATE(${companies.createdAt})`);
      return results;
    }
    return [];
  }

  async searchUsers(search: string, limit: number, offset: number): Promise<any[]> {
    const searchPattern = `%${search}%`;
    const results = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        companySize: users.companySize,
        createdAt: users.createdAt,
        profileCompleted: users.profileCompleted,
        segment: companies.segment,
        plan: companies.plan,
      })
      .from(users)
      .leftJoin(companies, eq(users.companyId, companies.id))
      .where(
        or(
          like(users.email, searchPattern),
          like(users.firstName, searchPattern),
          like(users.lastName, searchPattern)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(desc(users.createdAt));
    return results;
  }

  async getAdminUserDetails(userId: string): Promise<any> {
    const user = await this.getUser(userId);
    if (!user) return null;

    // Get all assessments for this user
    const assessmentCounts = {
      leadership: await db.select({ count: count() }).from(leadershipAssessmentResults).where(eq(leadershipAssessmentResults.userId, userId)),
      middleManagement: await db.select({ count: count() }).from(middleManagementAssessmentResults).where(eq(middleManagementAssessmentResults.userId, userId)),
      teamCommunication: await db.select({ count: count() }).from(teamCommunicationAssessmentResults).where(eq(teamCommunicationAssessmentResults.userId, userId)),
      careerGrowth: await db.select({ count: count() }).from(careerGrowthAssessmentResults).where(eq(careerGrowthAssessmentResults.userId, userId)),
      sales: await db.select({ count: count() }).from(salesAssessmentResults).where(eq(salesAssessmentResults.userId, userId)),
      individual: await db.select({ count: count() }).from(individualAssessmentResults).where(eq(individualAssessmentResults.userId, userId)),
    };

    return {
      ...user,
      assessmentCounts: {
        leadership: assessmentCounts.leadership[0].count,
        middleManagement: assessmentCounts.middleManagement[0].count,
        teamCommunication: assessmentCounts.teamCommunication[0].count,
        careerGrowth: assessmentCounts.careerGrowth[0].count,
        sales: assessmentCounts.sales[0].count,
        individual: assessmentCounts.individual[0].count,
      },
    };
  }

  async searchCompanies(search: string, limit: number, offset: number): Promise<any[]> {
    const searchPattern = `%${search}%`;
    const results = await db
      .select()
      .from(companies)
      .where(like(companies.name, searchPattern))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(companies.createdAt));
    return results;
  }

  async updateCompany(companyId: string, updateData: Partial<Company>): Promise<Company> {
    const [updated] = await db
      .update(companies)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(companies.id, companyId))
      .returning();
    return updated;
  }

  async getAdminAssessments(filters: any, limit: number, offset: number): Promise<any[]> {
    const assessmentTables = [
      { table: leadershipAssessmentResults, type: 'leadership' },
      { table: middleManagementAssessmentResults, type: 'middle-management' },
      { table: teamCommunicationAssessmentResults, type: 'team-communication' },
      { table: careerGrowthAssessmentResults, type: 'career-growth' },
      { table: salesAssessmentResults, type: 'sales' },
      { table: individualAssessmentResults, type: 'individual' },
    ];

    // Filter tables based on type
    const tablesToQuery = filters.type 
      ? assessmentTables.filter(t => t.type === filters.type)
      : assessmentTables;

    const allResults: any[] = [];

    for (const { table, type } of tablesToQuery) {
      const conditions = [];
      
      if (filters.resistanceLevel) {
        conditions.push(eq(table.resistanceLevel, filters.resistanceLevel));
      }
      if (filters.startDate) {
        conditions.push(gte(table.completedAt, filters.startDate));
      }
      if (filters.endDate) {
        conditions.push(lte(table.completedAt, filters.endDate));
      }

      let query = db.select({
        id: table.id,
        userId: table.userId,
        dominantArchetype: table.dominantArchetype,
        resistanceLevel: table.resistanceLevel,
        resistancePercentage: table.resistancePercentage,
        completedAt: table.completedAt,
      }).from(table);

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as any;
      }

      const results = await query.orderBy(desc(table.completedAt));
      // Add type field after fetching
      allResults.push(...results.map(r => ({ ...r, type })));
    }

    // Sort all results by completedAt and apply limit/offset
    allResults.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
    
    return allResults.slice(offset, offset + limit);
  }

  async getAdminDistribution(startDate: Date, endDate: Date): Promise<any> {
    // Get resistance level distribution
    const resistanceDist = await db
      .select({
        resistanceLevel: leadershipAssessmentResults.resistanceLevel,
        count: count(),
      })
      .from(leadershipAssessmentResults)
      .where(and(
        gte(leadershipAssessmentResults.completedAt, startDate),
        lte(leadershipAssessmentResults.completedAt, endDate)
      ))
      .groupBy(leadershipAssessmentResults.resistanceLevel);

    // Get top archetypes
    const archetypeDist = await db
      .select({
        archetype: leadershipAssessmentResults.dominantArchetype,
        count: count(),
      })
      .from(leadershipAssessmentResults)
      .where(and(
        gte(leadershipAssessmentResults.completedAt, startDate),
        lte(leadershipAssessmentResults.completedAt, endDate)
      ))
      .groupBy(leadershipAssessmentResults.dominantArchetype)
      .orderBy(desc(count()))
      .limit(10);

    return {
      resistanceLevels: resistanceDist,
      topArchetypes: archetypeDist,
    };
  }

  // ============ RESISTANCE MAP METHODS ============

  async getArchetypesByContext(context?: string): Promise<Archetype[]> {
    if (context) {
      // Filter by specific assessment context
      const results = await db
        .select()
        .from(archetypes)
        .where(eq(archetypes.context, context))
        .orderBy(archetypes.code);
      return results;
    } else {
      // Return all archetypes if no context specified
      const results = await db.select().from(archetypes).orderBy(archetypes.code);
      return results;
    }
  }

  async getTeamsByOrganization(organizationId: string): Promise<Team[]> {
    const results = await db
      .select()
      .from(teams)
      .where(eq(teams.organizationId, organizationId))
      .orderBy(teams.name);
    return results;
  }

  async createTeam(teamData: any): Promise<Team> {
    const [team] = await db.insert(teams).values(teamData).returning();
    return team;
  }

  async getTeamResistanceMap(teamId: string, templateSlug: string, window: string): Promise<any> {
    // Get the template
    const [template] = await db
      .select()
      .from(assessmentTemplates)
      .where(eq(assessmentTemplates.slug, templateSlug));

    if (!template) {
      return null;
    }

    // Only show paid assessments
    if (template.tier !== 'paid') {
      return {
        series: [],
        meta: { n_people: 0, last_attempt_at: null, tier: template.tier },
        archetypes: [],
      };
    }

    // Get all archetypes for this assessment context
    const allArchetypes = await this.getArchetypesByContext(template.context);

    // Get team members
    const teamMembers = await db
      .select({
        personId: memberships.personId,
      })
      .from(memberships)
      .where(eq(memberships.teamId, teamId));

    if (teamMembers.length === 0) {
      return {
        series: [],
        meta: { n_people: 0, last_attempt_at: null },
        archetypes: allArchetypes,
      };
    }

    const personIds = teamMembers.map(m => m.personId);

    // Query existing assessment result tables based on context
    let assessmentResults: any[] = [];
    const context = template.context;

    if (context === 'leadership') {
      assessmentResults = await db
        .select()
        .from(leadershipAssessmentResults)
        .where(inArray(leadershipAssessmentResults.userId, personIds))
        .orderBy(desc(leadershipAssessmentResults.completedAt));
    } else if (context === 'middle_management') {
      assessmentResults = await db
        .select()
        .from(middleManagementAssessmentResults)
        .where(inArray(middleManagementAssessmentResults.userId, personIds))
        .orderBy(desc(middleManagementAssessmentResults.completedAt));
    } else if (context === 'team_communication') {
      assessmentResults = await db
        .select()
        .from(teamCommunicationAssessmentResults)
        .where(inArray(teamCommunicationAssessmentResults.userId, personIds))
        .orderBy(desc(teamCommunicationAssessmentResults.completedAt));
    } else if (context === 'career_growth') {
      assessmentResults = await db
        .select()
        .from(careerGrowthAssessmentResults)
        .where(inArray(careerGrowthAssessmentResults.userId, personIds))
        .orderBy(desc(careerGrowthAssessmentResults.completedAt));
    } else if (context === 'sales') {
      assessmentResults = await db
        .select()
        .from(salesAssessmentResults)
        .where(inArray(salesAssessmentResults.userId, personIds))
        .orderBy(desc(salesAssessmentResults.completedAt));
    } else if (context === 'individual') {
      assessmentResults = await db
        .select()
        .from(individualAssessmentResults)
        .where(inArray(individualAssessmentResults.userId, personIds))
        .orderBy(desc(individualAssessmentResults.completedAt));
    }

    // Get latest result per person
    const latestByPerson = new Map();
    for (const result of assessmentResults) {
      if (!latestByPerson.has(result.userId)) {
        latestByPerson.set(result.userId, result);
      }
    }

    if (latestByPerson.size === 0) {
      return {
        series: [],
        meta: { n_people: personIds.length, last_attempt_at: null },
        archetypes: allArchetypes,
      };
    }

    // Extract archetype scores from JSONB and aggregate
    const scoresByArchetypeId = new Map();
    
    for (const result of Array.from(latestByPerson.values())) {
      const archetypeScores = result.archetypeScores as any[];
      for (const score of archetypeScores) {
        const archetypeId = score.archetypeId;
        const pct = score.percentageScore; // Use percentageScore from existing data
        
        if (!scoresByArchetypeId.has(archetypeId)) {
          scoresByArchetypeId.set(archetypeId, []);
        }
        scoresByArchetypeId.get(archetypeId).push(pct);
      }
    }

    // Calculate mean and p90 by archetype code
    const meanData: Record<string, number> = {};
    const p90Data: Record<string, number> = {};

    for (const archetype of allArchetypes) {
      const pcts = scoresByArchetypeId.get(archetype.code) || [];
      if (pcts.length > 0) {
        meanData[archetype.shortLabel || archetype.code] = Math.round(pcts.reduce((a: number, b: number) => a + b, 0) / pcts.length);
        const sorted = [...pcts].sort((a: number, b: number) => a - b);
        const p90Index = Math.ceil(sorted.length * 0.9) - 1;
        p90Data[archetype.shortLabel || archetype.code] = sorted[Math.max(0, p90Index)];
      } else {
        meanData[archetype.shortLabel || archetype.code] = 0;
        p90Data[archetype.shortLabel || archetype.code] = 0;
      }
    }

    const latestResults = Array.from(latestByPerson.values());
    const lastAttempt = latestResults.sort((a, b) => 
      new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    )[0];

    return {
      series: [
        { name: "Team Mean", data: meanData },
        { name: "P90", data: p90Data },
      ],
      meta: {
        n_people: latestByPerson.size,
        last_attempt_at: lastAttempt?.completedAt,
      },
      archetypes: allArchetypes,
    };
  }

  async getOrgResistanceMap(organizationId: string, templateSlug: string, window: string): Promise<any> {
    // Get the template
    const [template] = await db
      .select()
      .from(assessmentTemplates)
      .where(eq(assessmentTemplates.slug, templateSlug));

    if (!template) {
      return null;
    }

    // Only show paid assessments
    if (template.tier !== 'paid') {
      return {
        series: [],
        meta: { n_people: 0, last_attempt_at: null, tier: template.tier },
        archetypes: [],
      };
    }

    const allArchetypes = await this.getArchetypesByContext(template.context);

    // Get all users in this organization
    const orgUsers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.companyId, organizationId));

    if (orgUsers.length === 0) {
      return {
        series: [],
        meta: { n_people: 0, last_attempt_at: null },
        archetypes: allArchetypes,
      };
    }

    const personIds = orgUsers.map(u => u.id);

    // Query existing assessment result tables based on context
    let assessmentResults: any[] = [];
    const context = template.context;

    if (context === 'leadership') {
      assessmentResults = await db
        .select()
        .from(leadershipAssessmentResults)
        .where(inArray(leadershipAssessmentResults.userId, personIds))
        .orderBy(desc(leadershipAssessmentResults.completedAt));
    } else if (context === 'middle_management') {
      assessmentResults = await db
        .select()
        .from(middleManagementAssessmentResults)
        .where(inArray(middleManagementAssessmentResults.userId, personIds))
        .orderBy(desc(middleManagementAssessmentResults.completedAt));
    } else if (context === 'team_communication') {
      assessmentResults = await db
        .select()
        .from(teamCommunicationAssessmentResults)
        .where(inArray(teamCommunicationAssessmentResults.userId, personIds))
        .orderBy(desc(teamCommunicationAssessmentResults.completedAt));
    } else if (context === 'career_growth') {
      assessmentResults = await db
        .select()
        .from(careerGrowthAssessmentResults)
        .where(inArray(careerGrowthAssessmentResults.userId, personIds))
        .orderBy(desc(careerGrowthAssessmentResults.completedAt));
    } else if (context === 'sales') {
      assessmentResults = await db
        .select()
        .from(salesAssessmentResults)
        .where(inArray(salesAssessmentResults.userId, personIds))
        .orderBy(desc(salesAssessmentResults.completedAt));
    } else if (context === 'individual') {
      assessmentResults = await db
        .select()
        .from(individualAssessmentResults)
        .where(inArray(individualAssessmentResults.userId, personIds))
        .orderBy(desc(individualAssessmentResults.completedAt));
    }

    // Get latest result per person
    const latestByPerson = new Map();
    for (const result of assessmentResults) {
      if (!latestByPerson.has(result.userId)) {
        latestByPerson.set(result.userId, result);
      }
    }

    if (latestByPerson.size === 0) {
      return {
        series: [],
        meta: { n_people: personIds.length, last_attempt_at: null },
        archetypes: allArchetypes,
      };
    }

    // Extract archetype scores from JSONB and aggregate
    const scoresByArchetypeId = new Map();
    
    for (const result of Array.from(latestByPerson.values())) {
      const archetypeScores = result.archetypeScores as any[];
      for (const score of archetypeScores) {
        const archetypeId = score.archetypeId;
        const pct = score.percentageScore;
        
        if (!scoresByArchetypeId.has(archetypeId)) {
          scoresByArchetypeId.set(archetypeId, []);
        }
        scoresByArchetypeId.get(archetypeId).push(pct);
      }
    }

    // Calculate mean and p90 by archetype code
    const meanData: Record<string, number> = {};
    const p90Data: Record<string, number> = {};

    for (const archetype of allArchetypes) {
      const pcts = scoresByArchetypeId.get(archetype.code) || [];
      if (pcts.length > 0) {
        meanData[archetype.shortLabel || archetype.code] = Math.round(pcts.reduce((a: number, b: number) => a + b, 0) / pcts.length);
        const sorted = [...pcts].sort((a: number, b: number) => a - b);
        const p90Index = Math.ceil(sorted.length * 0.9) - 1;
        p90Data[archetype.shortLabel || archetype.code] = sorted[Math.max(0, p90Index)];
      } else {
        meanData[archetype.shortLabel || archetype.code] = 0;
        p90Data[archetype.shortLabel || archetype.code] = 0;
      }
    }

    const latestResults = Array.from(latestByPerson.values());
    const lastAttempt = latestResults.sort((a, b) => 
      new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
    )[0];

    return {
      series: [
        { name: "Organization Mean", data: meanData },
        { name: "P90", data: p90Data },
      ],
      meta: {
        n_people: latestByPerson.size,
        last_attempt_at: lastAttempt?.completedAt,
      },
      archetypes: allArchetypes,
    };
  }
  
}

export const storage = new DatabaseStorage();
