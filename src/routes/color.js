const express = require("express");
const colorSchema = require("../models/color");
const router = express.Router();

// Create color
router.post("/colors", (req, res) => {
    const color = colorSchema(req.body);
    color.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// Get all colors
router.get("/colors", (req, res) => {
    colorSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// Get color by id
router.get("/colors/:id", (req, res) => {
    const { id } = req.params;
    colorSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// Update color
router.put("/colors/:id", (req, res) => {
    const { id } = req.params;
    const { name, year, color, pantone_value } = req.body;

    colorSchema
        .updateOne({ _id: id }, { $set: { name, year, color, pantone_value } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});


// Delete color
router.delete("/colors/:id", (req, res) => {
    const { _id } = req.params;
    colorSchema
        .remove({ id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

module.exports = router;