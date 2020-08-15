import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navigation/index";
import { BrowserRouter } from "react-router-dom";
import { userActions } from "./store/actions/user";
import { connect } from "react-redux";

// remove any potential cached user or token values.
userActions.logout();

export default function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		</div>
	);
}
