const initialState = {
    reservations: []
};

export const reservations = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RESERVED_PLACES_FOR_FLIGHT_LEG':
            return {
                reservations: [
                 ...state.reservations,
                    { ...action.payload}
                ]
            };
        default:
            return state;
    }
};