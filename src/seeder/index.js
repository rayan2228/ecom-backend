import { dbConnect } from "../db/inex.js";
import { seedDemoAccounts } from "./demoAccounts.seeder.js";
import { seedPermissions } from "./permission.seeder.js";
import { seedRoles } from "./role.seeder.js";

const runSeeders = async () => {
  try {
    await dbConnect();
    if (await seedPermissions()) {
      if (await seedRoles()) {
        await seedDemoAccounts();
      }
    }
    process.exit(1);
  } catch (error) {
    console.log("seed error", error);
    process.exit(1);
  }
};

runSeeders();
