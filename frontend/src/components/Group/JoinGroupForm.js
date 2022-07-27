import React, {useState} from 'react';
import AxiosAPI from 'apis/AxiosAPI';
import { getCookie } from 'utils/Cookie';
import { request } from 'apis/request';

const JoinGroupForm = () => {
    const [code, setCode] = useState("");

    const onSubmit = (e) => {

        e.preventDefault();
        
        console.log(code);

        const data = {
            "code" : code
        }

        AxiosAPI.post("/groups/join/", data
        , {
            Authorization: `JWT ${getCookie('access-token')}`
        }
        ).then(res=>{
            window.location.replace("http://localhost:3000/main");
        })
        .catch(err=> {
            console.log(err);
            alert("잘못된 코드입니다.");
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                className='input'
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder='코드를 여기에 입력하세요.'
            />
            <br/>
           <input type="submit" className='submit' value="참여"/>
        </form>
    );
};

export default JoinGroupForm;