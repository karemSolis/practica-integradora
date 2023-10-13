import mongoose from "mongoose";

const cartsCollection = "carts" // así mismo se debe llamar en la base de datos ya que define la colección de la base de datos

//acá se define el esquema del carrito
const cartsSchema = new mongoose.Schema({

    producto: {type: String, max:20, required:true},
    descripcion: {type: String, max:20, required:true},
    cantidad: {type: Number, max:20, required:true},
    valor: {type: Number, max:20, required:true}
    //el id no se agrega porque se agregará automáticamente desde atlas
});

export const cartsmodel = mongoose.model(cartsCollection, cartsSchema)
