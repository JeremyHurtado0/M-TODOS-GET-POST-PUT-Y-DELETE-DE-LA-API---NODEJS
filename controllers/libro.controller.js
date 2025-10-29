import Libro from '../models/libro.model.js';
import mongoose from 'mongoose';

export const getAllLibros = async (req, res) => {
    console.log('Obtiene todos los libros');
    try {
        const libros = await Libro.find({}, { __v: 0 });
        if (libros.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron libros'
            });
        }
        return res.status(200).json({
            total: libros.length,
            libros
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al encontrar los libros',
            error: error.message
        });
    }
};

export const getLibroById = async (req, res) => {
    console.log('LIBRO POR ID');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                msg: 'Libro no encontrado'
            });
        }
        return res.status(200).json({
            libro
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener el libro',
            error: error.message
        });
    }
};

export const getLibrosByGenero = async (req, res) => {
    console.log('LIBROS POR GÉNERO');
    const { genero } = req.params;
    try {
        const libros = await Libro.find({ genero: genero });
        if (libros.length === 0) {
            return res.status(404).json({
                msg: `No se encontraron libros del género: ${genero}`
            });
        }
        return res.status(200).json({
            genero,
            total: libros.length,
            libros
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener libros por género',
            error: error.message
        });
    }
};

export const getLibrosDisponibles = async (req, res) => {
    console.log('LIBROS DISPONIBLES');
    try {
        const libros = await Libro.find({ 
            disponible: true, 
            ejemplaresDisponibles: { $gt: 0 } 
        });
        if (libros.length === 0) {
            return res.status(404).json({
                msg: 'No hay libros disponibles en este momento'
            });
        }
        return res.status(200).json({
            total: libros.length,
            libros
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener libros disponibles',
            error: error.message
        });
    }
};

export const getLibrosByAutor = async (req, res) => {
    console.log('LIBROS POR AUTOR');
    const { autor } = req.params;
    try {
        const libros = await Libro.find({ 
            autor: { $regex: autor, $options: 'i' } 
        });
        if (libros.length === 0) {
            return res.status(404).json({
                msg: `No se encontraron libros del autor: ${autor}`
            });
        }
        return res.status(200).json({
            autor,
            total: libros.length,
            libros
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener libros por autor',
            error: error.message
        });
    }
};

export const postLibro = async (req, res) => {
    console.log('POST LIBRO');
    const body = req.body;
    const libro = new Libro(body);
    try {
        const validationError = libro.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        
        await libro.save();
        return res.status(201).json({
            msg: 'Libro creado exitosamente',
            libro
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                msg: 'El ISBN ya existe en la base de datos'
            });
        }
        return res.status(500).json({
            msg: 'Error al guardar el libro',
            error: error.message
        });
    }
};

export const putLibro = async (req, res) => {
    console.log('PUT LIBRO');
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const libro = await Libro.findByIdAndUpdate(id, body, { 
            new: true, 
            runValidators: true 
        });
        if (!libro) {
            return res.status(404).json({
                msg: 'Libro no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'Libro actualizado exitosamente',
            libro
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el libro',
            error: error.message
        });
    }
};

export const deleteLibro = async (req, res) => {
    console.log('DELETE LIBRO');
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const libro = await Libro.findByIdAndDelete(id);
        if (!libro) {
            return res.status(404).json({
                msg: 'Libro no encontrado'
            });
        }
        return res.status(200).json({
            msg: 'Libro eliminado exitosamente',
            libro
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar el libro',
            error: error.message
        });
    }
};