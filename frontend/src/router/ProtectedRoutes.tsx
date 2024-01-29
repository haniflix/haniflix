import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/reducers/auth";

const ProtectedRoutes = () => {
    const user = useAppSelector(selectUser);


    return (
        user ?
            <Outlet />
            : <Navigate to="/login" />
    )
}

export default ProtectedRoutes