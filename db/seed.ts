import "dotenv/config";
import { db } from "./index";
import { projects } from "./schema";

async function seed() {
  await db
    .insert(projects)
    .values([
      {
        slug: "vivid-stasis-character-wiki",
        title: "Vivid Stasis Character WIKI",
        year: 2025,
        summary:
          "A card gallery that contains all the characters from a rhythm game, Vivid//Stasis.",
      },
      {
        slug: "notarhythmgame",
        title: "NotaRhythmGame",
        year: 2025,
        summary: "A simple rhythm game that I have made as my Java project",
      },
      {
        slug: "myfutureourfuture",
        title: "MyFutureOurFuture",
        year: 2025,
        summary:
          "A music that I have made as a school project to describe the life of Jose Rizal.",
      },
      {
        slug: "lamontamenu",
        title: "LamontaMenu",
        year: 2024,
        summary:
          "An application for a restaurant. Lists down all orders, supplies, and statistics. However, it was left unfinished due to time constraints.",
      },
    ])
    .onConflictDoNothing();

  console.log("Seeded projects");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
