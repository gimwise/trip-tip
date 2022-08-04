import { useSelector } from 'react-redux';

const useGroupStore = () => {

    const groupStore = useSelector(store => store.group);

    const handleGroupOnClick = (e) => {
        console.log(groupStore);
    }
    return {
        groupStore,
        handleGroupOnClick
    };
};

export default useGroupStore;