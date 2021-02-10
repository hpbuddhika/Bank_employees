const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32

    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32
    },
    hassed_password: {
        type: String,
        required: true
    },
    salt: String,
    roll: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//virtual field

employeeSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hassed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    });


employeeSchema.methods = {

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hassed_password;
    },


    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("Employee", employeeSchema);