import { useSelector } from 'react-redux';

const useAuthStore = () => {
    const authStore = useSelector(store => store.auth);
    
    const handleAuthOnClick = (e) => {
        console.log(authStore);
    } 

    return{
        authStore,
        handleAuthOnClick,
    };
};

export default useAuthStore;