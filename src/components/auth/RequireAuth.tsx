import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const RequireAuth: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
    const { isLoggedIn, role } = useSelector((state: any) => state.auth)

    return isLoggedIn && allowedRoles.find((myRole: string) => myRole == role) ? (
        <Outlet />
    ) : isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to="/login" />)
}

export default RequireAuth
