import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Task = new Schema({
    title: {
        type: String
    },
    responsible: {
        type: String 
    },
    description: {
        type: String
    },
    receiver: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    }
});

export default mongoose.model('Task', Task);
