import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";

// middleware
import AuthGuard from "./authGuard";
import CheckRole from "./checkRole";

// layout
import MainLayout from "../layouts/main-layout";
import SignInOutLayout from "@/layouts/sign-in-out-layout";
import PartnerLayout from "@/layouts/partner-layout";
import DashboardLayout from "@/layouts/dashboard-layout";

// home page
import HomePage from "../pages/home-page/home-page";
import AboutUsPage from "@/pages/home-page/about-us-page";
import AboutTestPage from "@/pages/home-page/about-test-page";
import MbtiTest from "@/pages/home-page/mbti-test";
import ProfilePage from "@/pages/user/profile-page";
import ServicePage from "@/pages/home-page/service-page";
import ServiceDetails from "@/pages/home-page/service-details";

// be partner page
import BePartner from "@/pages/be-partner-page/be-partner";
import SignUpPartner from "@/pages/be-partner-page/sign-up-partner";

// partner page
import Welcome from "@/pages/partner/welcome";
import SignUpService from "@/pages/partner/sign-up-service";
import MyServices from "@/pages/partner/my-services";

// admin page
import WelcomeAdmin from "@/pages/admin/welcome-admin";
import DashboardStats from "@/pages/admin/dashboard-stats";
import DashboardUsers from "@/pages/admin/dashboard-users";
import DashboardServices from "@/pages/admin/dashboard-services";

// auth page
import SignInPage from "@/pages/auth/sign-in-page";
import SignUpPage from "@/pages/auth/sign-up-page";

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <AuthGuard>
                <CheckRole>
                    <MainLayout />
                </CheckRole>
            </AuthGuard>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/about-us",
                element: <AboutUsPage />
            },
            {
                path: "/about-test",
                element: <AboutTestPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/mbti-test",
                element: <MbtiTest />
            },
            {
                path: "/service/:categoryId",
                element: <ServicePage />
            },
            {
                path: "/service/details/:serviceId",
                element: <ServiceDetails />
            },
        ],
    },
    {
        path: "/partner",
        element:
            <AuthGuard>
                <CheckRole>
                    <PartnerLayout />
                </CheckRole>
            </AuthGuard>,
        children: [
            {
                index: true,
                element: <Welcome />
            },
            {
                path: "sign-up-service",
                element: <SignUpService />
            },
            {
                path: "my-services",
                element: <MyServices />
            }
        ],
    },
    {
        path: "/be-partner",
        element:
            <AuthGuard>
                <MainLayout />
            </AuthGuard>,
        children: [
            {
                index: true,
                element: <BePartner />
            },
            {
                path: "sign-up",
                element: <SignUpPartner />
            },
        ],
    },
    {
        path: "/admin",
        element:
            <AuthGuard>
                <CheckRole>
                    <DashboardLayout />
                </CheckRole>
            </AuthGuard>,
        children: [
            {
                index: true,
                element: <WelcomeAdmin />
            },
            {
                path: "dashboard",
                element: <DashboardStats />
            },
            {
                path: "users",
                element: <DashboardUsers />
            },
            {
                path: "services",
                element: <DashboardServices />
            },
        ],
    },
    {
        path: "/sign-in",
        element:
            <AuthGuard>
                <SignInOutLayout>
                    <SignInPage />
                </SignInOutLayout>
            </AuthGuard>
    },
    {
        path: "/sign-up",
        element:
            <AuthGuard>
                <SignInOutLayout>
                    <SignUpPage />
                </SignInOutLayout>
            </AuthGuard>
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;