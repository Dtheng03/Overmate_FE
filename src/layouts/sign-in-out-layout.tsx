import React from "react";
import Header from "@/components/layouts/Header";

function SignInOutLayout({ children }: { children: React.ReactElement }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default SignInOutLayout;