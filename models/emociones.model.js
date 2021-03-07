const { Schema, model } = require('mongoose')

const EmocionSchema = Schema({
    nombreEmocion:    { type: String,     required:true },
}, { collections: 'emociones' })



EmocionSchema.methods.toJSON = function(){
    let emocion = this;
    let emocionObject = emocion.toObject();
    delete emocionObject.__v;
    return emocionObject;
}
    



/* exportamos el modulo  */
module.exports = model('Emociones', EmocionSchema);
