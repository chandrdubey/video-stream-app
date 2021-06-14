const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    answers: [
        {
            qustion: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ],
    isAdmin :{
        type: Boolean,
        default:false
    },
    userDelete :{
        type: Boolean,
        default:false
    }
    
});

module.exports = mongoose.model("User", userSchema);
