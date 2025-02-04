import { Permission } from "../model/permission.schema.js";
const permissions = [
  // 🔹 User Management
  { name: "manage_users", description: "Can manage all users" },
  { name: "view_users", description: "Can view user details" },
  { name: "ban_users", description: "Can ban/unban users" },
  { name: "update_user_roles", description: "Can assign or update user roles" },

  // 🔹 Order Management
  { name: "manage_orders", description: "Can manage all orders" },
  { name: "view_orders", description: "Can view orders but not modify them" },
  { name: "update_order_status", description: "Can update order statuses" },
  { name: "refund_orders", description: "Can issue refunds" },
  { name: "cancel_orders", description: "Can cancel customer orders" },
  { name: "view_own_orders", description: "Can view their own orders" },

  // 🔹 Product Management
  { name: "manage_products", description: "Can manage all products" },
  { name: "view_products", description: "Can view all products" },
  { name: "edit_own_products", description: "Can edit their own products" },
  { name: "delete_own_products", description: "Can delete their own products" },
  { name: "update_product_pricing", description: "Can change product pricing" },
  { name: "update_product_stock", description: "Can update stock levels" },
  { name: "publish_products", description: "Can approve and publish products" },
  { name: "bulk_import_products", description: "Can import multiple products" },

  // 🔹 Vendor Management
  { name: "manage_vendors", description: "Can manage all vendors" },
  { name: "approve_vendors", description: "Can approve vendor registrations" },
  { name: "suspend_vendors", description: "Can suspend vendor accounts" },
  { name: "view_vendors", description: "Can view vendor profiles" },

  // 🔹 Category & Tag Management
  { name: "manage_categories", description: "Can manage product categories" },
  { name: "manage_tags", description: "Can manage product tags" },

  // 🔹 CMS Management
  { name: "manage_cms", description: "Can manage CMS pages and content" },
  { name: "create_pages", description: "Can create new CMS pages" },
  { name: "edit_pages", description: "Can edit CMS pages" },
  { name: "delete_pages", description: "Can delete CMS pages" },
  { name: "publish_pages", description: "Can publish CMS pages" },
  { name: "manage_banners", description: "Can upload and manage banners" },
  { name: "manage_blog", description: "Can manage blog posts" },

  // 🔹 Review & Rating Management
  { name: "manage_reviews", description: "Can manage customer reviews" },
  { name: "edit_reviews", description: "Can edit customer reviews" },
  { name: "delete_reviews", description: "Can delete inappropriate reviews" },
  { name: "view_reviews", description: "Can view all reviews" },

  // 🔹 Coupon & Discount Management
  { name: "manage_coupons", description: "Can create and manage coupons" },
  { name: "apply_coupons", description: "Can apply coupons to orders" },
  { name: "view_coupons", description: "Can view existing coupons" },

  // 🔹 Financial & Payment Management
  { name: "manage_payments", description: "Can manage payment transactions" },
  { name: "view_transactions", description: "Can view financial transactions" },
  { name: "process_refunds", description: "Can issue refunds" },

  // 🔹 Site Settings & SEO
  { name: "manage_settings", description: "Can modify website settings" },
  { name: "manage_seo", description: "Can update SEO metadata" },
  { name: "view_settings", description: "Can view site settings" },

  // 🔹 Reporting & Analytics
  { name: "view_sales_reports", description: "Can view sales reports" },
  { name: "view_order_reports", description: "Can view order reports" },
  { name: "view_customer_reports", description: "Can view customer analytics" },

  // 🔹 Notifications & Messaging
  { name: "send_notifications", description: "Can send user notifications" },
  { name: "manage_support_tickets", description: "Can manage support tickets" },
  {
    name: "reply_to_support_tickets",
    description: "Can reply to support tickets",
  },
];



export const seedPermissions = async () => {
  try {
    // Insert permissions
    const createdPermissions = await Permission.insertMany(permissions);
    console.log("Permissions seeded:", createdPermissions);

  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

