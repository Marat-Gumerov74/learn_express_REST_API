const express = require('express');
const router = express.Router();

let books = [{
    id: 1,
    author: 'John Doe',                         
    title: 'Javascript Book'
}];

router.get('/', (req, res) => res.json(books));

router.get('/:id', (req, res) =>{
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(book => book.id === bookId);
    
    if (book) {
        return res.json(book);
    } else {
        return res.status(404)
                .json({status: 'Not found'})
    }
});

module.exports = router;