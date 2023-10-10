import mongoose from "mongoose";
const cartsCollection = "carts" // así mismo se debe llamar en la base de datos ya que define la colección de la base de datos

//acá se define el esquema del carrito
const cartsSchema = new mongoose.Schema({

    producto:String,
    descripcion:String,
    cantidad:Number,
    valor:Number
    //el id no se agrega porque se agregará automáticamente desde atlas
})

export const cartsmodel = mongoose.model(cartsCollection, cartsSchema)

/*{"producto":"silicona",
"descripcion":"selladora y con fungicida",
"valor":3700,"id":"JdpPVO3QF26VJq1ydfkiC"}, */