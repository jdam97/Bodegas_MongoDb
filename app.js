import "dotenv/config"; //eso me remplaca el dotenv.config() de una vez
import  express  from "express";
import {limitRequest} from "./config/limit.js"

//Routers
import Bodegas from "./Routers/bodejas.js"
import Producto from "./Routers/productos.js"

const app = express();
app.use(express.json());


//Endpoints
app.use("/bodegas",limitRequest(),Bodegas);
app.use("/productos",limitRequest(),Producto);








const config = JSON.parse(process.env.MY_SERVER)
app.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})
