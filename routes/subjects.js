'use strict';

const express = require('express');
const router = express.Router();

// Subjects CRUD Endpoints
router.get('/', (req, res) => {
    // Get all subjects
});

router.post('/', (req, res) => {
    // Create a new subject
});

router.get('/:id', (req, res) => {
    // Get a subject by ID
});

router.put('/:id', (req, res) => {
    // Update a subject by ID
});

router.delete('/:id', (req, res) => {
    // Delete a subject by ID
});

module.exports = router;