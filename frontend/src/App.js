import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navigation/index";
import { BrowserRouter } from "react-router-dom";
import { userActions } from "./store/actions/user";
import { connect } from "react-redux";

// remove any potential cached user or token values.
userActions.logout();

function App(props) {
	useEffect(() => {
		props.getAll();
	}, []);
    
	return props.styles ? (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		</div>
	) : <>Pending</>;
}

function mapState(state) {
	const { alldata, pending, error } = state.beerlist;
	if (alldata) {
		return { ...alldata };
	}
	return { pending, error };
}

const actionCreators = {
	getAll: userActions.getAll,
};

export default connect(mapState, actionCreators)(App);
