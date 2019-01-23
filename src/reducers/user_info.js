import AuthService from "../components/web-structure/login-logout/AuthService";

const initialState = {
    loggedIn: false,
    reservations: [],
};

export const user_info = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_LOGGED_IN':
            return {
                ...state,
                loggedIn: action.payload
            };

        case 'SET_USER_RESERVATIONS':
            return {
                ...state,
                reservations: action.payload
            };
        default:
            return state;
    }
};