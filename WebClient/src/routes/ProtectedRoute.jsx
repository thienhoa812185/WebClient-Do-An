import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem("role") !== null ? localStorage.getItem("role") : "No"
    const token = localStorage.getItem("accessToken")


    const isAllowed = allowedRoles.includes(role);
    const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true} />

    return accessibleRoute;
}

export default ProtectedRoute;