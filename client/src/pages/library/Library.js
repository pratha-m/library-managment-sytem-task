import React, { useEffect, useState,useRef } from 'react'
import "./library.css";
import Table from '../../components/table/Table';
import axios from 'axios';

  const Library = ({setProgress,successToast,errorToast}) => {
  const initialPopupFormData={
    book_name:"",
    book_author:"",
    book_publisher:"",
    book_buy_url:"",
    book_code:"",
    book_price:0
  }  
  // States     
  const [allBooks,setAllBooks]=useState({isFetching:true,books:[]});
  const [popup,setPopup]=useState({isVisible:false,isUpdatedPopup:false,updateBookData:{}});
  const [popupFormData,setPopupFormData]=useState(initialPopupFormData);
  // Refs    
  const book_name_element=useRef();
  const book_author_element=useRef();
  const book_publisher_element=useRef();
  const book_buy_url_element=useRef();
  const book_code_element=useRef();
  const book_price_element=useRef();
  // UseEffects 
  useEffect(()=>{
     getAllBooks();
  },[]);
  // Functions 
  const getAllBooks=async()=>{
    try{
      setAllBooks({...allBooks,isFetching:true})
      const result=await axios.post("http://localhost:3001/api/v1/library/book/all",{});
      if(result.status===200){
        setAllBooks({books:result.data.books,isFetching:false})
      }
    }
    catch(error){
      setAllBooks({...allBooks,isFetching:false})
      if(error.response){
        console.log(error.response.data.message)
      }
      else{
        console.log(error.message)
      }
    }
  }
  const updateBook=async(bookID)=>{
    const book_name=book_name_element.current.value;
    const book_author=book_author_element.current.value;
    const book_publisher=book_publisher_element.current.value;
    const book_buy_url=book_buy_url_element.current.value;
    const book_code=book_code_element.current.value;
    const book_price=parseInt(book_price_element.current.value);
    try{
      setProgress(60);
      setAllBooks({isFetching:true,...allBooks});
      const result=await axios.post("http://localhost:3001/api/v1/library/book/update",{
        book_name,
        book_author,
        book_price,
        book_code,
        book_publisher,
        book_buy_url,
        bookID:bookID
      });
      if(result.status===200){
          setProgress(100);
          setAllBooks({isFetching:false,books:result.data.books})
      }
    }
    catch(error){
      setProgress(100);
      setAllBooks({isFetchinQns:false,...allBooks});
      if(error.response) errorToast(error.response.data.message)
      else errorToast("Network Error Occured");
    } 
  }
  const createBook=async()=>{
    const {book_name,book_author,book_publisher,book_buy_url,book_code,book_price}=popupFormData;
    if(book_name && book_author && book_publisher && book_buy_url && book_code && book_price>=0){
      try{
        setProgress(60);
        setAllBooks({isFetching:true,...allBooks});
        const result=await axios.post("http://localhost:3001/api/v1/library/book/add",{
            book_name,
            book_author,
            book_publisher,
            book_buy_url,
            book_code,
            book_price,
        });
        if(result.status===200){
          setPopupFormData(initialPopupFormData)
            setProgress(100);
            setAllBooks({isFetching:false,books:result.data.books})
            setPopup({isUpdatedPopup:false,isVisible:false,updateBookData:{}})
            successToast(result.data.message)
        }
      }
      catch(error){
        setPopup({isUpdatedPopup:false,isVisible:false,updateBookData:{}})
        setPopupFormData(initialPopupFormData)
        setProgress(100);
        setAllBooks({isFetchinQns:false,...allBooks});
        if(error.response){errorToast(error.response.data.message)}
        else errorToast("Network Error Occured");
      } 
    }
    else{
      errorToast("Pls Fill All Fields")
    }
  }
  const clearAllInputs=()=>{
    book_name_element.current.value=null;
    book_author_element.current.value=null;
    book_publisher_element.current.value=null;
    book_buy_url_element.current.value=null;
    book_code_element.current.value=null;
    book_price_element.current.value=0;
  }


  return (
    <div className='libraryPage'>
       <div className="libraryPageTop">  
          <div className="booksHead">Library Books</div>
          <div className="createBookBtn">
            <button onClick={()=>{
              setPopup({updateBookData:{},isUpdatedPopup:false,isVisible:true})
              setPopupFormData(initialPopupFormData);
              clearAllInputs();
            }}>Create Book</button>
          </div>
       </div>
       <div className="booksTable">
          <Table 
             allBooks={allBooks} 
             setAllBooks={setAllBooks} 
             getAllBooks={getAllBooks}
             setProgress={setProgress}
             setPopup={setPopup}
          />
       </div>
       <div className={`popupContainer ${popup.isVisible?"show":"hide"}`}>
         <div className="createBookPupup">
            <div className="popupTop">
              <div className="popupHead">{popup.isUpdatedPopup?"Update Book":"Create Book"}</div>
              <div className="popupCloseBtn">
                <button onClick={()=>{
                  setPopup({isUpdatedPopup:false,isVisible:false,updateBookData:{}})
                  setPopupFormData(initialPopupFormData)
                  clearAllInputs()
                }}><img src="/images/crossicon-black.png" alt=""  /></button>
              </div>
            </div>
            <div className="popupContent">
                <input 
                  ref={book_name_element}
                  type="text" 
                  value={popup.isUpdatedPopup?(popup.updateBookData.book_name):popupFormData.book_name} 
                  placeholder='Book Name'
                  onChange={(e)=>{
                    popup.isUpdatedPopup?setPopup({
                      ...popup,
                      updateBookData: {
                        ...popup.updateBookData,
                        book_name: e.target.value
                      }
                    }):setPopupFormData({...popupFormData,book_name:e.target.value})
                  }}
                />
                <input 
                  ref={book_author_element}
                  type="text" 
                  value={popup.isUpdatedPopup?(popup.updateBookData.book_author):popupFormData.book_author} 
                  placeholder='Book Author'
                  onChange={(e)=>{
                    popup.isUpdatedPopup?setPopup({
                      ...popup,
                      updateBookData: {
                        ...popup.updateBookData,
                        book_author: e.target.value
                      }
                    }):setPopupFormData({...popupFormData,book_author:e.target.value})
                  }}
                />
                <input 
                  ref={book_price_element}
                  type="number" 
                  value={popup.isUpdatedPopup?(popup.updateBookData.book_price):popupFormData.book_price}  
                  placeholder='Book Price'
                  onChange={(e)=>{
                    popup.isUpdatedPopup?setPopup({
                      ...popup,
                      updateBookData: {
                        ...popup.updateBookData,
                        book_price: parseInt(e.target.value)
                      }
                    }):setPopupFormData({...popupFormData,book_price:parseInt(e.target.value)})
                  }}
                />
                <input 
                  ref={book_publisher_element}
                  type="text" 
                  value={popup.isUpdatedPopup?(popup.updateBookData.book_publisher):popupFormData.book_publisher} 
                  placeholder='Book Publisher'
                  onChange={(e)=>{
                    popup.isUpdatedPopup?setPopup({
                      ...popup,
                      updateBookData: {
                        ...popup.updateBookData,
                        book_publisher: parseInt(e.target.value)
                      }
                    }):setPopupFormData({...popupFormData,book_publisher:e.target.value})
                  }}
                />
                <input 
                  ref={book_buy_url_element} 
                  type="text" 
                  value={popup.isUpdatedPopup?(popup.updateBookData.book_buy_url):popupFormData.book_buy_url} 
                  placeholder='Book Buy Link'
                  onChange={(e)=>{
                    popup.isUpdatedPopup?setPopup({
                      ...popup,
                      updateBookData: {
                        ...popup.updateBookData,
                        book_buy_url:e.target.value
                      }
                    }):setPopupFormData({...popupFormData,book_buy_url:e.target.value})
                  }}
                />
                <input 
                  ref={book_code_element}
                  type="text" 
                  value={popup.isUpdatedPopup?(popup.updateBookData.book_code):popupFormData.book_code} 
                  placeholder='Book Code'
                  onChange={(e)=>{
                    popup.isUpdatedPopup?setPopup({
                      ...popup,
                      updateBookData: {
                        ...popup.updateBookData,
                        book_code:e.target.value
                      }
                    }):setPopupFormData({...popupFormData,book_code:e.target.value})
                  }}
                />
                {
                  popup.isUpdatedPopup?
                  <button onClick={()=>{updateBook(popup.updateBookData._id)}}>Update Book</button>:
                  <button onClick={createBook}>Create Book</button>
                }
            </div>
         </div>
       </div>
    </div>
  )
}

export default Library;