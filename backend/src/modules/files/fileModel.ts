import mongoose = require("mongoose");

const File = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('File', File);