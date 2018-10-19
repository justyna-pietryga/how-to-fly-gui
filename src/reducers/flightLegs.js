export const flightLegs = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_FLIGHT_LEGS_SUCCESS':
            return action.flightLegs;
        default:
            return state;
    }
};