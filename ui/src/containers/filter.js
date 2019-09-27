import { connect } from "react-redux";
import Filter from "../components/filter";
import { bindActionCreators } from "redux";
import * as filterActions from "../actions/filter";

const mapStateToProps = ({ books, filter }) => {
	return {
		filterBy: filter.filterBy
	}
};

const mapDispatchToProps = dispatch => {
	return {
		...bindActionCreators(filterActions, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Filter);
