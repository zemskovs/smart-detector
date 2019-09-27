import React, { Component } from "react";
import Menu from "../containers/menu";
import { Container, Card } from "semantic-ui-react";
import BookCard from "../containers/bookCard";
import Filter from "../containers/filter";

class App extends Component {
	componentDidMount() {
		const { setBooks } = this.props;
		fetch("https://zemskovs.github.io/capacitor-app/books.json")
			.then(response => response.json())
			.then(books => setBooks(books));
	}

	render() {
		const { books, isReady, setFilter } = this.props;
		return (
			<Container>
				<Menu />
				<Filter setFilter={setFilter} />
				{/* <Card.Group itemsPerRow={4}>
					{!isReady
						? "...Загрузка"
						: books.map(book => {
								return <BookCard  {...book} />;
						  })}
				</Card.Group> */}
			</Container>
		);
	}
}

export default App;
