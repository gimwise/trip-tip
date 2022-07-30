import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { makeGroup } from 'store/group';

const MakeGroup = () => {
    const [groupName, setGroupName] = useState("");
    const dispatch = useDispatch();    


    const handleOnClick = (e) => {
        e.preventDefault();

        const req = {
            group_name : groupName,
        }
        dispatch(makeGroup(req)).then(res => {
            console.log(res);
        })
    }

    return (
        <form onSubmit={handleOnClick}>
            <input
                className='group-name-input'
                name = 'group-name'
                value = {groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder='그룹 명을 입력하세요.'
                required
            />
            <input
                className='submit-btn'
                type="submit"
                value="생성"
            />
        </form>
    );
};

export default MakeGroup;