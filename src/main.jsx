import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { firebaseApi } from './store/api/firebaseApi'
import Router from './routes/Router.jsx'
import { NextUIProvider } from "@nextui-org/react";
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApiProvider api={firebaseApi}>
        <Provider store={store}>
            <NextUIProvider>
                <Router />
            </NextUIProvider>
        </Provider>
    </ApiProvider>
)
