import { connect } from "react-redux";
import Menu from "../components/menu";
import { bindActionCreators } from "redux";
import * as filterActions from "../actions/filter";
import uniqBy from 'lodash/uniqBy';

const mapStateToProps = ({ cart }) => ({
  totalPrice: cart.items.reduce((total, book) => total + book.price, 0),
  count: cart.items.length,
  items: uniqBy(cart.items, o => o.id),
});

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(filterActions, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu);
