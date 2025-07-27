import db from "../dbConnection.js";
import bcrypt from "bcrypt";

export async function seed() {
  if (process.env.NODE_ENV === "production") {
    console.log("In production, cannot seed from seed_admin.");
    return;
  }

  try {
    const username = "admin";
    const password = "adminpassword";

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await db("users").where({ username }).first();
    if (existingAdmin) {
      console.log("Admin already exists, cannot seed at seed_admin.");
      return;
    }

    await db("users").insert({
      username,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Create admin successful at seed_admin");
  } catch (err) {
    console.error(`Error at seed_admin: ${err}`);
  }
}
