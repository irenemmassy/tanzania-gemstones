import express from "express";
import "./config/mongoDb.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRouter.js";
import path from "path";
const __dirname = path.join();
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// userRouter
app.use("/api/users", userRouter);
// productRouter
app.use("/api/products", productRouter);
// oderRouter
app.use("/api/orders", orderRouter);
// middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// THIS IS IMPORTANT SECTION
app.use(express.static("frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server at http://localhost:${process.env.PORT}`);
});
