import { db } from "./db";
import {
  archetypes,
  teams,
  companies,
  assessmentTemplates,
  memberships,
} from "@shared/schema";
import { eq, sql } from "drizzle-orm";
import { CANONICAL_ARCHETYPES, validateArchetypeCounts } from "./archetype-config";

async function seedAllArchetypes() {
  console.log("🚀 Starting comprehensive resistance map seed...\n");

  // Step 1: Validate archetype counts
  console.log("Step 1: Validating archetype configuration...");
  const counts = validateArchetypeCounts();
  console.log("  Archetype counts by category:");
  Object.entries(counts).forEach(([ctx, count]) => {
    const status = count === 8 ? "✓" : "⚠";
    console.log(`    ${status} ${ctx}: ${count} archetypes`);
  });
  
  const allValid = Object.values(counts).every(c => c === 8);
  if (!allValid) {
    throw new Error("❌ Some categories don't have exactly 8 archetypes!");
  }
  console.log(`  ✓ All 6 categories have exactly 8 archetypes (${CANONICAL_ARCHETYPES.length} total)\n`);

  // Step 2: Clear existing data
  console.log("Step 2: Clearing existing resistance map data...");
  await db.delete(archetypes);
  console.log("✓ Cleared existing archetypes\n");

  // Step 3: Insert canonical archetypes
  console.log("Step 3: Inserting canonical archetypes...");
  
  for (const archetype of CANONICAL_ARCHETYPES) {
    await db.insert(archetypes).values({
      code: archetype.code,
      name: archetype.name,
      shortLabel: archetype.abbreviation,
      description: archetype.description,
      context: archetype.context,
    });
  }
  
  console.log(`✓ Inserted ${CANONICAL_ARCHETYPES.length} archetypes\n`);

  // Step 4: Create demo organization and teams (if not exist)
  console.log("Step 4: Creating demo organization and teams...");
  
  const existingCompany = await db
    .select()
    .from(companies)
    .where(eq(companies.id, "demo-org-1"))
    .limit(1);
  
  let orgId = "demo-org-1";
  if (existingCompany.length === 0) {
    await db.insert(companies).values({
      id: "demo-org-1",
      name: "Demo Organization",
      industry: "Technology",
    });
    console.log("✓ Created demo organization");
  } else {
    console.log("✓ Using existing demo organization");
  }

  // Clear and recreate teams (delete memberships first to avoid foreign key constraint)
  const existingTeams = await db.select().from(teams).where(eq(teams.organizationId, orgId));
  for (const team of existingTeams) {
    await db.delete(memberships).where(eq(memberships.teamId, team.id));
  }
  await db.delete(teams).where(eq(teams.organizationId, orgId));
  
  const teamData = [
    { id: "team-1", name: "Executive Team", levelTag: "executive" },
    { id: "team-2", name: "Engineering Team", levelTag: "ic" },
    { id: "team-3", name: "Sales Team", levelTag: "ic" },
  ];

  for (const team of teamData) {
    await db.insert(teams).values({
      id: team.id,
      organizationId: orgId,
      name: team.name,
      levelTag: team.levelTag,
    });
  }
  
  console.log(`✓ Created ${teamData.length} teams\n`);

  // Step 5: Create assessment templates
  console.log("Step 5: Creating assessment templates...");
  
  await db.delete(assessmentTemplates);
  
  const templates = [
    { slug: "leadership_paid_v1", label: "Leadership (Paid)", context: "leadership", tier: "paid", version: 1 },
    { slug: "middle_management_paid_v1", label: "Middle Management (Paid)", context: "middle_management", tier: "paid", version: 1 },
    { slug: "team_communication_paid_v1", label: "Team Communication (Paid)", context: "team_communication", tier: "paid", version: 1 },
    { slug: "career_growth_paid_v1", label: "Career Growth (Paid)", context: "career_growth", tier: "paid", version: 1 },
    { slug: "sales_paid_v1", label: "Sales (Paid)", context: "sales", tier: "paid", version: 1 },
    { slug: "individual_paid_v1", label: "Individual Performance (Paid)", context: "individual", tier: "paid", version: 1 },
  ];

  for (const template of templates) {
    await db.insert(assessmentTemplates).values(template);
  }
  
  console.log(`✓ Created ${templates.length} assessment templates\n`);

  // Final summary
  console.log("✅ Comprehensive resistance map seed completed!\n");
  console.log("Summary:");
  console.log(`  - ${CANONICAL_ARCHETYPES.length} archetypes across 6 categories`);
  console.log(`  - 1 demo organization`);
  console.log(`  - ${teamData.length} teams`);
  console.log(`  - ${templates.length} assessment templates`);
  console.log("\n⚠️  Note: No assessment attempts or scores created yet.");
  console.log("   The resistance map will show 0% until assessments are completed.");
}

seedAllArchetypes()
  .then(() => {
    console.log("\n🎉 Seed completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  });
