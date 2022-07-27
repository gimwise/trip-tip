import React, {useEffect, useState} from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie } from 'utils/Cookie';

const Group = ({name, code, leader, member}) => {

    return (
        <div>
            {name}
            {code}
            {leader}
            {}
        </div>
    );
};

export default Group;