const initialState = {
  chosenFlight: -1,
  chosenPlaces: [],
  specificReservation: [],
  passengersData: [],
  submit: 0
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
                chosenPlaces: [...state.chosenPlaces.filter(row => row !== action.payload)]
            };

        case 'ADD_ONE_RESERVATION':
            return {
                ...state,
                specificReservation: [...state, ...action.payload]
            };

        case 'ADD_ANOTHER_RESERVATION':
            return {
                ...state,
                specificReservation: [...state.specificReservation, ...action.payload]
            };

        case 'REMOVE_PERSONAL_DATA':
            return {
                ...state,
                passengersData: [...state.passengersData.filter(row => row !==action.payload)]
            };

        case 'ADD_PERSONAL_DATA':
            return {
                ...state,
                passengersData: [...state.passengersData, ...action.payload]
            };

        case 'REMOVE_ONE_RESERVATION':
            return {
                ...state,
                specificReservation: [...state.specificReservation.filter(row => row !==action.payload)]
            };

        case 'ITERATE_SUBMIT':
            return {
                ...state,
                submit: ++state.submit,
                passengersData: []
            };

        default:
            return state;
    }
};