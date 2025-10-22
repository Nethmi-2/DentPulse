import dotenv from 'dotenv';
dotenv.config(); // MUST come first

import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import participantRoutes from "./routes/participant.route.js";
import expenseRoutes from "./routes/expense.route.js";
import billRoutes from "./routes/bill.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import reportsRoutes from "./routes/reports.route.js";
import serviceRoutes from "./routes/service.route.js";
import "./service/reminderService.js"; 
import financeRoutes from "./routes/finance.route.js";
import paymentRoutes from "./routes/payment.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/payment", paymentRoutes);

// Connect to MongoDB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
