import books from "../models/books.js";

const addBook=async(req,res)=>{
    try{
        const bookDetails=req.body;

        await books.create(bookDetails);

        const allBooks=await books.find({});

        res.status(200).json({success:true,message:"Book Created",books:allBooks});
    }
    catch(error){
        res.status(500).json({success:false,message:"Error in adding Book",error:error.message});
    }
}
const removeBook=async(req,res)=>{
    try{
        const {bookID}=req.body;
        
        await books.findByIdAndDelete(bookID);

        const allBooks=await books.find({});

        res.status(200).json({success:true,message:"Book Deleted",books:allBooks});
    }
    catch(error){
        res.status(500).json({success:false,message:"Error in deleting Book",error:error.message});
    }
}
const getAllBooks=async(req,res)=>{
    try{
        const allBooks=await books.find({});

        res.status(200).json({success:true,message:"get All Books",books:allBooks});
    }
    catch(error){
        res.status(500).json({success:false,message:"Error in Getting Book",error:error.message});
    }
}
const updateBook=async(req,res)=>{
    try{
        const {book_name,book_author,book_price,book_code,book_publisher,book_buy_url,bookID}=req.body;

        const bookFind=await books.findById(bookID);
        
        bookFind.book_name=book_name || bookFind.book_name;

        bookFind.book_author=book_author || bookFind.book_author;

        bookFind.book_price=book_price || bookFind.book_price;

        bookFind.book_code=book_code || bookFind.book_code;

        bookFind.book_publisher=book_publisher || bookFind.book_publisher;

        bookFind.book_buy_url=book_buy_url || bookFind.book_buy_url;

        await bookFind.save();

        const allBooks=await books.find({});

        res.status(200).json({success:true,message:"updated Book",books:allBooks});
    }
    catch(error){
        res.status(500).json({success:false,message:"Error in updating Book",error:error.message});
    }
}

export {
    addBook,
    removeBook,
    getAllBooks,
    updateBook
}