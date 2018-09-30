export const flights = (state = [], action) => {
    switch (action.type) {
        case 'FLIGHTS_SEARCHER_SUCCESS':
            return [
                ...action.payload
            ];
        default:
            return state;
    }
}