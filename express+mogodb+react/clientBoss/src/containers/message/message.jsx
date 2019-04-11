import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List,Icon, NavBar,SearchBar,  SegmentedControl, Button,WingBlank } from 'antd-mobile'
const Item=List.Item
const Brief=Item.Brief
class Message extends Component {
    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
      }
      onValueChange = (value) => {
        console.log(value);
      }
  render() {
    let chatDate=new Date()
    return (
      <div id='chat-page'>

       <List className="my-list"  style={{ position:'fixed', marginTop:'1.5rem',width:'10rem',zIndex:400}}>
        <Item   style={{height:'1.8rem'}} extra={ <Button inline size="small" style={{ width: '2rem' }}>极速处理</Button>}>联系人</Item>
      </List>
     
      <List style={{zIndex:'100',marginBottom:'1.6rem'}}>
         <Item></Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item> <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item> <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
         用户名 &nbsp;&nbsp;查看了 <Brief>消息</Brief>
        </Item>
        {/* <SearchBar placeholder="通过姓名或者公司名搜索" maxLength={8} /> */}
      </List>
      
      </div>
    )
  }
}
export default connect(
    state =>({}),
    {}
)(Message)