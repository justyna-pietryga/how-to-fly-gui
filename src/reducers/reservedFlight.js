const initialState = {
  chosenFlight: -1,
  chosenPlaces: []
};

export const reservedFlight = (state = initialState, action) => {
    switch (action.type) {
        case 'FLIGHTS_CHOSEN_TO_RESERVE':
            return {...state, chosenFlight: action.payload};

        case 'PLACES_CHOSEN_TO_RESERVE':
            return {
                ...state,
                chosenPlaces: [...state, ...action.payload]
            };

        case 'REMOVE_PLACE_FROM_RESERVE':
            return {
                ...state,
                chosenPlaces: [...state.chosenPlaces.filter(row => row.id !== action.payload.id)]
            };

        default:
            return state;
    }
};