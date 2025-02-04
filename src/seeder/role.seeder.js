import { Permission } from "../model/permission.schema.js";
import { Role } from "../model/role.schema.js";

export const seedRoles = async () => {
  try {
    // Fetch all permissions from the database
    const permissions = await Permission.find();

    // Define role permissions
    const roles = [
      {
        name: "Admin",
        description: "Full access to all permissions for high-level control.",
        permissions: permissions.map((perm) => perm._id), // Assign all permissions
      },
      {
        name: "Editor",
        description:
          "Can manage CMS pages, blog, categories, subcategories, reviews, and view orders but has no access to financial or vendor management.",
        permissions: permissions
          .filter((perm) =>
            [
              "manage_cms",
              "create_pages",
              "edit_pages",
              "delete_pages",
              "publish_pages",
              "manage_blog",
              "manage_reviews",
              "edit_reviews",
              "delete_reviews",
              "view_reviews",
              "manage_categories",
              "create_categories",
              "edit_categories",
              "delete_categories",
              "view_categories",
              "create_subcategories",
              "edit_subcategories",
              "delete_subcategories",
              "view_subcategories",
              "view_orders",
              "send_notifications",
              "manage_notifications",
              "view_reports",
              "download_reports",
            ].includes(perm.name)
          )
          .map((perm) => perm._id),
      },
      {
        name: "Vendor",
        description:
          "Can manage their own products, orders, and view financial reports but cannot access global settings or manage other vendors.",
        permissions: permissions
          .filter((perm) =>
            [
              "edit_own_products",
              "delete_own_products",
              "view_own_orders",
              "apply_coupons",
              "update_product_pricing",
              "update_product_stock",
              "view_reviews",
              "respond_to_reviews",
              "send_notifications",
              "view_notifications",
              "view_order_reports",
              "view_sales_reports",
              "view_customer_reports",
            ].includes(perm.name)
          )
          .map((perm) => perm._id),
      },
      {
        name: "Customer",
        description:
          "Basic user role for making purchases, viewing own orders, and interacting with product reviews.",
        permissions: permissions
          .filter((perm) =>
            [
              "view_own_orders",
              "apply_coupons",
              "view_reviews",
              "send_notifications",
              "view_notifications",
            ].includes(perm.name)
          )
          .map((perm) => perm._id),
      },
    ];

    // Clear existing roles and seed new ones
    await Role.deleteMany();
    await Role.insertMany(roles);

    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};

