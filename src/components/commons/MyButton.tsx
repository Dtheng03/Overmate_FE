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
            className={`flex gap-x-2 bg-color1 hover:bg-color2 ${classname}`}
            {...props}
        >
            {icon}
            {title}
        </Button>
    );
}

export default MyButton;