async function main() {
  try {
    const [{ default: mongoose }, { default: dotenv }] = await Promise.all([
      import("mongoose"),
      import("dotenv"),
    ]);

    dotenv.config({ path: ".env.local" });

    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error("Please define the MONGODB_URI environment variable inside .env.local");
      process.exit(1);
    }

    const JobSchema = new mongoose.Schema({
      title: String,
      location: String,
      type: String,
      description: String,
      requirements: [String],
      createdAt: { type: Date, default: Date.now },
    });

    const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");

    const testJob = {
      title: "Test Job " + Date.now(),
      location: "Test Location",
      type: "Contract",
      description: "This is a test job created by the verification script.",
      requirements: ["Req 1", "Req 2"],
    };

    const createdJob = await Job.create(testJob);
    console.log("Job created successfully:", createdJob.title);

    const jobs = await Job.find().sort({ createdAt: -1 }).limit(1);
    console.log("Fetched latest job:", jobs[0].title);

    if (jobs[0]._id.toString() === createdJob._id.toString()) {
      console.log("Verification PASSED");
    } else {
      console.error("Verification FAILED: Fetched job does not match created job");
    }

    await Job.deleteOne({ _id: createdJob._id });
    console.log("Cleanup: Test job deleted");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Verification Error:", error);
    process.exitCode = 1;
  }
}

main();
