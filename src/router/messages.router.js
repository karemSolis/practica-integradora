import { Router } from "express";
import { messagesmodel } from "../dao/models/messages.model.js";

const messagesRoutes = Router();

messagesRoutes.get('/', async (req, res) => {
    try {
        let messages = await messagesmodel.find();
        res.send({ result: "success", payload: messages });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal server error" });
    }
});

messagesRoutes.post('/', async (req, res) => {
    let { user, messages } = req.body;

    if (!user || !messages) {
        res.status(400).send({ result: "error", error: "Missing body params" });
    }

    try {
        let result = await messagesmodel.create({ user, messages });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal server error" });
    }
});

messagesRoutes.put('/:messages_id', async (req, res) => {
    let { messages_id } = req.params;

    let messagesToReplace = req.body;
    if (!messagesToReplace.user || !messagesToReplace.messages) {
        res.status(400).send({ result: "error", error: "Missing body params" });
    }

    try {
        let result = await messagesmodel.updateOne({ _id: messages_id }, messagesToReplace);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal server error" });
    }
});

messagesRoutes.delete('/:messages_id', async (req, res) => {
    let { messages_id } = req.params;
    try {
        let result = await messagesmodel.deleteOne({ _id: messages_id });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal server error" });
    }
});

export default messagesRoutes;
