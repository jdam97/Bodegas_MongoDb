import "dotenv/config";
import { Router } from "express";
import {connectDB} from "../config/connectiondb.js"

const Producto = Router();

const db = await connectDB();

//Endpoints

//6. Realizar un EndPoint que permita listar todos los productos en orden descendente por el campo "Total".
Producto.get("/",async (req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("inventories");
        let data = await collection.aggregate([
            {
                $lookup:{ //hago un inner join entre las dos tablas
                    from: "products",
                    localField: "ID_product",
                    foreignField:"ID",
                    as:"total_productos"
                }
            },
            {
                $group:{ //creo un grupo donde me traiga el nombre del producto y las totales unidades de este por c/u bodega
                    _id: { $first: "$total_productos.name"}, // first es usaod en el group para traer la primera coincidencia de datos, ya que este sin el first da un array de objetos.
                    totalUnidades: {$sum:"$cantity"}
                }
            },
            {
                $sort:{totalUnidades:-1} //ordena de manera descendente
            }
        ])
        .toArray();
        res.send(data)
        
    } catch (error) {
        res.status(500).json({
            message: "No se pueden listar los productos",
            error:error.message
        })
    }
})

//7. Realizar un EndPoint que permita insertar un productos y a su vez asigne una cantidad inicial del mismo en la tabla inventarios en una de las bodegas por default.

Producto.post("/", async(req,res)=>{
    console.log(req.rateLimit);
    try {
        
        let collection = db.collection("products");
        await collection.insertOne(req.body)
        res.status(200).json({
            message:"Se ha insertado un producto nuevo",
            data: req.body,
        });
        let {ID,created_at,created_by} = req.body

        let collectinvent= db.collection("inventories");
        await collectinvent.insertOne({
            ID,
            ID_winery:1,
            ID_product:1,
            cantity:1,
            created_by,
            created_at
        })


        
    } catch (error) {
        res.status(500).json({
            message: "no se pudo insertar un producto nuevo",
            error:error.message
        })
    }
})



export default Producto;