const mongoose = require('mongoose')
const Schema = mongoose.Schema

const characterSchema = new Schema({
    model: {
        type: String,
        default: "Character"
    },
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    name: {
        type: String,
        required: true,
        default: "Nueva Carpeta"
    },
    surname: {
        type: String,
    },
    genre: {
        type: String,
    },
    age: {
        type: Number,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    rolHistory: {
        type: String,
    },
    occupation: {
        type: String,
    },
    physicalDescription: {
        type: [String]
    },
    personality: {
        type: [String],
    },
    habits: {
        type: [String],
    },
    notes: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Character = mongoose.model('Character', characterSchema)
module.exports = Character