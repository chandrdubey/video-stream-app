const mongoose = require("mongoose");

const qustionSchema = mongoose.Schema({
   
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers: [
        {
            qustion: {
                type: string
            },
            answer: {
                type: string
            }
        }
    ],
});

module.exports = mongoose.model("Qustions", qustionSchema);
