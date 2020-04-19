import React from "react";
import "./App.css";
import Navbar from "./components/navigation/index";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </div>
    );
}

export default App;
