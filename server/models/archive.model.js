const mongoose = require('mongoose')
const Schema = mongoose.Schema

const archiveSchema = new Schema({
    model: {
        type: String,
        default: "Archive"
    },
    isStory: {
        type: Boolean,
        default: false
    },
    originProject: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    parentFolder: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
    },
    name: {
        type: String,
        required: true,
    },
    relatedArchives: {
        type: [Schema.Types.ObjectId],
        ref: "Archive",
    },
    description: {
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
    }
}, {
    timestamps: true
})

const Archive = mongoose.model('Archive', archiveSchema)
module.exports = Archive