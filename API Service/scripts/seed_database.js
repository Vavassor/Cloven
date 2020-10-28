const { Seeder } = require("mongo-seeding");
const path = require("path");

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/cloven";

const config = {
  database: mongoUri,
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.join(__dirname, "data")
);

seeder
  .import(collections)
  .then(() => console.log(`Database seeded at ${mongoUri}.`))
  .catch(console.error);
