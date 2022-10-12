const express = require("express");
const app = express();

const db_connect = require("./config/db");

const swaggerjsdoc = require("swagger-jsdoc");
const swaggeruiexpress = require("swagger-ui-express");
const swaggeroptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Blog API",
      description: "Blog API Information",
      contact: {
        name: "Sayon Som",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./api/Blog.js"],
};

const swaggerDocs = swaggerjsdoc(swaggeroptions);

app.use(
  "/api-docs",
  swaggeruiexpress.serve,
  swaggeruiexpress.setup(swaggerDocs)
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//database connection
db_connect();

//routes
app.use("/api/Blog", require("./api/Blog"));

//checking
app.get("/", (req, res) => {
  res.send("Server listening");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
