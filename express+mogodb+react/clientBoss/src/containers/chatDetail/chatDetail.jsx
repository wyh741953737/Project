import React, { Component } from 'react'
import {NavBar,
  Flex,
  Icon,
  List,
  InputItem,
  Button,
  Grid
} from 'antd-mobile'
import {connect } from 'react-redux'
import {sendMsg } from '../../redux/actions'
import './index.css'
const Item=List.Item
class ChatDetail extends Component {
  state={
 content:'',
 isShow:false
  }
  componentWillMount(){
    const emojis=['😊','😍','🔥','😂 ','🤔','👍','❤️','😛','😰',
    '🤐','😏','🧐','😣','😈','💀','💩','👌','👻','🙏','💪','👧','🙍','💄','👜','☂️']
    this.emojis=emojis.map(emoji => ({text:emoji}))
  }
  componentDidUpdate(){
    window.scrollTo(0,document.body.scrollHeight)//一进去的时候显示底部
  }
  handleSend=()=>{
    const from =this.props.user._id
    const to = this.props.match.params.userid
    const content=this.state.content.trim()
    //发送数据
    if(content){
      this.props.sendMsg({from,to,content})
    }
    this.setState({
      content:'',
      isShow:false
    })
  }
  toggleShow=()=>{
    const isShow=!this.state.isShow
    this.setState({isShow})
    //异步手动派发resize事件，解决列表显示缺陷
    if(isShow){
      setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))},0)
    }
  }
  render() {
    const {user}=this.props
    const { users,chatMsgs}=this.props.chat
    console.log('dd',this.props)//里面有user是我自己的信息
    console.log('users',users)//所有用户（包括牛人，老板）的信息。当前用户身份牛人。显示老板列表，users应该为boss类型的列表
    //只需要显示一个人的对话,计算当前聊天chatId
    const meId=user._id//获取我自己的id
    if(!users[meId]){ //如果还没有获取数据，不做什么
      return null
    }
    const targetId=this.props.match.params.userid
    const chatId=[meId,targetId].sort().join('_')
    //得到目标对象头像
    const targetHeader=users[targetId].header
    const targetIcon=require(`../../assets/images/${targetHeader}.png`)
    const meHeader=this.props.user.header
    const meIcon=require(`../../assets/images/${meHeader}.png`)
    //chatMsgs只包含了所有人发给我，没有我发给别人的，哪里出问题了，过滤掉后，只剩当前对象发给我的信息，
    const msgs=chatMsgs.filter(msg => msg.chat_id===chatId)
    console.log('过滤后的msgs',msgs)
    
    return (
        <div className='chat-page'>
     <List className='stick'>
                 <Item>
                 <NavBar
                  style={{height:'1.2rem'}}
                 mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => this.props.history.goBack()}
                rightContent={[
                    <Icon key="0" type="ellipsis" />,
                ]}
              >{user.username}</NavBar>
                 </Item>
          <Flex style={{backgroundColor:'#fff',opacity:'.6'}}>
            <Flex.Item><div className='personal'><img className='img-wrap' src={require('./images/phone.png')}/></div><div className=' describe'>电话号</div></Flex.Item>
            <Flex.Item><div className='personal'><img className='img-wrap' src={require('./images/wechart.png')}/></div><div className=' describe'>微信号</div></Flex.Item>
            <Flex.Item><div className='personal'><img className='img-wrap' src={require('./images/jianli.png')}/></div><div className=' describe'>发简历</div></Flex.Item>
            <Flex.Item><div className='personal'><Icon type="cross-circle"></Icon></div><div className=' describe'>不感兴趣</div></Flex.Item>
          </Flex>
       </List>     
        <div className='chat-to-from-wrap'>
        <List >
        {msgs.map(msg => {
          if(targetId===msg.from){//目标是对方
           return (
            <Item key={msg._id} >
              <div className='chat-wrap' key={msg._id}>      
              <div className='chat-header'><img className='img-wrap' src={targetIcon}/></div>
                <div className='chat-circle'></div>
               <div className='chat-message'>{msg.content}</div>
            </div>
         </Item>
           )
          }else{
            return(
            <Item key={msg._id}>
                <div className='chat-to-wrap'>
                    <div className='chat-message message-right'>{msg.content}</div>  
                    <div className='circle-right'></div> 
                    <div className='chat-header right-header'><img className='img-wrap' src={meIcon}/></div>                    
               </div>
            </Item> 
            )
          }
        })}
      </List>
        </div>
         <div className='am-tab-bar'>
         <InputItem
            className='input-item'
            placeholder="请输入"
            onFocus={ () => this.setState({ isShow:false})}
            style={{fontSize:'14px'}}
            value={this.state.content}
            onChange={val => this.setState({content:val})}
            extra={
              <div>
                <span onClick={this.toggleShow} style={{marginRight:'.1rem'}}>😊</span>
                <span onClick={this.handleSend}>发送</span>
         </div> } 
          ><Button size='small' >常用语</Button></InputItem>  
        {this.state.isShow?( <Grid  data={this.emojis}
                columnNum={5}
                carouselMaxRow={5}
                isCarousel={true}
                onClick={(item) =>{
                  this.setState({ content:this.state.content+item.text})
                }}/>):null }
          
         </div>
      </div>
    )
  }
}
export default connect(
  state=> ({user:state.user,chat:state.chat}),
  {sendMsg}
)(ChatDetail)