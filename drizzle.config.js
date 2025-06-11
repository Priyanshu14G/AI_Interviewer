// import { defineConfig } from "drizzle-kit";
/** @type {import('drizzle-kit').Config}   */
export default ({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_Y0IP9CXZMwbs@ep-floral-lab-a8n0f16h-pooler.eastus2.azure.neon.tech/Ai-interviewer?sslmode=require"
  }
});
