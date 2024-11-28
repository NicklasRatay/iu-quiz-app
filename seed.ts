import { createSeedClient } from "@snaplet/seed";

const main = async () => {
    const seed = await createSeedClient({ dryRun: true, connect: true });

    

    process.exit();
};

main();
