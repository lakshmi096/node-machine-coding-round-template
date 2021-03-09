const mongoose = require("mongoose")
const { db, environment } = require("../config")

// Build the connection string
const dbURI = (environment === "production")
  ? `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`
  : `mongodb://${db.host}:${db.port}/${db.name}`

let options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10, 
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, 
  socketTimeoutMS: 45000, 
}
if (environment === "production") {
  options.ssl = true
  options.authSource = "admin"
}

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log("Mongoose connection done")
  })
  .catch((e) => {
    console.log("Mongoose connection error")
    console.log(e)
  })

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log(`Mongoose default connection open to ${dbURI}`)
})

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log(`Mongoose default connection error: ${err}`)
})

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected")
})

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose default connection disconnected through app termination")
    process.exit(0)
  })
})
