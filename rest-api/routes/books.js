const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

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
        return res
        .status(404)
        .json({status: 'Not found'})
    }
});

router.post('/', (req, res) => {
    const book = {
        title: req.body.title || 'Default title',
        author: req.body.author || 'Default autor',
        id: uuidv4()
    }
    books.push(book);
    return res.json(book);
});

router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    books.forEach((book) => {
        if(book.id === bookId) {
            book.title = req.body.title;
            book.author = req.body.author;
        }
    });
    const newBook = books.find(book => book.id === bookId);
    return res.json(newBook);
});

router.delete('/:id', (req,res) => {
    const bookId = parseInt(req.params.id, 10);
    
    books = books.filter(book => book.id != book.bookId );
    
    const existBook = books.find(book => book.id === bookId);
    
    if(!existBook){
        return res.send(`Book with ${bookId} was deleted`).status(200);
    } else {
        return res.send(`something wrong`).status(400);
    }
})

module.exports = router;