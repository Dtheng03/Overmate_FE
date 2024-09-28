import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";

// layout
import MainLayout from "../layouts/main-layout";
import SignInOutLayout from "@/layouts/sign-in-out-layout";

// home page
import HomePage from "../pages/home-page/home-page";
import AboutUsPage from "@/pages/home-page/about-us-page";
import AboutTestPage from "@/pages/home-page/about-test-page";
import AboutPartnersPage from "@/pages/home-page/about-partners-page";

// be partner page
import BePartner from "@/pages/be-partner-page/be-partner";
import SignUpPartner from "@/pages/be-partner-page/sign-up-partner";
import SignUpService from "@/pages/partner/sign-up-service";

import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import ProfilePage from "@/pages/profile-page";
import DashboardLayout from "@/layouts/dashboard-layout";
import DashboardStats from "@/pages/dashboard-stats";
import AuthGuard from "./authGuard";
import Welcome from "@/pages/partner/welcome";
import PartnerLayout from "@/layouts/partner-layout";
import CheckRole from "./checkRole";

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
                path: "/about-partners",
                element: <AboutPartnersPage />
            }
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
        path: "/profile",
        element:
            <AuthGuard>
                <MainLayout />
            </AuthGuard>,
        children: [
            {
                index: true,
                element: <ProfilePage />
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardStats />
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