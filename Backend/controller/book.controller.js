import Book from "../model/book.model.js";

export const getBook = async(req, res) => { //Async function so that function execution is paused until the resposnse
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};