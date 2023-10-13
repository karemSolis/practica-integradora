import {Router} from "express";

//mongoose, importa el modelo de carrito
import  {cartsmodel}  from "../dao/models/carts.model.js";


const cartRouter = Router();


cartRouter.get('/', async (req, res) => { 
    try {
        let carts = await cartsmodel.find();
        res.send({ result: "success", payload: carts });
    } catch (error) {
        console.log(error);
    }
});

cartRouter.post('/', async (req, res) => {
    
    let { producto, descripcion, cantidad, valor } = req.body;
    console.log("Datos recibidos:", req.body);

    if (!producto || !descripcion || !cantidad || !valor) {
        res.status(400).send({ status: "error", error: "Missing body params" });
    } else {
        let result = await cartsmodel.create({ producto, descripcion, cantidad, valor });
        res.status(201).send({ result: "success", payload: result });
    }
});


cartRouter.put('/:carts_id', async (req, res) => {
    let { carts_id } = req.params;

    let cartsToReplace = req.body;
    if (!cartsToReplace.producto || !cartsToReplace.descripcion || !cartsToReplace.cantidad || !cartsToReplace.valor) {
        res.send({ status: "error", error: "Missing body params" });
    }
    let result = await cartsmodel.updateOne({ _id: carts_id }, cartsToReplace);
    res.send({ result: "success", payload: result });
});

cartRouter.delete('/:carts_id', async (req, res) => {
    let { carts_id } = req.params;
    let result = await cartsmodel.deleteOne({ _id: carts_id });
    res.send({ result: "success", payload: result });
});


export default cartRouter;