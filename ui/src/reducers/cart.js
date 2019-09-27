const initialState = {
	items: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TO_CART": {
			return {
				...state,
				items: [...state.items, action.payload]
			};
		}
		case "REMOVE_FROM_CART": {
			return {
				...state,
				items: state.items.filter(book => book.id != action.payload)
			};
		}
		default:
			return state;
	}
};
