import "dotenv/config"; //eso me remplaca el dotenv.config() de una vez
import  express  from "express";
import {limitRequest} from "./config/limit.js"

//Routers
import Bodegas from "./Routers/bodejas.js"
import Producto from "./Routers/productos.js"

const app = express();
app.use(express.json());

app.use(limitRequest())
//Endpoints
app.use("/bodegas",Bodegas);
app.use("/productos",Producto);








const config = JSON.parse(process.env.MY_SERVER)
app.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})
