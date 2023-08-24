import "dotenv/config";
import { MongoClient } from "mongodb";


const DB = JSON.parse(process.env.ATLAS_CONNECTION);

export async function connectDB(){
    try{
        const URI = `mongodb+srv://${DB.user}:${DB.password}@cluster0.lfged0r.mongodb.net/${DB.database}`
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const client = await MongoClient.connect(URI,options);
        console.log("Conectado");
        return client.db();
    } catch(error){
        return {status:500,message:error}
    }
}