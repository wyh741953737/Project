// import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List,
  Icon, 
  NavBar,
  SearchBar,  
  SegmentedControl, 
  Button,
  WingBlank, 
  Badge,
Carousel,
} from 'antd-mobile'
import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import MessageChat from '../../components/messageChat/messageChat'
import MessageHuDong from '../../components/messageChat/hudong'
import './index.css'
const Item=List.Item
const Brief=Item.Brief
function getLastMsgs(chatMsgs,userid) {
      const lastMsgObjs={}//对象容器，是所有的聊天组的最后消息，lastMsgObjs[chatId]可以找出其中某一组对话双方。
      chatMsgs.forEach((msg) => { //两种情况，有，还没有，
        if(msg.to===userid && !msg.read){ //如果消息是发给我的，并且消息未读，把msg的unreadcount赋值1，发给我的有可能是不同用户发的，根据targetid分类
          msg.unReadCount=1
        }else{
          msg.unReadCount=0
        }
        const chatId=msg.chat_id //找出msg聊天的标志  chat_id是from-to 或者to-from组成。识别对话的双方。
        let lastMsg=lastMsgObjs[chatId]  //找出 所有的对话组的最后一条消息  的其中某一组对话双方的最后消息内容。

    if(!lastMsg){ //如果没有，当前，msg就是所在组的lastmsg
          lastMsgObjs[chatId]=msg      
    } else{
      //累加unReadCount=已经统计+后来发来的msg。如果有对话内容，
    /**
    *比如，在我和曦曦对话的时候，假设前面的都读了。曦曦发给我a。我没读。a是最后一条没有读·的msg，也就是lastmsg。
    *过了一会，曦曦又发了一条新msg ，为b。此时，未读的消息成了a+b。再过一会，曦曦又发了c，c是msg，b就变成了lastmsg。这个时候未读消息变成3.c是最后未读
    */
          const unReadCount=lastMsg.unReadCount + msg.unReadCount  //最后一条消息未读，加之前未读的
          if(msg.create_time > lastMsg.create_time) { 
            lastMsgObjs[chatId]=msg//如果msg比lastMsg晚，就将msg保存为当前对话双方的最后消息内容。lastMsg
          }
          //将unReadMsg保存在最新1的lastmsg上
          lastMsgObjs[chatId].unReadCount=unReadCount//更新当前对话双方的消息的未读数量为最后统计的数量
     }
      })
      //得到所有lastMsg数组
      const lastMsgs=Object.values(lastMsgObjs)//返回 所有的对话组的最后一条消息 
      lastMsgs.sort(function (m1,m2) { //如果·结果<0,将m1放前面
      return m2.create_time-m1.create_time//降序排列，时间更晚的排在前面。
      })
      return lastMsgs //返回排好序的 所有的对话组的最后一条消息 
     
}
class Message extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'queue-demo',
  };

  constructor(props) {
    super(props);
    this.openIndex = null;
    this.position = {};
    this.state = {
      msgList:[],
      animation: [],
      style: [],
        selectedIndex:0,
        color:'#fff'
      
    };
  }

  onDelete = (e) => {
    console.log(e)
    const { user } =this.props
    const { users,chatMsgs } =this.props.chat
 
    let lastMsgs=getLastMsgs(chatMsgs,user._id)//所有的对话组的最后一条消息
    let dataArray = lastMsgs;
    this.setState({
      msgList:dataArray
    })
    console.log(this.state,'dddd')
    const deleteData = dataArray.filter(item => item.key === this.openIndex)[0];
    const i = dataArray.indexOf(deleteData);
    dataArray.splice(i, 1);
    delete this.state.style[this.openIndex];
    this.openIndex = null;
  };
  onChange = (e) => {
    let selected=e.nativeEvent.selectedSegmentIndex
    this.setState({
      selectedIndex:selected
    })
  }
 
  render() {
    const {selectedIndex}=this.state
    return (<div>
      <NavBar >
<SegmentedControl
            values={['聊天', '互动']}
            tintColor={'#bee9e6'}
            style={{ height: '.8rem', width: '3.5rem',zIndex:'1000',marginTop:'.2rem',position:'fixed'}}
          onChange={this.onChange}
        />
</NavBar>
{selectedIndex===0?<MessageChat history ={this.props.history}/>
:<MessageHuDong/>}

    </div>);
  }
}
export default connect(
    state =>({user:state.user,chat:state.chat}),
    {}
)(Message)