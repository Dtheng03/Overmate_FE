import { JwtPayload } from "@/types/jwt";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

function AuthGuard({ children }: { children: React.ReactElement }) {
    const token = localStorage.getItem("token") || "";
    const pathname = useLocation().pathname;

    // neu co token thi kiem tra ko thi thoi
    if (token) {
        const decoded: JwtPayload = jwtDecode(token);

        // Lấy thời gian hiện tại (tính bằng giây)
        const currentTime = Date.now() / 1000;

        // So sánh thời gian hết hạn với thời gian hiện tại
        if (decoded?.exp < currentTime) {
            localStorage.clear()
            return <Navigate to="/sign-in" replace={true} />;
        }
    }

    if (token && (pathname == "/sign-in" || pathname == "/sign-up" || pathname.includes('/be-partner'))) {
        return <Navigate to="/" replace={true} />
    } else if (!token && (pathname == "/profile")) {
        return <Navigate to="/" replace={true} />
    } else {
        return children
    }
}

export default AuthGuard;