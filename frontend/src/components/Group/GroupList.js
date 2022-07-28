import React, { useEffect, useState } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie } from 'utils/Cookie';
import Group from './Group';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroups } from 'store/group';

const GroupList = () => {
    const dispatch = useDispatch();

    const [list, setList] = useState([]);

    useEffect(()=>{
        dispatch(getAllGroups()).then(res=>{
            console.log(res);
        })
    }, []);

    

    return (
        <div>
            {list.map((v, i)=> <Group key={i} name={v.group_name} code={v.code} leader={v.leader_nick} member={v.member} />)}
        </div>
    );
};

export default GroupList;
