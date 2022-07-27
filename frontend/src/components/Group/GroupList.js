import React, { useCallback, useEffect, useState } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie } from 'utils/Cookie';
import Group from './Group';

const GroupList = () => {
    const [list, setList] = useState([]);

    useEffect(()=>{
        AxiosAPI.get("/groups/",{
            Authorization: `JWT ${getCookie('access-token')}`
        }).then((res)=> {
            setList(res.data);
            // console.log(list);
            
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    

    return (
        <div>
            {console.log(list)}
            {list.map((v, i)=> <Group key={i} name={v.group_name} code={v.code} leader={v.leader_nick} member={v.member} />)}
        </div>
    );
};

export default GroupList;
