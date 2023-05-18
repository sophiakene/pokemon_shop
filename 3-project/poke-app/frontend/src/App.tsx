import React, { useState, createContext, useEffect } from "react";
import './App.css'
import { Footer } from './footer'
import { Header } from "./header"
import { CarouselBanner } from "./carousel";

function App() {
  return (
    <div className="App">
      <Header/>
      <Footer />
    </div>
  );
}

export default App;