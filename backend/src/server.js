import express from "express";
import "dotenv/config";
import cors from "cors";
import businessesRoutes from "./routes/businesses-routes.js";
import categoriesRoutes from "./routes/categories-route.js";
import authRoutes from "./routes/auth-routes.js";

const app = express();
const { CORS_ORIGIN, PORT } = process.env;

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/businesses", businessesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>NDNC API</title>
      </head>
      <body>
       <h2> Klahowya!</h2>
       <h1>This is the Native Digital Networking Community API.</h1>
       <h3>Also known as the NDNC✨</h3>
       <p></p>
       <ul>
       <li>To access business data use <strong>"/businesses"</strong></li>
       <li>To access categories use <strong>"/categories"</strong></li>
       </ul>
      </body>
    </html>`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} :)`);
});
