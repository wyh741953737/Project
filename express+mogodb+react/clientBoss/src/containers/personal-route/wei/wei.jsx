import React, { Component } from 'react'
import {NavBar,
  Icon,
  List,

  Button,
  
  Tag
} from 'antd-mobile'
// import QueueAnim from 'rc-queue-anim'
import {connect } from 'react-redux'
// import {getUserList} from '../../../redux/actions'

const Item=List.Item
const Brief = Item.Brief;
class Wei extends Component {
   
  render() {
    const {user}=this.props
  
    return (
    <div className='info-page'>
         <NavBar
            mode="light"
            icon={<Icon type="left" />}
            style={{position:'fixed',zIndex:'1000',width:'10rem',marginTop:'-1rem'}}
            onLeftClick={() => this.props.history.goBack()}
            rightContent={[
                <img key="0" alt=''  src={require('../../../assets/images/selecter.png')} style={{ marginRight: '16px',width:'.5rem',height:'.5rem' }} />,
                <img key="1" alt='' src={require('../../../assets/images/warn.png')} style={{ marginRight: '16px',width:'.5rem',height:'.5rem' }} />,
                <img key="2" alt='' src={require('../../../assets/images/share.png')} style={{ width:'.5rem',height:'.5rem' }} />,
      ]}
 />
    <div className='info-container'>       
      <List>
        <Item multipleLine style={{height:'3rem'}} >
         {user.post}
         <Brief>
            <div className='info-detail-header'>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}}  src={require('../../../assets/images/address.png')}></img>{user.city.slice(0,1)}</div>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}} src={require('../../../assets/images/experience.png')}></img>{user.experiences}</div>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}} src={require('../../../assets/images/degree.png')}></img>{user.degrees}</div>
            </div>
         </Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          thumb={<img alt='' style={{width:'1.2rem',height:'1.2rem'}} src={require(`../../../assets/images/${user.header}.png`)}/>}
        >{user.username}<Brief>期望工资:&nbsp;<span className='font-color'>{user.salarysValue}</span></Brief>
        </Item>
        <Item>
            <div className='post-describe'>个人信息</div>
            <div className='post-describe-content'>{user.info}</div>
        </Item>
        <Item ><span className='post-describe'>我的技能</span>
            <Brief>
               <div className='post-describe-skill'>
                 {user.skills.split('，').map((skill,index) =>(
                  <Tag key={index} style={{margin:'.15rem'}} >{skill}</Tag>
                 ))}
               </div>
            </Brief>
        </Item>
      </List>
      <div className='detail-chat-button-wrap'>
      <Button className='detail-chat-button' type="primary">立即修改</Button>
      </div>
    </div>
       </div>    
    )
  }
}
export default connect(
  state=> ({user:state.user}),
  {}
)(Wei)
