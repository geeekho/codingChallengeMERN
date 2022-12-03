import { useSelector } from '../redux/store';


// ----------------------------------------------------------------------

const useEmployee = () => {

    const userEmployee = useSelector(
        (state) => state.employees
    )
    return userEmployee;
};

export default useEmployee;