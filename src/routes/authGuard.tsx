import { Navigate, useLocation } from "react-router-dom";

function AuthGuard({ children }: { children: React.ReactElement }) {
    const token = localStorage.getItem("token");
    const pathname = useLocation().pathname;

    if (token && (pathname == "/sign-in" || pathname == "/sign-up" || pathname.includes('/be-partner'))) {
        return <Navigate to="/" replace={true} />
    } else if (!token && (pathname == "/profile")) {
        return <Navigate to="/" replace={true} />
    } else {
        return children
    }
}

export default AuthGuard;