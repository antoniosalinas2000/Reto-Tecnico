const { json } = require("express");
const express = require("express");
const colorSchema = require("../models/color");
const router = express.Router();
const { check, validationResult } = require('express-validator')

async function alreadyHaveId(id) {
    let foundColor = await colorSchema.findOne({ _id: id });
    if (foundColor) {
        return true;
    } else {
        return false;
    }
};

// Create color
router.post("/colors", [check('_id').isNumeric(), check('name').isLength({ min: 3 }),
    check('year').isNumeric(), check('color').isLength({ min: 4 }), check('color').contains('#'),
    check('pantone_value').isLength({ min: 3 })
], (req, res) => {
    const { _id, name, year, color, pantone_value } = req.body;
    const errors = validationResult(req);

    //  res.status(400).json({ message: 'Color already exists' });
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else if (_id && name && year && color && pantone_value) {
        const colors = colorSchema(req.body);
        colors.save()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
        res.status(201).json({ message: 'Color created succesfully' });
    } else if (!_id || !name || !year || !color || !pantone_value) {
        res.status(400).json({ error: 'Attempt registration with missing attributes or incorrect type' });
    } else {
        res.status(500).json({ error: 'There was an error.' });
    }
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
router.put("/colors/:id", [check('name').isLength({ min: 3 }),
    check('year').isNumeric(), check('color').isLength({ min: 4 }), check('color').contains('#'),
    check('pantone_value').isLength({ min: 3 })
], (req, res) => {
    const { id } = req.params;
    const { name, year, color, pantone_value } = req.body;

    colorSchema
        .updateOne({ _id: id }, { $set: { name, year, color, pantone_value } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});


// Delete color
router.delete("/colors/:id", (req, res) => {
    const { id } = req.params;

    colorSchema
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

});

module.exports = router;