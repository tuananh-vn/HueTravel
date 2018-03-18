/**
 * Created by Hin keu on 4/11/2017.
 */

import * as types from "./action-types";

export const showProcessingPrompt = (message) => {
	return {type: types.UI_SHOW_PROCESSING_PROMPT, message};
};

export const hideProcessingPrompt = () => {
	return {type: types.UI_HIDE_PROCESSING_PROMPT};
};
