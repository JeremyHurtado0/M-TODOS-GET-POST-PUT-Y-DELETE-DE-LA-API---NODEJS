import { Router } from "express";
import { getALLEjemplos, getEjemploById, postEjemplo, putEjemplo, deleteEjemplo  } from "../controllers/ejemplo.controller.js";

const ejemplo = Router();

// Usa el controlador importado
ejemplo.get('/', getALLEjemplos);

ejemplo.get('/:id', getEjemploById);

ejemplo.put('/:id',putEjemplo);

ejemplo.post('/', postEjemplo);

ejemplo.delete('/:id',deleteEjemplo);

export default ejemplo;