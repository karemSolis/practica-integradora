import mongoose from "mongoose";
const productsCollection = "products" // así mismo se debe llamar en la base de datos ya que define la colección de la base de datos

//acá se define el esquema de products
const productsSchema = new mongoose.Schema({

    producto:{type: String, max:20, required:true},
    descripcion:{type: String, max:20, required:true},
    cantidad:{type: Number, max:20, required:true},
    valor: {type: Number, max:20, required:true},

});

export const productsmodel = mongoose.model(productsCollection, productsSchema)
