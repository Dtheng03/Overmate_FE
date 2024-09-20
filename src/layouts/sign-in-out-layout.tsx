import React from "react";
import Header from "@/components/layouts/Header";

function SignInOutLayout({ children }: { children: React.ReactElement }) {
    return (
        <main className="relative">
            <Header />
            <div className="pt-[58px]">
                {children}
            </div>
        </main>
    );
}

export default SignInOutLayout;