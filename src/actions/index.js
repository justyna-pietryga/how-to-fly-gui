export const citiesFetched = (cities) => ({
    type: 'FETCH_CITIES_SUCCESS',
    cities
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