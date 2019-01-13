const initialState = {
    timeMode: true, // true is UTC, false is Local
};

export const ui = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TIME_MODE':
            return {
               ...state,
               timeMode: action.payload
            };
        default:
            return state;
    }
};