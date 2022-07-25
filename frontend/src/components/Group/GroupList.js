import React, { useEffect, useState } from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie } from 'utils/Cookie';

const GroupList = () => {
    const [group, setGroup] = useState([]);

    useEffect(()=>{
        AxiosAPI.get('/groups/', {
            Authorization: `JWT ${getCookie('access-token')}`
        }).then((res)=>{
            
            setGroup(JSON.stringify(res.data));
            console.log(group);
        })
    });

    return (
        <div>

        </div>
    );
};

export default GroupList;
