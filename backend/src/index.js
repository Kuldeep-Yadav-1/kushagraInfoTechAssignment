import express from "express";
import connectDB from "./connectDB.js";
import router from "./router/route.js";
// import router from "./router/route.js";
import cors from "cors"

const app = express();

const PORT = 3008;

connectDB();


app.use(express.json());

app.use(cors({
    origin:`http://localhost:3000`
}))


app.use("/api",router)

app.listen(PORT,()=>{
    console.log(`server work ${PORT}`); 
})
