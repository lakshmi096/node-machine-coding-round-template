// Mapper for environment variables
const environment = process.env.NODE_ENV
const port = process.env.PORT || 3002

const db = {
  name: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_USER_PWD || "",
}

const corsUrl = process.env.CORS_URL


module.exports = {
  environment,
  port,
  db,
  corsUrl
}
