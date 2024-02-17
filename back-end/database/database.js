import mongoose from "mongoose";

mongoose.set('strictQuery', true);

// Connect to local (or external) database
export const connectDB = async () => {
  const dbNAME = process.env.dbNAME
  const dbPASSWORD = process.env.dbPASSWORD
  const dbCLUSTER = process.env.dbCLUSTER
  const dataBase = process.env.dataBase;

  // ---------- Trouble shoot if envrionment is being passedthrough ----------
  // console.log("=================== Database User: " + dbNAME, "Database Cluster: " + dbCLUSTER, "\n=================== Database Password: " + dbPASSWORD, "Database: " + dataBase)

  // ---------- For local development, uncomment line 17 and comment out line 18 ----------

  const url = `mongodb://localhost:27017/course_register`;
  // const url = `mongodb+srv://${dbNAME}:${dbPASSWORD}@${dbCLUSTER}/${dataBase}`;
  try {
    const connection = await mongoose.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Failed to connect database:", e);
  }
};
