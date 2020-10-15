const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    model: {
        type: String,
        default: "Project"
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        enum: ["Fantasía", "Terror", "Ciencia-Ficción", "Space Opera", "Romance", "Aventura", "Erótico", "FanFiction", "Histórico", "Misterio", "Religioso/Espiritual", "Sátira/Humor", "Suspense", "Otro (Cuéntanos más en la sinopsis)"],
        required: true,
    },
    tagLines: {
        type: [String],
        required: true,
    },
    type: {
        type: String,
        enum: ["World-Building", "Novela", "Juego de Rol", "Guión de Viddeojuego","Guión para Cómic", "Guión de Serie/Película", "Guión de Teatro", "Relato/s"],
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false,
    }, 
    timeline: {
        type: [String]
    }

}, {
    timestamps: true
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project