import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGroupById } from 'store/group';

const GroupInfoPage = () => {
    const group_id = useParams().group_id;
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(group_id);
        dispatch(getGroupById(group_id)).then(res => console.log(res));
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default GroupInfoPage;