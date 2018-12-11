import * as actionTypes from '../actions/actionTypes';

const UIReducer = (state = null, action) => {
    let newState;
    switch (action.types) {
        case actionTypes.TOGGLE_SIDEBAR:
            newState = {
                ...state,
                shouldShowSidebar: !state.shouldShowSidebar
            };
            return newState;
        default: return state;
    }
}

export default UIReducer;