import {deleteAllCookie} from "../../helpers/cookie";
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setReload} from "../../actions/setReload";

function Logout () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    deleteAllCookie();
    useEffect(() => {
        navigate("/");
        dispatch(setReload())
    }, []);

    return (
        <></>
    )
}

export default Logout;