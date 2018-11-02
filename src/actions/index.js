export const citiesFetched = (cities) => ({
    type: 'FETCH_CITIES_SUCCESS',
    cities
});

export const setFlightLegs = (flightLegs) => ({
    type: 'FETCH_FLIGHT_LEGS_SUCCESS',
    flightLegs
});

export const setSearchParameters = (payload) => ({
    type: 'SEARCH_PARAMETERS_SET',
    payload
});

export const setFlightsSearched = (payload) => ({
    type: 'FLIGHTS_SEARCHER_SUCCESS',
    payload
});

export const setFirstStep = (payload) => ({
    type: 'NEXT_STEP_COMPLETED',
    payload
});

export const setReservations = (payload) => ({
    type: 'SET_RESERVED_PLACES_FOR_FLIGHT_LEG',
    payload
});

export const setFlightToReserve = (payload) => ({
    type: 'FLIGHTS_CHOSEN_TO_RESERVE',
    payload
});

export const setPlacesToReserve = (payload) => ({
    type: 'PLACES_CHOSEN_TO_RESERVE',
    payload
});

export const removePlaceFromReserve = (payload) => ({
    type: 'REMOVE_PLACE_FROM_RESERVE',
    payload
});

export const setSpecificReservation = (payload) => ({
    type: 'ADD_ONE_RESERVATION',
    payload
});

export const addSpecificReservation = (payload) => ({
    type: 'ADD_ANOTHER_RESERVATION',
    payload
});

export const addPersonalData = (payload) => ({
    type: 'ADD_PERSONAL_DATA',
    payload
});

export const removePersonalData = (payload) => ({
    type: 'REMOVE_ONE_RESERVATION',
    payload
});

export const itinerateSubmit = () => ({
    type: 'ITERATE_SUBMIT',
});

export const removeSpecificReservation = (payload) => ({
    type: 'REMOVE_ONE_RESERVATION',
    payload
});