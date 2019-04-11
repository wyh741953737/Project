import React, { Component } from 'react'
import {  List  } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// import { Switch,Route} from 'react-router-dom'

const Item=List.Item
class PersonalList extends Component {
   static propTypes={
      Lists:PropTypes.array.isRequired 
   } 
  render() {
      let {Lists } =this.props
      //过滤掉hide为true的
      //在非路由组件中使用路由库中api，withroute()
      
    return ( 
        <List >
            {
                Lists.map((nav,index) =>(
                    <Item
                    key={index}
                    thumb={<img src={nav.icon}></img>}
                    arrow="horizontal"
                    onClick={() => {
                      console.log(this)
                   //  this.props.history.push(`/${nav.path}/${user._id}`)}
                    }
                  }
                     >{nav.title}</Item>
                ))
      }
        </List>
    )
  }
}
export default withRouter(PersonalList) 
//向外暴露with Router（）包装产生的组件，内部会向组件传入一些·路由组件特有的属性，history，location，math