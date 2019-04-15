import React, { Component } from 'react'
import {NavBar,

  Icon,
  List,
  Button,
  Tag
} from 'antd-mobile'

import {connect } from 'react-redux'
import {getUserList} from '../../redux/actions'
import './index.css'
const Item=List.Item
const Brief = Item.Brief;
class EmployeeDetail extends Component {
   
  render() {
    const {user,userList}=this.props
    const targetId=this.props.match.params.userid

    const useritem=userList.map(item =>{
     if(item._id===targetId){
       return <div key={item._id}>
           <NavBar
            mode="light"
            icon={<Icon type="left" />}
            style={{position:'fixed',zIndex:'1000',width:'10rem',marginTop:'-1rem'}}
            onLeftClick={() => this.props.history.goBack()}
            rightContent={[
                <img key="0" alt='' src={require('../../assets/images/selecter.png')} style={{ marginRight: '16px',width:'.5rem',height:'.5rem' }} />,
                <img key="1" alt='' src={require('../../assets/images/warn.png')} style={{ marginRight: '16px',width:'.5rem',height:'.5rem' }} />,
                <img key="2" alt='' src={require('../../assets/images/share.png')} style={{ width:'.5rem',height:'.5rem' }} />,
      ]}
 />
 
    <div className='info-container'>
          
      <List>
        <Item multipleLine style={{height:'3rem'}} >
         {item.post}
         <Brief>
            <div className='info-detail-header'>
 <div className='detail-header-img'><img alt=''  style={{width:'.45rem',height:'.45rem',margin:'.2rem'}}  src={require('../../assets/images/address.png')}></img>{item.city.slice(0,1)}</div>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}} src={require('../../assets/images/experience.png')}></img>{item.experiences}</div>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}} src={require('../../assets/images/degree.png')}></img>{item.degrees}</div>
            </div>
         </Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          thumb={<img alt='' style={{width:'1.2rem',height:'1.2rem'}} src={require(`../../assets/images/${item.header}.png`)}/>}
        >{item.username}<Brief>期望工资:&nbsp;<span className='font-color'>{item.salarysValue}</span></Brief>
        </Item>
        <Item>
            <div className='post-describe'>个人信息</div>
            <div className='post-describe-content'>{item.info}</div>
        </Item>
        <Item ><span className='post-describe'>我的技能</span>
            <Brief>
               <div className='post-describe-skill'>
                 {item.skills.split('，').map((skill,index) =>(
                  <Tag key={index} style={{margin:'.15rem'}} >{skill}</Tag>
                 ))}
               </div>
            </Brief>
        </Item>
      </List>
      <div className='detail-chat-button-wrap'>
      <Button className='detail-chat-button' type="primary"  onClick={() => this.props.history.push(`/chatDetail/${targetId}`)}>立即沟通</Button>
      </div>
    </div>
       </div>
     }
    }) 
    return (
        <div className='info-page'>
         {useritem}
      </div>
    )
  }
}
export default connect(
  state=> ({user:state.user,userList:state.userList}),
  {getUserList}
)(EmployeeDetail)