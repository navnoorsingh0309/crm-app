import { ReactNode } from "react";

const MaxMainWidth = ({
    className,
    children,
}: {
    className?: string,
    children: ReactNode
}) => {
    return (
        <div className="mx-auto w-full max-w-screen-lg px-2.5 md:px-2.0 h-full">
            {children}
        </div>
    )
}

export default MaxMainWidth