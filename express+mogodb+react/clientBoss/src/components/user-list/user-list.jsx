import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank,WhiteSpace,Card} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
const Header=Card.Header
const Body=Card.Body
class UserList extends Component {
     static propTypes={
         userList:PropTypes.array.isRequired
     }
  render() {
      const {userList }=this.props
      console.log(userList)
    return (
     <WingBlank  style={{marginTop:'1.5rem',marginBottom:'1.21rem'}}>
        {userList.map(user =>(
             <div key={user._id}>
             <WhiteSpace/>
             <Card onClick={() => this.props.history.push(`/chatDetail/${user._id}`)}>
                 <Header 
                  thumb={require(`../../assets/images/header3.png`)}
                  title={user.post}
                  extra={user.salarysValue}
                 />
                 <Body>
                     <div>{user.info}</div>
                     <div>
                         <div>{user.company?<div>公司：{user.company}</div>:null}</div>
                         <div>{user.username}</div>
                         <div>{user.type}</div>
                     </div>
                 </Body>
             </Card>
         </div>
        ))}
     </WingBlank>
    )
  }
}
export default withRouter(UserList)