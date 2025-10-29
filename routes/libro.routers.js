import { Router } from "express";
import { 
    getAllLibros, 
    getLibroById, 
    getLibrosByGenero,
    getLibrosDisponibles,
    getLibrosByAutor,
    postLibro, 
    putLibro, 
    deleteLibro 
} from "../controllers/libro.controller.js";

const libro = Router();

// Rutas
libro.get('/', getAllLibros);

libro.get('/disponibles', getLibrosDisponibles);

libro.get('/:id', getLibroById);

libro.get('/genero/:genero', getLibrosByGenero);

libro.get('/autor/:autor', getLibrosByAutor);

libro.post('/', postLibro);

libro.put('/:id', putLibro);

libro.delete('/:id', deleteLibro);

export default libro;