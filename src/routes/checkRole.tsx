import { Navigate, useLocation } from "react-router-dom";

function CheckRole({ children }: { children: React.ReactElement }) {
    const role = localStorage.getItem("role");
    const pathname = useLocation().pathname;

    if (role?.includes("ServiceOwner") && !pathname.includes('/partner')) {
        return <Navigate to="/partner" replace={true} />
    } else if (!role?.includes("ServiceOwner") && pathname.includes('/partner')) {
        return <Navigate to="/" replace={true} />
    } else {
        return children
    }
}

export default CheckRole;