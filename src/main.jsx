import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './pages/landingPage/LandingPage.jsx'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { firebaseApi } from './store/api/firebaseApi'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApiProvider api={firebaseApi}>
        <Provider store={store}>
            <LandingPage />
        </Provider>
    </ApiProvider>
)
