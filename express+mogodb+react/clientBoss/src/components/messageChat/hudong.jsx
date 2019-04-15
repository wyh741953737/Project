import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Tabs, 
    WhiteSpace,
    Result,
  
    Button,
    } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky';
// import Boss from '../../containers/boss/boss'
import UserList from '../../components/user-list/user-list'
import {getUserList } from '../../redux/actions'
import './index.css'
// const Item=List.Item
// const Brief=Item.Brief
function renderTabBar(props) {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }
  const myImg = src => <img src={src} style={{width:'2.6rem',height:'2.5rem'}} alt="qq" />;

class MessageHuDong extends Component {
 state={
    tabs : [
        { title: '对我感兴趣' },
        { title: '看过我' },
        { title: '新信息' },
      ]      
 }
 componentDidMount(){
    //获取userlist
    this.props.getUserList('employee')
  }
  render() {
    const { user } =this.props

    const { users,chatMsgs } =this.props.chat
    const { tabs}=this.state
    
    return (
    <div className='max-wrap'>
     <StickyContainer >
      <Tabs tabs={tabs}
        initalPage={'t2'}
        renderTabBar={renderTabBar}
        swipeable={true}
        tabBarActiveTextColor='rgb(32, 32, 32)'
        tabBarInactiveTextColor='rgb(197, 194, 194)'
      >
        <div className='tabs-wrap'>
        <Result
              style={{marginTop:'4rem',height:'auto'}}
                img={myImg(require('../../assets/images/wanted.png'))}
                title={<div className='tabs-text'>还没有{user.type==='boss'?'牛人':'Boss'}对你感兴趣哦，快去主动联系吧！</div>}
                message={<Button onClick={() =>{this.props.history.push('/boss')}} style={{border:'1px solid #7adfe2'}} className='tabs-button' size='small'>找{user.type==='boss'?'牛人':'职位'}</Button>}
            />       
        </div>
        <div className='tabs-wrap'>
         <div style={{marginTop:'-1.5rem'}}>
         <UserList userList={this.props.userList} />
         <div>ss</div>
         </div>
        </div>
      </Tabs>
    </StickyContainer>
    <WhiteSpace />
    </div>);
  }
}
export default connect(
    state =>({user:state.user,chat:state.chat,userList:state.userList}),
    {getUserList}
)(MessageHuDong)
