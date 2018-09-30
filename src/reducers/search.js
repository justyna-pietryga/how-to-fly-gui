export const search = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_PARAMETERS_SET':
            return action.payload;
        default:
            return state;
    }
};