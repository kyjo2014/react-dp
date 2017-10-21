import React from 'react'
import {Provider} from 'react-redux'
import storeConfigure from './store/storeConfig'
import './style/App.less'

import App from './router/routerMap'

export default () => (
    <Provider store={storeConfigure()}>
        <App />
    </Provider>
)