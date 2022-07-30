import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Group = ({id, name, code, leader, member}) => {
    const makeParams = () => {
        return `/group/${id}`;
    }
    return (
        <GroupContent>
            <NavLink to={makeParams()}>{name}</NavLink>
            {code}
            {leader}
            {member}
        </GroupContent>
    );
};

export default Group;

const GroupContent = styled.div`

`;