
const mongoose = require("mongoose");
const app = require("./server");

const dbUrl = process.env.ATLASDB_URL;
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    if (!dbUrl) {
      throw new Error("ATLASDB_URL is not configured");
    }

    await mongoose.connect(dbUrl);
    console.log("Connected to the Database successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1);
  }
}

startServer();
