import mongoose from "mongoose";

const booksSchema=new mongoose.Schema({
    book_name:{type:String},
    book_author:{type:String},
    book_price:{type:Number},
    book_code:{type:String},
    book_publisher:{type:String},
    book_buy_url:{type:String}
})
const books=new mongoose.model("Book",booksSchema);
export default books;