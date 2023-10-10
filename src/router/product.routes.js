import {Router} from "express";
import { productsmodel} from "../dao/models/products.model.js"


const productRouter = Router();


productRouter.get('/', async (req, res) => { 
    try {
        let products = await productsmodel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.log(error);
    }
});

productRouter.post('/', async (req, res) => {
    let { producto, descripcion, cantidad, valor } = req.body;

    if (!producto || !descripcion || !cantidad || !valor) {
        res.send({ status: "error", error: "Missing body params" });
    }

    let result = await productsmodel.create({ producto, descripcion, cantidad, valor });
    res.send({ result: "success", payload: result });
});

productRouter.put('/:products_id', async (req, res) => {
    let { products_id } = req.params;

    let productsToReplace = req.body;
    if (!productsToReplace.producto || !productsToReplace.descripcion || !productsToReplace.cantidad || productsToReplace.valor) {
        res.send({ status: "error", error: "Missing body params" });
    }
    let result = await productsmodel.updateOne({ _id: products_id }, productsToReplace);
    res.send({ result: "success", payload: result });
});

productRouter.delete('/:products_id', async (req, res) => {
    let { products_id } = req.params;
    let result = await productsmodel.deleteOne({ _id: products_id });
    res.send({ result: "success", payload: result });
});

export default productRouter