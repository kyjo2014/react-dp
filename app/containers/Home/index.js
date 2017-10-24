import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connecct} from 'react-redux'

import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subPage/ad'
import List from './subPage/List'

class Home extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate
    }
    render() {
        return (
            <div>
                <HomeHeader
                    cityName={this.props.cityName}
                    onSearchClick={() => {}}
                    onCitySelectClick={() => {}}/>
                <Category/>
                <div
                    style={{
                    height: '15px',
                    background: '#eee'
                    }}>{}
                </div>
                <Ad />
                <List cityName={this.props.cityName}/>
                <div
                style = {{
                        height: '20px',
                        background: '#eee'
                    }}>{} </div>
            </div>
            )
        }
}
const mapStateMapProps = state => ({
        cityName: state.userInfo.cityName
    })
    export default connecct(mapStateMapProps)(Home)