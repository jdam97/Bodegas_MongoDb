import "dotenv/config"; //eso me remplaca el dotenv.config() de una vez.
import { Router } from "express";
import {connectDB} from "../config/connectiondb.js";

const Bodegas = Router();

let db = await connectDB();

//Endpoints

//4. Realizar un EndPolnt que permita listar todas las bodegas ordenadas

Bodegas.get("/",async (req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("wineries");
        let data = await collection.find()
        .toArray();
        res.send(data)
    } catch (error) {
        res.status(500).json({
            message:"No se pueden listar las bodegas",
            error:error.message
        })
    }
})


export default Bodegas;