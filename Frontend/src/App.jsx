// eslint-disable-next-line no-unused-vars
import React from "react";
import Home from "./home/Home";
import { Route, Routes } from "react-router-dom"
import Course from "./courses/Courses";
import Signup from "./Components/Signup";

function App() {
  return(
  <> 
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path = "/" element ={<Home/>}/>  
        <Route path = "/course" element ={<Course/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
      </Routes>
    </div>
  </>);
}

export default App;
