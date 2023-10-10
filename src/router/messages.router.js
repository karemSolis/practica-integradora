import { Router } from "express";
import { messagesmodel } from "../dao/models/messages.model.js";

const messagesRoutes = Router();

messagesRoutes.get('/', async (req, res) => { 
    try {
        let messages = await messagesmodel.find();
        res.send({ result: "success", payload: messages });
    } catch (error) {
        console.log(error);
    }ññ
});

messagesRoutes.post('/', async (req, res) => {
    let { user, messages, } = req.body;

    if (!user|| !messages ) {
        res.send({ status: "error", error: "Missing body params" });
    }

    let result = await messagesmodel.create({ user, messages, });
    res.send({ result: "success", payload: result });
});

messagesRoutes.put('/:messages_id', async (req, res) => {
    let { messages_id } = req.params;

    let messagesToReplace = req.body;
    if (messagesToReplace.producto || messagesToReplace.descripcion || messagesToReplace.cantidad || messagesToReplace.valor) {
        res.send({ status: "error", error: "Missing body params" });
    }
    let result = await messagesmodel.updateOne({ _id: messages_id }, messagesToReplace);
    res.send({ result: "success", payload: result });
});

messagesRoutes.delete('/:messages_id', async (req, res) => {
    let { messages_id } = req.params;
    let result = await messagesmodel.deleteOne({ _id: messages_id });
    res.send({ result: "success", payload: result });
});

export default messagesRoutes;