import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Library from './pages/library/Library';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [progress,setProgress]=useState(0);

  const successToast=(text)=>{
   toast.success(text, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId:"custom"
   });
  }
  const errorToast=(text)=>{
   toast.error(text, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId:"custom"
   });
  }

  return (
     <Router>
        <Header/>
          <Routes>
             <Route exact path="/" element={<Home/>}></Route>               
             <Route exact path="/about" element={<About/>}></Route>               
             <Route exact path="/contact" element={<Contact/>}></Route>               
             <Route exact path="/library" element={<Library setProgress={setProgress} successToast={successToast} errorToast={errorToast}/>}></Route>               
          </Routes>   
        <Footer/>
            <LoadingBar
              color='#f11946'
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
            />
            <ToastContainer
             position="top-center"
             autoClose={5000}
             hideProgressBar
             newestOnTop={false}
             closeOnClick={false}
             rtl={false}
             pauseOnFocusLoss={false}
             draggable={false}
             pauseOnHover={false}
             theme="light"
            />
     </Router>
  );
}

export default App;
