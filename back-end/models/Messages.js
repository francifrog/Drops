const mongoose = require ('mongoose'),
    Schema = mongoose.Schema;
    ObjectId = Schema.Types.ObjectId

const msgsSchema = new Schema ({
    author: {type: String, required: true},
    message: {type: String, required: true},
    tone: {type: String, required: true},
})

const msgsModel = mongoose.model('msgs', msgsSchema);

module.exports = msgsModel