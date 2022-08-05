import React from 'react';
import GroupList from 'components/Group/GroupList';
import { GroupListContainer } from 'styles/PageStyle';

const GroupListPage = () => {
    return (
        <GroupListContainer>
            <h2>활동 내역</h2>
            <div className='line'></div>
            <GroupList/>
        </GroupListContainer>
    );
};

export default GroupListPage;