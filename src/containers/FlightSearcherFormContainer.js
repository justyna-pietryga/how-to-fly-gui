import {setSearchParameters, setFlightsSearched, setFirstStep, setTimeMode} from ".././actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {FlightSearcherFormComponent} from "../components/FlightSearcherFormComponent";

const mapStateToProps = (state) => {
    return {
        cities: state.cities,
        timeMode: state.ui.timeMode
    }
};
const mapDispatchToProps = dispatch =>
    ({actions: bindActionCreators(
        {setSearchParameters, setFlightsSearched, setFirstStep, setTimeMode}, dispatch) });

export const FlightSearcherFormContainer = connect(mapStateToProps, mapDispatchToProps)(FlightSearcherFormComponent);