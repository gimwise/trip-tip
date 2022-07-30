import { request } from "apis/request";
import { getCookie } from "utils/Cookie";
import produce from "immer";
import axios from "axios";

const GETALLGROUPS = "GETALLGROUPS";
const MAKEGROUP = "MAKEGROUP";
const GETGROUPBYID = "GETGROUPBYID";

const DOMAIN = "http://localhost:8000/api";
const GROUPS_URL = "/groups/";

const author = {
    Authorization : `JWT ${getCookie('access-token')}`
}

export const getAllGroups = ()=>{
    const data = request("get", GROUPS_URL, "",author);

    return {
        type : GETALLGROUPS,
        payload : data,
    }
}

export const getGroupById = (req) => {
    const data = request("get", GROUPS_URL + req, "", author);

    return {
        type : GETGROUPBYID,
        payload : data,
    }
}

export const makeGroup = (req) => {
    const data = request("post", GROUPS_URL + "create/", req, author);

    return {
        type : MAKEGROUP,
        payload : data,
    }
}

const initialState = {
    groups : [],
}
const group = (state = initialState, action) => {
    return produce(state, (draft)=>{
        switch(action.type){
            case GETALLGROUPS :
                // console.log(action.payload.data);
                draft.groups = action.payload.data;
                break;
            case MAKEGROUP :
                // console.log(action);
                break;
            case GETGROUPBYID :
                break;
            default :
                break;
        }
    })
} 

export default group;