import {combineReducers} from "redux";
import {cities} from "./cities";
import {search} from "./search";
import {flights} from "./flights";
import {stepper} from "./stepper";
import {reservations} from "./reservations";
import {flightLegs} from "./flightLegs";
import {reservedFlight} from "./reservedFlight"
import {ui} from "./ui";

export default combineReducers({
    cities,
    search,
    flights,
    stepper,
    flightLegs,
    reservations,
    reservedFlight,
    ui,
});