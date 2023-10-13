import mongoose from "mongoose";
const messagesCollection = "messages" // así mismo se debe llamar en la base de datos ya que define la colección de la base de datos

//acá se define el esquema de usuario y mensajje 
const messagesSchema = new mongoose.Schema({

    user:String,
    messages:String

});

export const messagesmodel = mongoose.model(messagesCollection, messagesSchema)
