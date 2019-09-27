import { connect } from "react-redux";
import App from "../components/app";
import { bindActionCreators } from "redux";
import * as booksActions from "../actions/books";
import orderBy from "lodash/orderBy";
import { filterNames } from "../components/filter";
import { withRouter } from 'react-router-dom'

const sortBy = (books, filterBy) => {
	switch (filterBy) {
		case filterNames.all:
			return books;
		case filterNames.hightPrice:
			return orderBy(books, "price", "desc");
		case filterNames.lowPrice:
			return orderBy(books, "price", "asc");
		case filterNames.author:
			return orderBy(books, "author", "asc");
		default:
			return books;
	}
};

const filterBooks = (books, searchQuery) => {
	const query = searchQuery.toLowerCase();
	return books.filter(
		book =>
			book.title.toLowerCase().indexOf(query) >= 0 ||
			book.author.toLowerCase().indexOf(query) >=0
	);
}

const searchBooks = (books, filterBy, searchQuery) => sortBy(filterBooks(books, searchQuery), filterBy)

const mapStateToProps = ({ books, filter }) => {
	return {
		books: books.items && searchBooks(books.items, filter.filterBy, filter.searchQuery),
		isReady: books.isReady
	};
};

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(booksActions, dispatch)
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App));
