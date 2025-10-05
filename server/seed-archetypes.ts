import { db } from "./db";
import { archetypes } from "@shared/schema";

const ARCHETYPES = [
  {
    code: "SA",
    name: "Strategic Architect",
    shortLabel: "Strategic Architect",
    description: "Focuses on long-term planning, system design, and strategic vision"
  },
  {
    code: "VDI",
    name: "Vision-Driven Innovator",
    shortLabel: "Vision-Driven Innovator",
    description: "Emphasizes innovation, creative thinking, and future possibilities"
  },
  {
    code: "DCA",
    name: "Decisive Change Agent",
    shortLabel: "Decisive Change Agent",
    description: "Drives change, makes quick decisions, and pushes for action"
  },
  {
    code: "CH",
    name: "Collaborative Harmonizer",
    shortLabel: "Collaborative Harmonizer",
    description: "Values collaboration, consensus, and team harmony"
  },
  {
    code: "ED",
    name: "Empowering Delegator",
    shortLabel: "Empowering Delegator",
    description: "Delegates effectively, empowers others, and builds autonomy"
  },
  {
    code: "PCC",
    name: "People-Centric Coach",
    shortLabel: "People-Centric Coach",
    description: "Focuses on developing people, coaching, and mentoring"
  },
  {
    code: "RAS",
    name: "Risk-Aware Stabilizer",
    shortLabel: "Risk-Aware Stabilizer",
    description: "Manages risk carefully, maintains stability, and ensures quality"
  },
  {
    code: "ODA",
    name: "Outcome-Driven Achiever",
    shortLabel: "Outcome-Driven Achiever",
    description: "Focuses on results, performance metrics, and achievement"
  }
];

async function seedArchetypes() {
  try {
    console.log("Seeding archetypes...");
    
    for (const archetype of ARCHETYPES) {
      await db
        .insert(archetypes)
        .values(archetype)
        .onConflictDoNothing();
    }
    
    console.log("✓ Archetypes seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding archetypes:", error);
    process.exit(1);
  }
}

seedArchetypes();
