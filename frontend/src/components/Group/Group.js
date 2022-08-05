import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import group_img from 'assets/image/group_temp.jpg';

const Group = ({id, name, code, leader, member}) => {
    const makeParams = () => {
        return `/group/${id}`;
    }
    return (
        <div className='group'>
            <div className='img-wrapper'>
                <img src={group_img}/>
            </div>
            <div className='content'>
                <p>{name}</p>
                <NavLink to={makeParams()}>더보기</NavLink>
            </div>

        </div>
    );
};

export default Group;
