import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {store} from '../store'
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
    return ['Search flights', 'Choose the one', 'Choose the sits', 'Confirm the reservation'];
}

function getStepContent(step) {
    const url = window.location.href;
    const endpoint = url.slice(21, url.length);
    switch (step) {
        case 0:
            if(endpoint === '/reservation/setParameters') return '';
            return <Redirect to="/reservation/setParameters"/>;
        case 1:
            if(endpoint === '/reservation/chooseFlight') return '';
            return <Redirect to="/reservation/chooseFlight"/>;
        case 2:
            return 'Choose the sits';
        case 3:
            return 'Confirm the reservation';
        default:
            return 'Uknown stepIndex';
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
                    {/*<Button*/}
                    {/*disabled={activeStep === 0}*/}
                    {/*onClick={this.handleBack}*/}
                    {/*className={classes.backButton}*/}
                    {/*>*/}
                    {/*Back*/}
                    {/*</Button>*/}
                    {/*<Button variant="contained" color="primary" onClick={this.handleNext}>*/}
                    {/*{activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
                    {/*</Button>*/}
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(StepperComponent);