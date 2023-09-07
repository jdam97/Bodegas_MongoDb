import "dotenv/config"; //eso me remplaca el dotenv.config() de una vez.
import { Router } from "express";
import {connectDB} from "../config/connectiondb.js";
import validacionBodegas from "../middleware/bodegasMiddleware.js"
import { validationResult } from "express-validator";

const Bodegas = Router();

let db = await connectDB();

//Endpoints

//4. Realizar un EndPolnt que permita listar todas las bodegas ordenadas

Bodegas.get("/",async (req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("wineries");
        let data = await collection.find().sort({name:1})
        .toArray();
        res.send(data)
    } catch (error) {
        res.status(500).json({
            message:"No se pueden listar las bodegas",
            error:error.message
        })
    }
})

//Post
//5. Realizar un EndPolnt que permita crear una bodegas.(agregar en los comentarios de la función los datos de entrada).
Bodegas.post("/",validacionBodegas,async(req,res)=>{
    console.log(req.rateLimit);
        //Validacion    
        const errors = validationResult(req); 
        if (!errors.isEmpty()) return res.status(422).send(errors);    
    try {
        let collection = db.collection("wineries");
        await collection.insertOne(req.body);
        res.status(200).json({
            message:"Se ha insertado una nueva bodega",
            data: req.body,
        });

    } catch (error) {
        res.status(500).json({
            message:"Error al crear nueva bodega",
            error:error.message
        })
    }
})

export default Bodegas;