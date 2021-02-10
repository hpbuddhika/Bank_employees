const mongoose = require("mongoose");
const Employee = require("./employee");

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,

    },
    employee: [{ type: Schema.Types.ObjectId, ref: Employee }]
}, {
    timestamps: true
});


module.exports = mongoose.model("Branch",branchSchema);

