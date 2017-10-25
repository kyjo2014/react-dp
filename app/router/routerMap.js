import React, {Component} from 'react'
import {BroswerRouter as Router, Route, Switch} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Home from '../containers/Home'
import User from '../containers/User'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import City from '../containers/City'
import NotFound from '../containers/404Page'

import localStore from '../until/localStore'
import {CITYNAME} from '../config/localStore.config'

import {connect} from 'react-redux'
import {updateUserInfo} from '../actions/userInfo.action'

class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
        this.state = {
            initialDone: false
        }
    }
    componentDidMount() {
        let cityName = ''
        cityName = localStore.getItem(CITYNAME)
        if (cityName == null) {
            cityName = '北京'
        }
        this
            .props
            .updateInfo({cityName})
        this.setState({initialDone: true})
    }
    render() {
        let Routes = (
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/user' component={User}/>
                <Route path='/search' component={Search}/>
                <Route path='/detail' component={Detail}/>
                <Route path='/city' component={City}/>
                <Route component={NotFound}/>
            </Switch>
        );
        return (
            <Router>
                <div>
}
                    {this.state.initialDone
                        ? Routes
                        : (
                            <div>加载中...</div>
                        )}
                </div>
            </Router>
        )
    }
}
const mapStateToProps = state =>({})

const mapDispatchToProps = dispatch => ({
    updateInfo: data =>dispatch(updateUserInfo(data))
})

const reduxApp = connect(mapStateToProps,mapDispatchToProps)(App)

export default reduxApp