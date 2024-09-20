import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import MainLayout from "../layouts/main-layout";
import HomePage from "../pages/home-page";
import AboutUsPage from "@/pages/about-us-page";
import AboutTestPage from "@/pages/about-test-page";
import AboutPartnersPage from "@/pages/about-partners-page";
import SignInOutLayout from "@/layouts/sign-in-out-layout";
import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import BePartnerPage from "@/pages/be-partner-page";
import SignUpPartnersPage from "@/pages/sign-up-partners-page";
import ChooseServicePage from "@/pages/choose-service-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
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
        path: "/be-partner",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <BePartnerPage />
            },
            {
                path: "sign-up",
                element: <SignUpPartnersPage />
            },
            {
                path: "choose-service",
                element: <ChooseServicePage />
            }
        ],
    },
    {
        path: "/sign-in",
        element:
            <SignInOutLayout>
                <SignInPage />
            </SignInOutLayout>
    },
    {
        path: "/sign-up",
        element:
            <SignInOutLayout>
                <SignUpPage />
            </SignInOutLayout>
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;