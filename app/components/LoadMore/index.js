import React, {Component} from 'react'
import PureMixinRender from 'react-addons-pure-render-mixin'
import styles from './styles'

class LoadMore extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureMixinRender.shouldComponentUpdate
    }
    handleClick() {
        this
            .props
            .loadMoreFunc()
    }
    componentDidMount() {
        let timeID;
        let wrapper = this.refs.wrapper
        let callback = () => {
            const top = wrapper
                .getBoundingClientRect()
                .top
            const windowHEight = window.screen.height
            if (top && top < windowHEight) {
                this.handleClick()
            }
        }
        window.addEventListener('scroll', () => {
            if (this.props.loadding) {
                return
            }
            if (timeID) {
                clearTimeout(timeID)
            }
            timeID = setTimeout(callback, 50)

        }, false)
    }
    componentWillUmount() {
        window.removeEventListener('scroll', () => {})
    }
    render() {
        return (
            <div className={styles.loadMore} ref="wrapper">
                {this.props.loadding
                    ? <div>加载中...</div>
                    : <div
                        onClick
                        ={this
                        .handleClick
                        .bind(this)}>加载更多</div>
                }

            </div>
        )
    }
}

export default LoadMore