const initial_state =
    {step: 0}
;

export const stepper = (state = initial_state, action) => {
    switch (action.type) {
        case 'NEXT_STEP_COMPLETED':
            return {step: action.payload};
        default:
            return state;
    }
};