import { useSelector } from '../redux/store';


// ----------------------------------------------------------------------

const useAuth = () => {

    const userAuth = useSelector(
        (state) => state.auth
    )
    return userAuth;
};

export default useAuth;