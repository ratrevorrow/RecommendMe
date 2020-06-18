import React from "react";
import "./App.css";
import Navbar from "./components/navigation/index";
import { BrowserRouter } from "react-router-dom";
import { userActions } from "./store/actions/user";

// remove any potential cached user or token values.
userActions.logout();

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </div>
    );
}

export default App;
