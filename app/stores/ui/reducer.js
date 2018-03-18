import * as types from "./action-types";

const initialState = ({
	processing: {
		show: false,
		message: ''
	}
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.UI_SHOW_PROCESSING_PROMPT:
			return {
				...state,
				processing: {
					show: true,
					message: action.message
				}
			};
		case types.UI_HIDE_PROCESSING_PROMPT:
			return { ...state, processing: initialState.processing }
		default:
			return state;
	}
}
