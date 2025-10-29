import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routers.js';
import * as db from '../bd/cnn_mongodb.js'  // Asegúrate que la ruta sea correcta

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute = '/api/';

        this.middlewares();
        this.routes();
    }

    async conectarDBMongo(){
        // ✅ CORREGIDO: Solo conectar si NO está conectado
        if(!db.isConected){
            await db.conectarAMongoDB();  // ✅ Nombre correcto de la función
        } else {
            console.log('Ya estaba conectado a MongoDB');
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.generalRoute, indexRoutes);
        this.app.use((req, res) => {
    res.status(404).json({
        msg: 'Ruta no encontrada'
    });
});


    }

    async listen() {  // ✅ Hacer listen async
        // Conectar a DB antes de iniciar servidor
        await this.conectarDBMongo();
        
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", `${this.port}`.yellow); 
        });
    }
}