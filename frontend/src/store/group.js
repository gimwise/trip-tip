import { request } from "apis/request";
import { getCookie } from "utils/Cookie";
import produce from "immer";

const GETALLGROUPS = "GETALLGROUPS";


const USERS_URL = "/groups";

const author = {
    Authorization : `JWT ${getCookie('access-token')}`
}

export const getAllGroups = ()=>{
    const data = request("get", USERS_URL, "",author);

    return {
        type : GETALLGROUPS,
        payload : data,
    }
}

const initialState = {
    groups : [],
}
const group = (state = initialState, action) => {
    switch(action.type){
        case GETALLGROUPS :
            console.log(action.payload.data);
            return produce(state, (draft) => {
                draft.groups = action.payload.data;
            })
        default :
            return state;
    }
} 

export default group;