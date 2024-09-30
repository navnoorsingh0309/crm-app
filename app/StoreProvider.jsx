'use client';

import { Provider } from "react-redux";
import reduxStore from "@/lib/store";

export function StoreProvider({ children })
{
    return (
        <Provider store={ reduxStore }>
            {children}
        </Provider>
    )
}