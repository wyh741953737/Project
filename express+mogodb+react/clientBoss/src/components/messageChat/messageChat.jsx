// import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List,Button, Badge } from 'antd-mobile'
import React, { Component } from 'react'
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
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
function formatDate(createTime, auto = true) {
  let date = (createTime + '').length === 10 ? new Date(parseInt(createTime) * 1000) : new Date(parseInt(createTime));
             var y = date.getFullYear();
              var m = date.getMonth() + 1;
              m = m < 10 ? ('0' + m) : m;
              var d = date.getDate();
              d = d < 10 ? ('0' + d) : d;
              var h = date.getHours();
              h = h < 10 ? ('0' + h) : h;
              var minute = date.getMinutes();
              var second = date.getSeconds();
              minute = minute < 10 ? ('0' + minute) : minute;
              second = second < 10 ? ('0' + second) : second;
              let formatTime = '';
  let distinctTime = new Date().getTime() - date.getTime();
  if (auto) {
     if (distinctTime <= (24 * 3600 * 1000)) {
          formatTime =h+':'+m
      } else if (distinctTime <= (1 * 24 * 3600 * 1000)) {
        formatTime='昨天'
      } else if(distinctTime <= (7 * 24 * 3600 * 1000)){
        var week;
        if(date.getDay() == 0) week = "星期日"
        if(date.getDay() == 1) week = "星期一"
        if(date.getDay() == 2) week = "星期二"
        if(date.getDay() == 3) week = "星期三"
        if(date.getDay() == 4) week = "星期四"
        if(date.getDay() == 5) week = "星期五"
        if(date.getDay() == 6) week = "星期六"
        return week;
      }else{
        formatTime= y + '-' + m + '-' + d ;

      }
  }
  return formatTime;
}
class MessageChat extends Component {
  
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
    };
  }

  componentDidMount() {
  
    if (window.addEventListener) {
      window.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('mouseup', this.onTouchEnd);
    } else {
      window.attachEvent('ontouchend', this.onTouchEnd);
      window.attachEvent('onmouseup', this.onTouchEnd);
    }
  }

  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('mouseup', this.onTouchEnd);
    } else {
      window.detachEvent('onresize', this.onTouchEnd);
      window.detachEvent('onmouseup', this.onTouchEnd);
    }
  }

  onDelete = (e) => {
    const { user } =this.props
    const { users,chatMsgs } =this.props.chat
 
    let lastMsgs=getLastMsgs(chatMsgs,user._id)//所有的对话组的最后一条消息
    let dataArray = lastMsgs;
    this.setState({
      msgList:dataArray
    })
    const deleteData = dataArray.filter(item => item.key === this.openIndex)[0];
    const i = dataArray.indexOf(deleteData);
    dataArray.splice(i, 1);
    delete this.state.style[this.openIndex];
    this.openIndex = null;
  };

  onTouchStart = (e, i) => {
    if (this.openIndex || this.openIndex === 0) {
      const animation = this.state.animation;
      animation[this.openIndex] = { x: 0, ease: 'easeOutBack' };
      this.setState({ animation }, () => {
        delete this.state.style[this.openIndex];
      });
      this.openIndex = null;
      return;
    }
    this.index = i;
    this.mouseXY = {
      startX: e.touches === undefined ? e.clientX : e.touches[0].clientX,
    };
  };

  onTouchEnd = () => {
    if (!this.mouseXY) {
      return;
    }
    const animation = this.state.animation;
    if (this.position[this.index] <= -60) {
      this.openIndex = this.index;
      animation[this.index] = { x: -60, ease: 'easeOutBack' };
    } else {
      animation[this.index] = { x: 0, ease: 'easeOutBack' };
    }

    delete this.mouseXY;
    delete this.position[this.index];
    this.index = null;
    this.setState({ animation });
  };

  onTouchMove = (e) => {
    if (!this.mouseXY) {
      return;
    }
    const currentX = e.touches === undefined ? e.clientX : e.touches[0].clientX;
    let x = currentX - this.mouseXY.startX;
    x = x > 10 ? 10 + (x - 10) * 0.2 : x;
    x = x < -60 ? -60 + (x + 60) * 0.2 : x;
    this.position[this.index] = x;
    const style = this.state.style;
    style[this.index] = { transform: `translateX(${x}px)` };
    const animation = [];
    this.setState({ style, animation });
  };

  render() {
    const { user } =this.props
    const { users,chatMsgs } =this.props.chat
    
    const lastMsgs=getLastMsgs(chatMsgs,user._id)//所有的对话组的最后一条消息
    const liChildren =lastMsgs.map((msg) => {
    const targetUserId= msg.to===user._id?msg.from : msg.to
    const targetUser= msg.to===user._id ? users[msg.from] : users[msg.to]
    const createTime=msg.create_time
    const realTime=formatDate(createTime)
  console.log('realTime',realTime)
      return (<li
        key={msg._id}
        onMouseMove={this.onTouchMove}
        onTouchMove={this.onTouchMove}   
      >
        <div className={`${this.props.className}-delete`}>
          <a onClick={(e) => { this.onDelete(e); }}>删除</a>
        </div>
        <TweenOne
         onClick={ () => this.props.history.push(`/chatDetail/${targetUserId}`)}
          className={`${this.props.className}-content`}
          onTouchStart={e => this.onTouchStart(e, msg._id)}
          onMouseDown={e => this.onTouchStart(e, msg._id)}
          onTouchEnd={this.onTouchEnd}
          onMouseUp={this.onTouchEnd}
          animation={this.state.animation[msg._id]}
          style={this.state.style[msg._id]}  
        >
         <List   >
           <Item style={{height:'1.6rem'}}
           thumb={<img style={{width:'.9rem',height:'.9rem'}}  src={targetUser.header?require(`../../assets/images/${targetUser.header}.png`):null}></img>}
            extra={<div className='show-time'>
              <div className='show-time-wrap' >{realTime}</div>
              <Badge text={msg.unReadCount}/>
            </div>}
           >
        {users[msg.to===user._id?msg.from:msg.to].username} &nbsp;&nbsp; <Brief>{msg.content}</Brief>
 
           </Item>
         </List>
        </TweenOne>
      </li>);
    });
    return (<div>
      <List><Item     
         style={{marginTop:'-1.5rem',width:'10rem',position:'fixed',zIndex:'1000',height:'1.5rem'}}
          extra={<Button style={{width:'2rem',marginLeft:'1rem'}} size='small'>极速处理</Button>}
          onClick={() => {}}
        >联系人 </Item>
   </List>
      <div className={`${this.props.className}-wrapper`}>
        <div className={this.props.className}>       
          <QueueAnim
            component="ul"
            animConfig={[
              { opacity: [1, 0], translateY: [0, 30] },
              { height: 0 },
            ]}
            ease={['easeOutQuart', 'easeInOutQuart']}
            duration={[550, 450]}
            interval={150}
          >
            {liChildren}
          </QueueAnim>
        </div>
      </div>
    </div>);
  }
}
export default connect(
    state =>({user:state.user,chat:state.chat}),
    {}
)(MessageChat)