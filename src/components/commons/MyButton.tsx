import React from "react";
import { Button } from "../ui/button";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string
    title: string;
    icon?: React.ReactElement
    htmlType?: string
}

function MyButton({ title, classname, icon, ...props }: MyButtonProps) {
    return (
        <Button
            className={`flex gap-x-2 bg-color2 hover:bg-color3 ${classname}`}
            {...props}
        >
            {icon}
            {title}
        </Button>
    );
}

export default MyButton;