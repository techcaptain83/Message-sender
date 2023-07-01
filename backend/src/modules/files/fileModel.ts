import mongoose = require("mongoose");

const File = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});

export default mongoose.model('File', File);