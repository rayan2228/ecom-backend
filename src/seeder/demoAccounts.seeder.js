import bcrypt from "bcrypt";
import { Role } from "../model/role.schema.js";
import { User } from "../model/user.schema.js";
export const seedDemoAccounts = async () => {
  try {
    // Fetch all permissions from the database
    const adminRole = await Role.findOne({ name: "Admin" });
    const editorRole = await Role.findOne({ name: "Editor" });
    const customerRole = await Role.findOne({ name: "Customer" });
    const vendorRole = await Role.findOne({ name: "Vendor" });
    const users = [
      {
        displayname: "admin",
        username: "admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("admin", 10),
        role: [adminRole._id],
      },
      {
        displayname: "editor",
        username: "editor",
        email: "editor@editor.com",
        password: await bcrypt.hash("editor", 10),
        role: [editorRole._id],
      },
      {
        displayname: "customer",
        username: "customer",
        email: "customer@customer.com",
        password: await bcrypt.hash("customer", 10),
        role: [customerRole._id],
      },
      {
        displayname: "vendor",
        username: "vendor",
        email: "vendor@vendor.com",
        password: await bcrypt.hash("vendor", 10),
        role: [vendorRole._id],
      },
    ];
    await User.insertMany(users);
    console.log("demo users created successfully");
    return true
  } catch (error) {
    console.error("Error seeding roles:", error);
    return false
  }
};
