import { combineReducers } from "redux";
import { cities } from "./cities";
import { search } from "./search";
import { flights } from "./flights";
import { stepper } from "./stepper";

export default combineReducers({
    cities,
    search,
    flights,
    stepper
});