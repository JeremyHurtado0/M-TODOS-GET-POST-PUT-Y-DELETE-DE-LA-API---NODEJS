import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    autor: {
        type: String,
        required: [true, 'El autor es obligatorio'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'El ISBN es obligatorio'],
        unique: true,
        trim: true
    },
    editorial: {
        type: String,
        required: [true, 'La editorial es obligatoria']
    },
    anioPublicacion: {
        type: Number,
        required: [true, 'El año de publicación es obligatorio'],
        min: [1000, 'Año no válido'],
        max: [new Date().getFullYear(), 'El año no puede ser futuro']
    },
    genero: {
        type: String,
        required: [true, 'El género es obligatorio'],
        enum: ['Ficción', 'No Ficción', 'Ciencia', 'Historia', 'Biografía', 'Tecnología', 'Arte', 'Infantil', 'Romance', 'Thriller'],
        message: 'Género no válido'
    },
    numeroPaginas: {
        type: Number,
        required: false,
        min: [1, 'El número de páginas debe ser positivo']
    },
    idioma: {
        type: String,
        required: [true, 'El idioma es obligatorio'],
        default: 'Español'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    ejemplaresDisponibles: {
        type: Number,
        default: 1,
        min: [0, 'No puede haber ejemplares negativos']
    },
    precio: {
        type: Number,
        required: false,
        min: [0, 'El precio no puede ser negativo']
    },
    portada: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false,
        maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
    }
}, {
    timestamps: true
});

const Libro = mongoose.model('Libro', libroSchema);

export default Libro;