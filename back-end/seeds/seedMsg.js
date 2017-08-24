const mongoose = require('mongoose');
const Message = require('../models/Messages');

module.exports = () => {
    Message.find({}, (err, msgs) => {
        if (err) {
            console.log(err);
        } else if (msgs.length === 0) {
            const msgsToSeed = [
                {author: 'Franci', 
                 message: 'first msg in my little mongo-bongo',
                 tone: 'Joy'
            },
            ];
            Message.collection.insert(msgsToSeed, (err, msgs) => {
                console.log(msgs)
            })
        }
    })
}
