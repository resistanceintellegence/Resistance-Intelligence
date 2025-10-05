import { db } from "./db";
import { 
  companies,
  users,
  teams, 
  memberships, 
  archetypes, 
  assessmentTemplates, 
  assessmentItems,
  assessmentAttempts,
  archetypeScores
} from "@shared/schema";
import { sql } from "drizzle-orm";

async function seedResistanceMap() {
  console.log("Starting resistance map seed...");

  // 1. Create a demo company (or get existing)
  let company;
  try {
    [company] = await db.insert(companies).values({
      id: "demo-org-1",
      name: "Demo Organization",
      segment: "enterprise",
      employeeCount: 500,
      industry: "technology",
      plan: "premium",
      seats: 100,
      utilizationRate: 75,
    }).returning();
    console.log("✓ Created demo company:", company.name);
  } catch (error: any) {
    if (error.code === '23505') { // Duplicate key
      const existing = await db.select().from(companies).where(sql`id = 'demo-org-1'`);
      company = existing[0];
      console.log("✓ Using existing demo company:", company.name);
    } else {
      throw error;
    }
  }

  // 2. Create demo teams
  const teamData = [
    { id: "team-exec", name: "Executive Leadership", levelTag: "executive" },
    { id: "team-eng", name: "Engineering", levelTag: "manager" },
    { id: "team-sales", name: "Sales", levelTag: "manager" },
    { id: "team-product", name: "Product", levelTag: "manager" },
  ];

  const createdTeams = [];
  for (const team of teamData) {
    const [t] = await db.insert(teams).values({
      id: team.id,
      organizationId: company.id,
      name: team.name,
      levelTag: team.levelTag,
    }).returning();
    createdTeams.push(t);
  }
  console.log(`✓ Created ${createdTeams.length} teams`);

  // 3. Get existing users to create memberships
  const existingUsers = await db.select().from(users).limit(10);
  if (existingUsers.length > 0) {
    const membershipData = existingUsers.slice(0, 8).map((user, i) => ({
      personId: user.id,
      teamId: createdTeams[i % createdTeams.length].id,
      roleInTeam: i < 2 ? "lead" : "member",
      isPrimaryTeam: "true",
    }));

    await db.insert(memberships).values(membershipData);
    console.log(`✓ Created ${membershipData.length} team memberships`);
  }

  // 4. Create assessment templates for all 6 paid assessments
  const templates = [
    { slug: "leadership_paid_v1", label: "Leadership Assessment", context: "leadership", tier: "paid" },
    { slug: "middle_management_paid_v1", label: "Middle Management Assessment", context: "middle_management", tier: "paid" },
    { slug: "team_communication_paid_v1", label: "Team Communication Assessment", context: "team_communication", tier: "paid" },
    { slug: "career_growth_paid_v1", label: "Career Growth Assessment", context: "career_growth", tier: "paid" },
    { slug: "sales_paid_v1", label: "Sales Assessment", context: "sales", tier: "paid" },
    { slug: "individual_paid_v1", label: "Individual Performance Assessment", context: "individual", tier: "paid" },
  ];

  const createdTemplates = [];
  for (const template of templates) {
    const [t] = await db.insert(assessmentTemplates).values({
      slug: template.slug,
      label: template.label,
      context: template.context,
      tier: template.tier,
      version: 1,
      isActive: "true",
    }).returning();
    createdTemplates.push(t);
  }
  console.log(`✓ Created ${createdTemplates.length} assessment templates`);

  // 5. Get existing archetypes
  const existingArchetypes = await db.select().from(archetypes);
  if (existingArchetypes.length !== 8) {
    throw new Error("Expected 8 archetypes to exist");
  }
  console.log(`✓ Found ${existingArchetypes.length} archetypes`);

  // 6. Create sample assessment items for each template
  // Map assessment contexts to their dominant archetypes
  const archetypeMapping: Record<string, string[]> = {
    leadership: ["SA", "VDI", "DCA", "CH"], // Strategic, Visionary, Decisive, Collaborative
    middle_management: ["CH", "ED", "PCC", "ODA"], // Collaborative, Delegator, Coach, Achiever
    team_communication: ["CH", "PCC", "ED", "RAS"], // Collaborative, Coach, Delegator, Stabilizer
    career_growth: ["VDI", "ODA", "SA", "DCA"], // Visionary, Achiever, Strategic, Change Agent
    sales: ["ODA", "DCA", "VDI", "CH"], // Achiever, Change Agent, Visionary, Collaborative
    individual: ["ODA", "RAS", "SA", "VDI"], // Achiever, Stabilizer, Strategic, Visionary
  };

  let itemCount = 0;
  for (const template of createdTemplates) {
    const relevantArchetypeCodes = archetypeMapping[template.context] || ["SA", "VDI", "DCA", "CH"];
    const relevantArchetypes = existingArchetypes.filter(a => relevantArchetypeCodes.includes(a.code));

    // Create 20 items per template (5 per archetype)
    for (let i = 0; i < 20; i++) {
      const archetype = relevantArchetypes[i % relevantArchetypes.length];
      await db.insert(assessmentItems).values({
        templateId: template.id,
        itemNo: i + 1,
        itemType: "likert",
        text: `Sample question ${i + 1} for ${template.context} (${archetype.code})`,
        reverseScored: i % 5 === 0 ? "true" : "false",
        archetypeId: archetype.id,
        contextTags: ["general", template.context],
      });
      itemCount++;
    }
  }
  console.log(`✓ Created ${itemCount} assessment items`);

  // 7. Create sample assessment attempts with scores
  if (existingUsers.length > 0) {
    const usersToUse = existingUsers.slice(0, 12); // Use up to 12 users
    let attemptCount = 0;
    let scoreCount = 0;

    for (const template of createdTemplates) {
      // Create 8-12 attempts per template
      const numAttempts = 8 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < Math.min(numAttempts, usersToUse.length); i++) {
        const user = usersToUse[i];
        const submittedAt = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000); // Random time in last 90 days
        
        const [attempt] = await db.insert(assessmentAttempts).values({
          personId: user.id,
          templateId: template.id,
          startedAt: new Date(submittedAt.getTime() - 15 * 60 * 1000), // 15 mins before submission
          submittedAt: submittedAt,
          durationSec: 900, // 15 minutes
          status: "completed",
        }).returning();
        attemptCount++;

        // Create archetype scores for this attempt
        const relevantArchetypeCodes = archetypeMapping[template.context] || ["SA", "VDI", "DCA", "CH"];
        
        // Generate scores for all 8 archetypes, but emphasize the relevant ones
        for (const archetype of existingArchetypes) {
          const isRelevant = relevantArchetypeCodes.includes(archetype.code);
          
          // Relevant archetypes get higher base scores
          const baseScore = isRelevant ? 40 + Math.random() * 35 : 15 + Math.random() * 25;
          const rawScore = baseScore + (Math.random() - 0.5) * 10; // Add some variance
          const pct = Math.max(0, Math.min(100, rawScore)); // Clamp to 0-100
          
          // Determine band
          let band: "low" | "moderate" | "high";
          if (pct >= 55) band = "high";
          else if (pct >= 35) band = "moderate";
          else band = "low";

          await db.insert(archetypeScores).values({
            attemptId: attempt.id,
            archetypeId: archetype.id,
            raw: Math.round(rawScore),
            pct: Math.round(pct),
            band: band,
          });
          scoreCount++;
        }
      }
    }
    console.log(`✓ Created ${attemptCount} assessment attempts`);
    console.log(`✓ Created ${scoreCount} archetype scores`);
  }

  console.log("\n✅ Resistance map seed completed successfully!");
}

// Run the seed
seedResistanceMap().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
