import React, {Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import styles from './styles'

class HomeAd extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin
            .shouldComponentUpdate
            .bind(this)
    }
    render() {
        return (
            <div id={styles.homeAd}>
                <h2>超值特惠</h2>
                <div className={`${styles.adContainer} clear-fix`}>
                    {this
                        .props
                        .data
                        .map((item, index) => {
                            return (
                                <div className={`${styles.adItem} float-left`} key={index}>
                                    <a href={item.link} target="_blank">
                                        <img src={item.img} alt={item.title}/>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default HomeAd