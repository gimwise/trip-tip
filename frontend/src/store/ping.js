// REDUX PING TEST

const PING = "PING";

export const funcPing = () => {
    return {
        type : PING,
        payload : "hi"
    }
}

let initialState = {
    hi : "hi",
    ping: "ping"
};

export const ping = (state =  initialState, action) => {
    switch (action.type) {
        case PING:
            initialState = {
                ...state,
                ping : "pong"
            }
            return initialState;
        default:
            return state;
    }
};
