import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WhiteSpace,Card} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './index.css'
const Header=Card.Header
const Body=Card.Body
// const Item=List.Item
class UserList extends Component {
     static propTypes={
         userList:PropTypes.array.isRequired
     }
  render() {
      const {userList }=this.props
      console.log('userlist',userList)
    return (
     <div  style={{marginTop:'1.5rem',marginBottom:'1.21rem'}}>
        {userList.map(user =>(
             <div key={user._id}>
             <WhiteSpace size='sm'/>
             <Card onClick={() => user.type==='boss'?this.props.history.push(`/infoDetail/${user._id}`):this.props.history.push(`/employeeDetail/${user._id}`)} >
                 <Header 
                  thumb={<img alt='' style={{marginRight:'.3rem'}} src={require(`../../assets/images/${user.header}.png`)}></img>}
                  title={user.post}
                  extra={<span className='header-extra-wrap'>{user.type==='boss'?user.salarysValue:user.username}</span>}
                 />
                 <Body>
                     
                     <div>
                         <div className='user-info-text' >{user.company?<span >{user.company}</span>:<span>{user.name}</span>}</div>
                         <div className='user-info'><p className='user-info-text'>{user.info}</p></div>
                         
                         <div className='city-wrap'>{user.city.map((item,index)=>(
                                <span style={{padding:'.11rem'}} key={index}>{item}</span>
                                ))}
                         </div>
                         <div className='city-wrap'><span style={{padding:'.11rem'}}>{user.experiences}</span></div>
                         <div className='city-wrap'><span style={{padding:'.11rem'}}>{user.degrees}</span></div>
                         {/* <div style={{height:'.8rem',lineHeight:'1rem',color:'#7adfe2'}}>查看了您</div> */}
                     </div>
                 </Body> 
                     
             </Card>   
             </div>    
            ))}
     </div>
    )
  }
}
export default withRouter(UserList)