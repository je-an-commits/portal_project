import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://portal-project-five.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("ORIGIN RECEIVED:", origin);

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("BLOCKED ORIGIN:", origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
BigInt.prototype.toJSON = function () {
  return this.toString();
};
app.use(express.json());
app.disable("x-powered-by");

// routes
app.use("/auth", userRoutes);
app.use("/student", studentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});