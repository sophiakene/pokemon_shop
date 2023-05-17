import React, { useState, createContext } from "react";
import './App.css'
import { LoginForm } from './forms'
import { Footer } from './footer'
import { Header } from "./header"



function App() {
  

  return (
    <div className="App">
      <Header/>
      {/* Set Usercontext for LoginForm overriding default values  */}
      
      {/* <p>{user} with id {id}</p> */}
      <Footer />
    </div>
  );
}

export default App;
