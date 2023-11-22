import express from "express";

import {addBook, getAllBooks, removeBook, updateBook} from "../controllers/booksController.js";

const router=express.Router();

router.post("/add",addBook);

router.post("/remove",removeBook);

router.post("/update",updateBook);

router.post("/all",getAllBooks);

export default router;