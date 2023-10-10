import mongoose from "mongoose";
const productsCollection = "products" // así mismo se debe llamar en la base de datos ya que define la colección de la base de datos

//acá se define el esquema de products
const productsSchema = new mongoose.Schema({

    producto:String,
    descripcion:String,
    cantidad:Number,
    valor:Number

})

export const productsmodel = mongoose.model(productsCollection, productsSchema)
