import React from "react"
import Preloader from "../components/commons/Preloader/Preloader";

export const withSuspense=(Component) => {
    return (props) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props} />
        </React.Suspense>
    };
}
