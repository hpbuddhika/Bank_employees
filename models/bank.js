const mongoose = require("mongoose");
const Branch = require("./branch")

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    branches:[{ type: Schema.Types.ObjectId, ref: Branch }]
}, {
    timestamps: true
});


module.exports = mongoose.model("Bank",bankSchema);

