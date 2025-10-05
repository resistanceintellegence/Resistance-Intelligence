import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Companies table for admin analytics (must be defined before users for FK)
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  segment: varchar("segment"), // SMB, Mid, Enterprise, Solo, Micro, Growing
  employeeCount: integer("employee_count"),
  industry: varchar("industry"),
  plan: varchar("plan").default('free'), // free, paid
  seats: integer("seats").default(1),
  utilizationRate: integer("utilization_rate"), // percentage
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: varchar("password"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  companyId: varchar("company_id").references(() => companies.id), // Link to company
  // Profile fields
  profileCompleted: varchar("profile_completed").default('false'),
  role: varchar("role"), // Executive, Mid-level Manager, Team Lead, Individual Contributor, Entrepreneur
  companySize: varchar("company_size"), // Solo, Micro Startup, SMB, Mid-size, Enterprise
  industry: varchar("industry"), // Tech, Healthcare, Finance, Construction, Other
  yearsExperience: varchar("years_experience"),
  primaryGoal: varchar("primary_goal"), // Improve leadership agility, Build stronger team collaboration, etc.
  teamSizeManaged: varchar("team_size_managed"),
  decisionEnvironment: varchar("decision_environment"), // Stable, Volatile, Growth, Turnaround
  keyChallenges: text("key_challenges").array(), // Array of challenges
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Assessment responses
export const assessmentResponses = pgTable("assessment_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  assessmentType: varchar("assessment_type").notNull(), // individual, career, team-communication, management, leadership
  responses: jsonb("responses").notNull(), // Array of response values [1-5]
  totalScore: integer("total_score").notNull(),
  dominantArchetype: varchar("dominant_archetype").notNull(),
  resistanceLevel: varchar("resistance_level").notNull(), // low, moderate, high
  completedAt: timestamp("completed_at").defaultNow(),
});

// Leadership assessment results
export const leadershipAssessmentResults = pgTable("leadership_assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  responses: jsonb("responses").notNull(), // Array of AssessmentResponse objects
  archetypeScores: jsonb("archetype_scores").notNull(), // Array of ArchetypeScore objects
  dominantArchetype: varchar("dominant_archetype").notNull(),
  secondaryArchetype: varchar("secondary_archetype").notNull(),
  insights: jsonb("insights").notNull(), // Array of insight strings
  developmentAreas: jsonb("development_areas").notNull(), // Array of development area strings
  totalQuestions: integer("total_questions").notNull(),
  resistanceLevel: varchar("resistance_level"), // low, moderate, high
  resistancePercentage: integer("resistance_percentage"),
  organizationCategory: varchar("organization_category"), // corporate, mid-size, smb, entrepreneur
  entrepreneurSubcategory: varchar("entrepreneur_subcategory"), // sole, micro, growing (only used when organizationCategory is entrepreneur)
  completedAt: timestamp("completed_at").defaultNow(),
});

// Middle management assessment results
export const middleManagementAssessmentResults = pgTable("middle_management_assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  responses: jsonb("responses").notNull(), // Array of AssessmentResponse objects
  archetypeScores: jsonb("archetype_scores").notNull(), // Array of ArchetypeScore objects
  dominantArchetype: varchar("dominant_archetype").notNull(),
  secondaryArchetype: varchar("secondary_archetype").notNull(),
  insights: jsonb("insights").notNull(), // Array of insight strings
  developmentAreas: jsonb("development_areas").notNull(), // Array of development area strings
  totalQuestions: integer("total_questions").notNull(),
  resistanceLevel: varchar("resistance_level"), // low, moderate, high
  resistancePercentage: integer("resistance_percentage"),
  // Pre-assessment demographic data
  companySize: varchar("company_size"), // 1-25, 26-50, 51-100, 101-250, 251-500, 500+
  industry: varchar("industry"), // construction, manufacturing, professional-services, healthcare, technology, education-nonprofit, other
  yearsInManagement: varchar("years_in_management"), // less-than-1, 1-3, 4-7, 8-15, 15-plus
  currentTeamSize: varchar("current_team_size"), // 1-5, 6-10, 11-20, 21-50, 51+
  completedAt: timestamp("completed_at").defaultNow(),
});

// Team communication assessment results
export const teamCommunicationAssessmentResults = pgTable("team_communication_assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  responses: jsonb("responses").notNull(), // Array of AssessmentResponse objects
  archetypeScores: jsonb("archetype_scores").notNull(), // Array of ArchetypeScore objects
  dominantArchetype: varchar("dominant_archetype").notNull(),
  secondaryArchetype: varchar("secondary_archetype").notNull(),
  insights: jsonb("insights").notNull(), // Array of insight strings
  developmentAreas: jsonb("development_areas").notNull(), // Array of development area strings
  totalQuestions: integer("total_questions").notNull(),
  resistanceLevel: varchar("resistance_level"), // low, moderate, high
  resistancePercentage: integer("resistance_percentage"),
  // Demographic data specific to team communication
  teamSize: varchar("team_size"), // 1-5, 6-10, 11-20, 21-50, 51+
  workType: varchar("work_type"), // project-based, service-oriented, operations, creative, administrative, other
  completedAt: timestamp("completed_at").defaultNow(),
});

// Career growth assessment results
export const careerGrowthAssessmentResults = pgTable("career_growth_assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  responses: jsonb("responses").notNull(), // Array of AssessmentResponse objects
  archetypeScores: jsonb("archetype_scores").notNull(), // Array of ArchetypeScore objects
  dominantArchetype: varchar("dominant_archetype").notNull(),
  secondaryArchetype: varchar("secondary_archetype").notNull(),
  insights: jsonb("insights").notNull(), // Array of insight strings
  developmentAreas: jsonb("development_areas").notNull(), // Array of development area strings
  totalQuestions: integer("total_questions").notNull(),
  resistanceLevel: varchar("resistance_level"), // low, moderate, high
  resistancePercentage: integer("resistance_percentage"),
  organizationCategory: varchar("organization_category"), // corporate, mid-size, smb, entrepreneur
  entrepreneurSubcategory: varchar("entrepreneur_subcategory"), // sole, micro, growing (only used when organizationCategory is entrepreneur)
  completedAt: timestamp("completed_at").defaultNow(),
});

// Sales assessment results
export const salesAssessmentResults = pgTable("sales_assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  responses: jsonb("responses").notNull(), // Array of AssessmentResponse objects
  archetypeScores: jsonb("archetype_scores").notNull(), // Array of ArchetypeScore objects
  dominantArchetype: varchar("dominant_archetype").notNull(),
  secondaryArchetype: varchar("secondary_archetype").notNull(),
  insights: jsonb("insights").notNull(), // Array of insight strings
  developmentAreas: jsonb("development_areas").notNull(), // Array of development area strings
  totalQuestions: integer("total_questions").notNull(),
  resistanceLevel: varchar("resistance_level"), // low, moderate, high
  resistancePercentage: integer("resistance_percentage"),
  // Sales-specific demographic data
  salesType: varchar("sales_type"), // retail-pos, inside-sales-smb, enterprise-b2b, consulting-independent, other
  companySize: varchar("company_size"), // 1-10, 11-50, 51-250, 251-1000, 1000-plus
  completedAt: timestamp("completed_at").defaultNow(),
});

// Individual performance assessment results
export const individualAssessmentResults = pgTable("individual_assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  responses: jsonb("responses").notNull(), // Array of AssessmentResponse objects
  archetypeScores: jsonb("archetype_scores").notNull(), // Array of ArchetypeScore objects
  dominantArchetype: varchar("dominant_archetype").notNull(),
  secondaryArchetype: varchar("secondary_archetype").notNull(),
  insights: jsonb("insights").notNull(), // Array of insight strings
  developmentAreas: jsonb("development_areas").notNull(), // Array of development area strings
  totalQuestions: integer("total_questions").notNull(),
  resistanceLevel: varchar("resistance_level"), // low, moderate, high
  resistancePercentage: integer("resistance_percentage"),
  organizationCategory: varchar("organization_category"), // corporate, mid-size, smb, entrepreneur
  entrepreneurSubcategory: varchar("entrepreneur_subcategory"), // sole, micro, growing (only used when organizationCategory is entrepreneur)
  completedAt: timestamp("completed_at").defaultNow(),
});

// Corporate profile intake
export const corporateProfiles = pgTable("corporate_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  fullName: varchar("full_name"),
  gender: varchar("gender"),
  ageRange: varchar("age_range"),
  currentRoleLevel: varchar("current_role_level"),
  yearsInCurrentRole: varchar("years_in_current_role"),
  department: varchar("department"),
  workEnvironment: varchar("work_environment"),
  workHours: varchar("work_hours"),
  companySize: varchar("company_size"),
  industry: varchar("industry"),
  growthStage: varchar("growth_stage"),
  teamSize: varchar("team_size"),
  primaryGoals: jsonb("primary_goals"), // Object with health, finance, innerPeace, relationships goals
  changeComfortLevel: varchar("change_comfort_level"),
  recentMajorChange: varchar("recent_major_change"),
  changePerception: varchar("change_perception"),
  preferredCommunication: varchar("preferred_communication"),
  relationshipStatus: varchar("relationship_status"),
  stressLevel: varchar("stress_level"),
  motivationDrivers: varchar("motivation_drivers"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export const updateProfileSchema = z.object({
  role: z.string().min(1, "Role is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  yearsExperience: z.string().min(1, "Experience level is required"),
  primaryGoal: z.string().min(1, "Primary goal is required"),
  teamSizeManaged: z.string().min(1, "Team size is required"),
  decisionEnvironment: z.string().min(1, "Decision environment is required"),
  keyChallenges: z.array(z.string()).min(1, "Select at least one challenge"),
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;

export const insertAssessmentResponseSchema = createInsertSchema(assessmentResponses).omit({
  id: true,
  completedAt: true,
});

export const insertLeadershipAssessmentResultSchema = createInsertSchema(leadershipAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export const insertMiddleManagementAssessmentResultSchema = createInsertSchema(middleManagementAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export const insertTeamCommunicationAssessmentResultSchema = createInsertSchema(teamCommunicationAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export const insertCareerGrowthAssessmentResultSchema = createInsertSchema(careerGrowthAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export const insertCorporateProfileSchema = createInsertSchema(corporateProfiles).omit({
  id: true,
  createdAt: true,
});

export type InsertAssessmentResponse = z.infer<typeof insertAssessmentResponseSchema>;
export type AssessmentResponse = typeof assessmentResponses.$inferSelect;

export type InsertLeadershipAssessmentResult = z.infer<typeof insertLeadershipAssessmentResultSchema>;
export type LeadershipAssessmentResult = typeof leadershipAssessmentResults.$inferSelect;

export type InsertMiddleManagementAssessmentResult = z.infer<typeof insertMiddleManagementAssessmentResultSchema>;
export type MiddleManagementAssessmentResult = typeof middleManagementAssessmentResults.$inferSelect;

export type InsertTeamCommunicationAssessmentResult = z.infer<typeof insertTeamCommunicationAssessmentResultSchema>;
export type TeamCommunicationAssessmentResult = typeof teamCommunicationAssessmentResults.$inferSelect;

export type InsertCareerGrowthAssessmentResult = z.infer<typeof insertCareerGrowthAssessmentResultSchema>;
export type CareerGrowthAssessmentResult = typeof careerGrowthAssessmentResults.$inferSelect;

// Add individual assessment schema and types
export const insertIndividualAssessmentResultSchema = createInsertSchema(individualAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export type InsertIndividualAssessmentResult = z.infer<typeof insertIndividualAssessmentResultSchema>;
export type IndividualAssessmentResult = typeof individualAssessmentResults.$inferSelect;

export const insertSalesAssessmentResultSchema = createInsertSchema(salesAssessmentResults).omit({
  id: true,
  completedAt: true,
});

export type InsertSalesAssessmentResult = z.infer<typeof insertSalesAssessmentResultSchema>;
export type SalesAssessmentResult = typeof salesAssessmentResults.$inferSelect;

export type InsertCorporateProfile = z.infer<typeof insertCorporateProfileSchema>;
export type CorporateProfile = typeof corporateProfiles.$inferSelect;

// Analytics events table for tracking user behavior
export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: varchar("event_type").notNull(), // user_created, assessment_started, assessment_completed, etc.
  userId: varchar("user_id").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  metadata: jsonb("metadata"), // Flexible JSON for event-specific data
  createdAt: timestamp("created_at").defaultNow(),
});

// Payments/Revenue tracking table
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  companyId: varchar("company_id").references(() => companies.id),
  amount: integer("amount").notNull(), // in cents
  currency: varchar("currency").default('USD'),
  mrrDelta: integer("mrr_delta"), // Monthly recurring revenue change
  status: varchar("status").default('succeeded'), // succeeded, failed, refunded
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses/Micro-learning table
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  track: varchar("track").notNull(), // Sales Growth, Leadership Development, etc.
  module: varchar("module"),
  progressPercentage: integer("progress_percentage").default(0),
  status: varchar("status").default('enrolled'), // enrolled, active, completed
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Audit log for admin actions
export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminUserId: varchar("admin_user_id").references(() => users.id),
  action: varchar("action").notNull(), // viewed_pii, impersonated, changed_role, etc.
  targetUserId: varchar("target_user_id").references(() => users.id),
  targetCompanyId: varchar("target_company_id").references(() => companies.id),
  details: jsonb("details"),
  ipAddress: varchar("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = typeof analyticsEvents.$inferInsert;

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).omit({
  id: true,
  createdAt: true,
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  enrolledAt: true,
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

export const insertAuditLogSchema = createInsertSchema(auditLogs).omit({
  id: true,
  createdAt: true,
});

// ============ RESISTANCE MAP SCHEMA ============

// Teams table
export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").references(() => companies.id),
  name: varchar("name").notNull(),
  levelTag: varchar("level_tag"), // executive, director, manager, ic
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Team memberships
export const memberships = pgTable("memberships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => users.id).notNull(),
  teamId: varchar("team_id").references(() => teams.id).notNull(),
  roleInTeam: varchar("role_in_team"), // lead, member, contributor
  isPrimaryTeam: varchar("is_primary_team").default('true'), // true/false
  createdAt: timestamp("created_at").defaultNow(),
});

// Archetypes taxonomy - each assessment has its own archetypes
export const archetypes = pgTable("archetypes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code").notNull(), // SA, micromanager, over-promiser, etc.
  name: varchar("name").notNull(),
  shortLabel: varchar("short_label"),
  description: text("description"),
  context: varchar("context").notNull(), // leadership, middle_management, team_communication, career_growth, sales, individual
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  uniqueCodeContext: sql`UNIQUE (code, context)`, // Unique per assessment category
}));

// Assessment templates
export const assessmentTemplates = pgTable("assessment_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug").notNull().unique(), // leadership_free_v4, etc.
  label: varchar("label").notNull(),
  context: varchar("context").notNull(), // leadership, career_growth, team_communication, etc.
  tier: varchar("tier").notNull(), // free, paid
  version: integer("version").default(1),
  isActive: varchar("is_active").default('true'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Assessment items (questions)
export const assessmentItems = pgTable("assessment_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: varchar("template_id").references(() => assessmentTemplates.id).notNull(),
  itemNo: integer("item_no").notNull(),
  itemType: varchar("item_type").notNull(), // likert, forced_choice, scenario
  text: text("text").notNull(),
  reverseScored: varchar("reverse_scored").default('false'),
  forcedMap: jsonb("forced_map"), // JSON map for forced choice scoring
  archetypeId: varchar("archetype_id").references(() => archetypes.id),
  contextTags: text("context_tags").array(), // decision_making, delegation, collaboration, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// Assessment attempts
export const assessmentAttempts = pgTable("assessment_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => users.id).notNull(),
  templateId: varchar("template_id").references(() => assessmentTemplates.id).notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  submittedAt: timestamp("submitted_at"),
  timeSec: integer("time_sec"),
  status: varchar("status").default('started'), // started, submitted, abandoned
  meta: jsonb("meta"), // device, ip, locale
});

// Item responses
export const itemResponses = pgTable("item_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attemptId: varchar("attempt_id").references(() => assessmentAttempts.id).notNull(),
  itemId: varchar("item_id").references(() => assessmentItems.id).notNull(),
  responseRaw: varchar("response_raw"), // raw response (e.g., "Agree", "A")
  responseValue: integer("response_value"), // normalized 1-5
  responseMeta: jsonb("response_meta"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Archetype scores
export const archetypeScores = pgTable("archetype_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attemptId: varchar("attempt_id").references(() => assessmentAttempts.id).notNull(),
  archetypeId: varchar("archetype_id").references(() => archetypes.id).notNull(),
  raw: integer("raw").notNull(), // raw score
  pct: integer("pct").notNull(), // normalized 0-100
  band: varchar("band"), // low, moderate, high
  createdAt: timestamp("created_at").defaultNow(),
});

// Derived metrics
export const derivedMetrics = pgTable("derived_metrics", {
  attemptId: varchar("attempt_id").primaryKey().references(() => assessmentAttempts.id),
  overallResistancePct: integer("overall_resistance_pct"),
  overallBand: varchar("overall_band"), // low, moderate, high
  balancingIndexPct: integer("balancing_index_pct"),
  balancingAdjustment: integer("balancing_adjustment"),
  dominantArchetypeId: varchar("dominant_archetype_id").references(() => archetypes.id),
  profileType: varchar("profile_type"), // low_profile, moderate_profile, mixed_highs
  situationalModeSummary: jsonb("situational_mode_summary"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Context-based archetype scores
export const contextArchetypeScores = pgTable("context_archetype_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  attemptId: varchar("attempt_id").references(() => assessmentAttempts.id).notNull(),
  contextTag: varchar("context_tag").notNull(), // decision_making, delegation, etc.
  archetypeId: varchar("archetype_id").references(() => archetypes.id).notNull(),
  raw: integer("raw"),
  pct: integer("pct"),
  mode: varchar("mode"), // protective, restrictive, neutral
  createdAt: timestamp("created_at").defaultNow(),
});

// Team archetype aggregates
export const teamArchetypeAgg = pgTable("team_archetype_agg", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: varchar("team_id").references(() => teams.id).notNull(),
  templateId: varchar("template_id").references(() => assessmentTemplates.id).notNull(),
  window: varchar("window").default('latest_per_person'), // latest_per_person, 30d, quarter, all_time
  nPeople: integer("n_people"),
  nAttempts: integer("n_attempts"),
  meanPct: jsonb("mean_pct"), // Array/object of 8 archetype means
  p90Pct: jsonb("p90_pct"), // Array/object of 8 archetype p90s
  stdevPct: jsonb("stdev_pct"),
  lastAttemptAt: timestamp("last_attempt_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Level archetype aggregates
export const levelArchetypeAgg = pgTable("level_archetype_agg", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").references(() => companies.id).notNull(),
  levelTag: varchar("level_tag").notNull(), // executive, director, manager, ic
  templateId: varchar("template_id").references(() => assessmentTemplates.id).notNull(),
  window: varchar("window").default('latest_per_person'),
  nPeople: integer("n_people"),
  meanPct: jsonb("mean_pct"),
  p90Pct: jsonb("p90_pct"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Organization archetype aggregates
export const orgArchetypeAgg = pgTable("org_archetype_agg", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").references(() => companies.id).notNull(),
  templateId: varchar("template_id").references(() => assessmentTemplates.id).notNull(),
  window: varchar("window").default('latest_per_person'),
  nPeople: integer("n_people"),
  meanPct: jsonb("mean_pct"),
  p90Pct: jsonb("p90_pct"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Heatmap context aggregates
export const heatmapContextAgg = pgTable("heatmap_context_agg", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scopeType: varchar("scope_type").notNull(), // team, org, level
  scopeId: varchar("scope_id").notNull(),
  templateId: varchar("template_id").references(() => assessmentTemplates.id).notNull(),
  window: varchar("window").default('latest_per_person'),
  contextTag: varchar("context_tag").notNull(),
  meanPctByArchetype: jsonb("mean_pct_by_archetype"),
  protectiveCounts: jsonb("protective_counts"),
  restrictiveCounts: jsonb("restrictive_counts"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports for resistance map
export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;

export type Membership = typeof memberships.$inferSelect;
export type InsertMembership = typeof memberships.$inferInsert;

export type Archetype = typeof archetypes.$inferSelect;
export type InsertArchetype = typeof archetypes.$inferInsert;

export type AssessmentTemplate = typeof assessmentTemplates.$inferSelect;
export type InsertAssessmentTemplate = typeof assessmentTemplates.$inferInsert;

export type AssessmentItem = typeof assessmentItems.$inferSelect;
export type InsertAssessmentItem = typeof assessmentItems.$inferInsert;

export type AssessmentAttempt = typeof assessmentAttempts.$inferSelect;
export type InsertAssessmentAttempt = typeof assessmentAttempts.$inferInsert;

export type ItemResponse = typeof itemResponses.$inferSelect;
export type InsertItemResponse = typeof itemResponses.$inferInsert;

export type ArchetypeScore = typeof archetypeScores.$inferSelect;
export type InsertArchetypeScore = typeof archetypeScores.$inferInsert;

export type DerivedMetric = typeof derivedMetrics.$inferSelect;
export type InsertDerivedMetric = typeof derivedMetrics.$inferInsert;

export type ContextArchetypeScore = typeof contextArchetypeScores.$inferSelect;
export type InsertContextArchetypeScore = typeof contextArchetypeScores.$inferInsert;

export type TeamArchetypeAgg = typeof teamArchetypeAgg.$inferSelect;
export type LevelArchetypeAgg = typeof levelArchetypeAgg.$inferSelect;
export type OrgArchetypeAgg = typeof orgArchetypeAgg.$inferSelect;
export type HeatmapContextAgg = typeof heatmapContextAgg.$inferSelect;

// Insert schemas
export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMembershipSchema = createInsertSchema(memberships).omit({
  id: true,
  createdAt: true,
});

export const insertArchetypeSchema = createInsertSchema(archetypes).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentTemplateSchema = createInsertSchema(assessmentTemplates).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentItemSchema = createInsertSchema(assessmentItems).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentAttemptSchema = createInsertSchema(assessmentAttempts).omit({
  id: true,
  startedAt: true,
});

export const insertItemResponseSchema = createInsertSchema(itemResponses).omit({
  id: true,
  createdAt: true,
});

export const insertArchetypeScoreSchema = createInsertSchema(archetypeScores).omit({
  id: true,
  createdAt: true,
});

export const insertDerivedMetricSchema = createInsertSchema(derivedMetrics).omit({
  createdAt: true,
});

export const insertContextArchetypeScoreSchema = createInsertSchema(contextArchetypeScores).omit({
  id: true,
  createdAt: true,
});
