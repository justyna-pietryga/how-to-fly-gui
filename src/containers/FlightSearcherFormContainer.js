import {setSearchParameters, setFlightsSearched, setFirstStep} from ".././actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {FlightSearcherFormComponent} from "../components/FlightSearcherFormComponent";

const mapStateToProps = (state) => {
    return {
        cities: state.cities
    }
};
const mapDispatchToProps = dispatch =>
    ({actions: bindActionCreators(
        {setSearchParameters, setFlightsSearched, setFirstStep}, dispatch) });

export const FlightSearcherFormContainer = connect(mapStateToProps, mapDispatchToProps)(FlightSearcherFormComponent);