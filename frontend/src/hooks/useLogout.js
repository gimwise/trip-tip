import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie, removeCookie } from "utils/Cookie";
import { logout } from "store/auth";


const useLogout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogOutOnClick = () => {

        const body = {
            refresh : getCookie('refresh-token')
        }

        dispatch(logout(body)).then(res => {
            console.log("🟢 LOGOUT SUCCESS");
            removeCookie("refresh-token");
            removeCookie("access-token");
            navigate("/");
        }).catch(err=>{
            console.log("🔴 LOGINOUT FAILURE");
        })
    }
    return LogOutOnClick;
};

export default useLogout;