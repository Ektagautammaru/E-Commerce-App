import express from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import colors from "colors";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from "./routes/productRoutes.js"
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();


// database config
connectDB();

// middleWares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))

// Routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);



app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log( `Server is working on port ${PORT} `.bgBlack.gray);
});