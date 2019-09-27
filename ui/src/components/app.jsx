import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { ExpertPage } from "./expertPage";

class App extends Component {
	componentDidMount() {
		// fetch("https://zemskovs.github.io/capacitor-app/books.json")
		// 	.then(response => response.json())
		// 	.then(books => setBooks(books));
	}

	render() {
		return (
			<ExpertPage />
		);
	}
}

export default App;
