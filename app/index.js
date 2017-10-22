import React from 'react'
import {render} from 'react-dom'

import App from './App'
require('font-awesome-webpack')
console.log(App)
render(
    <App/>,
    document.getElementById('root')
)