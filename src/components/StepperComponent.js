import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {store} from '../store'
import history from '.././history';
import {Redirect} from 'react-router-dom'

const styles = theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Search flights', 'Choose the one', 'Choose the sits', 'Personal Data', 'Confirm the reservation'];
}

function getStepContent(step) {
    const url = window.location.href;
    const endpoint = url.slice(21, url.length);
    switch (step) {
        case 0:
            if(endpoint === '/reservation/*' && endpoint !== '/reservation/set-parameters') {
                return history.push("/reservation/set-parameters");
            }
            return '';
        case 1:
            if(endpoint === '/reservation/choose-flight') return '';
            return history.push("/reservation/choose-flight");
        case 2:
            if(endpoint === '/reservation/set-places') return '';
            return history.push("/reservation/set-places");
        case 3:
            if(endpoint === '/reservation/personal-data') return '';
            return history.push("/reservation/personal-data");
        case 4:
            if(endpoint === '/reservation/confirm-reservation') return '';
            return history.push("/reservation/confirm-reservation");
        default:
            return '';
    }
}

export class StepperComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            activeStep: 0,
            actualStep: 0
        }
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.activeStep !== store.getState().stepper.step)
                this.setState({activeStep: store.getState().stepper.step})
            }, 1000)
    }

    componentWillUnmount() {
        console.log('stepper unmount')
    }

    handleNext = () => {
        const {activeStep} = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const {activeStep} = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const steps = getSteps();
        const {activeStep} = this.state;

        return (
            <div className="stepperek">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}

                </Stepper>

                <div>
                    {getStepContent(this.state.activeStep)}
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(StepperComponent);