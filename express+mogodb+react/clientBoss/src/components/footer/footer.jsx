import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
// import  '../../assets/css/index.css'

const Item=TabBar.Item

class Footer extends Component {
   static propTypes={
      navList:PropTypes.array.isRequired 
   } 
  render() {
      let {navList } =this.props
      //过滤掉hide为true的
     navList=navList.filter(nav => !nav.hide)
      //在非路由组件中使用路由库中api，withroute()
      const path=this.props.location.pathname
    return (
        
        <TabBar >
            {
                navList.map((nav) => (
                <Item key={nav.path}
                   title={nav.text}
                   
                 //  icon={{url:require(`./images/${nav.icon}.png`)}}
                  // selectedIcon={{url:require(`./images/${nav.icon}-selected.png`)}}
                   selected={path===nav.path}
                   onPress={() => this.props.history.replace(nav.path)}
                   icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                  />}

                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                  />
                  }
                />
                ))
            }
        </TabBar>
    )
  }
}
export default withRouter(Footer) 
//向外暴露with Router（）包装产生的组件，内部会向组件传入一些·路由组件特有的属性，history，location，math