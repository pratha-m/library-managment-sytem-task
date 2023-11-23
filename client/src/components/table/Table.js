import React from 'react'
import "./table.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Table = ({allBooks,setAllBooks,getAllBooks,setProgress,setPopup}) => {
    const trimString=(str)=>{
       if(str && str.length>=13) str=str.substring(0,13)+"..";
       if(!str) return "N/A"
       return str;
    }
    const deleteBook=async(bookID)=>{
        try{
            setProgress(60);
            setAllBooks({isFetching:true,...allBooks});
            const result=await axios.post("http://localhost:3001/api/v1/library/book/remove",{bookID:bookID});
            if(result.status===200){
                setProgress(100);
                setAllBooks({isFetching:false,books:result.data.books})
            }
          }
          catch(error){
            setProgress(100);
            setAllBooks({isFetchinQns:false,...allBooks});
            if(error.response) console.log(error.response.data.message)
            else console.log("Network Error Occured");
          }
    }

    return (
        <div className='tableContainer'>
            <table className="questionsTable">
                <thead>
                    <tr className="head">
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Publisher</th>
                        <th>Book Code</th>
                        <th>Buy</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>      
                    {allBooks.isFetching?<tr><td>Loading...</td></tr>:(
                         allBooks.books.length===0?<tr><td>Sorry No Books</td></tr>:(
                            allBooks.books && allBooks.books.map((eachBook,index)=>{
                                return (
                                    <tr className="dataRow" key={eachBook._id}>
                                        <td>{index+1}</td>
                                        <td><div className="textarea">{trimString(eachBook.book_name)}</div></td>
                                        <td><div>{trimString(eachBook.book_author)}</div></td>
                                        <td><div>{trimString(eachBook.book_price)}Rs</div></td>
                                        <td><div>{trimString(eachBook.book_publisher)}</div></td>
                                        <td><div>{trimString(eachBook.book_code)}</div></td>
                                        <td><Link to={eachBook.book_buy_url} target='_blank'>Buy</Link></td>
                                        <td className='optionsBox'>
                                            <button className='otherBtn' onClick={()=>{
                                                setPopup({isUpdatedPopup:true,isVisible:true,updateBookData:eachBook})
                                            }}><img src="/images/edit-black.png" alt="" /></button>
                                            <button className='otherBtn' onClick={()=>{deleteBook(eachBook._id)}}><img src="/images/delete-black.png" alt="" /></button>
                                        </td>
                                    </tr>
                                )
                            })
                    ))}
                        
                                       
                </tbody>
            </table>
        </div>
    )
}

export default Table