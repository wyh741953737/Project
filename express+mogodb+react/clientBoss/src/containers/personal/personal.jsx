import React, { Component } from 'react'
import { Router,Switch,Route,Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { resetUser } from '../../redux/actions'
import Cookies from 'js-cookie'
import { List ,Modal,WhiteSpace,Flex, Button} from 'antd-mobile';
import Wei  from '../personal-route/wei/wei'
import FuJian from '../personal-route/fujian/fujian'
import GuanLi from '../personal-route/guanli/guanli'
import TiSheng from '../personal-route/tisheng/tisheng'
import TiWen from '../personal-route/tiwen/tiwem'
import GuanZhu from '../personal-route/guanzhu/guanzhu'
import YinSi from '../personal-route/yinsi/yinsi'
import BangZhu from '../personal-route/bangzhu/bangzhu'
import JingCha from '../personal-route/jingcha/jingcha'
import PersonalList from '../../components/personalList/personalList'
// import {jian}  from './jian.png'
import './index.css'
// import '../../assets/css/index.css'
const Item=List.Item
const Brief = Item.Brief;
 class Personal extends Component {
 state={
  bossLists:[
  {
    path:'guanli',
    component:GuanLi,
    title:'管理招聘要求',
    icon:'guanli',
  }, {
    path:'yinsi',
    component:YinSi,
    title:'隐私设置',
    icon:'yinsi',
  }
  ],
  Lists:[
    {
       path:'/wei',
      component:Wei,
      title:'我的微简历',
      icon:'../personal-route/wei/wei',
    },
    {
     path:'/fujian',
     component:FuJian,
     title:'附件简历',
     icon:'fujian',
   },
   {
     path:'/guanli',
     component:GuanLi,
     title:'管理求职意向',
     icon:'guanli',
   },
   {
     path:'/tisheng',
     component:TiSheng,
     title:'提升简历排名',
     icon:'tisheng',
   },
   {
    path:'/tiwen',
    component:TiWen,
    title:'牛人问答',
    icon:'tiwen',
  },
  {
    path:'/guanzhu',
    component:GuanZhu,
    title:'关注公司',
    icon:'guanzhu',
  },
  {
    path:'/yinsi',
    component:YinSi,
    title:'隐私设置',
    icon:'yinsi',
  },
  // {
  //   path:'/bangzhu',
  //   component:BangZhu,
  //   title:'帮助与反馈',
  //   icon:'bangzhu',
  // },{
  //   path:'/jingcha',
  //   component:JingCha,
  //   title:'首都网警',
  //   icon:'jingcha',
  // },
  ]

 }
  logout =() =>{
   Modal.alert('退出','确认登陆吗？',[
     {text:'取消'},
     {
       text:'确定',
       onPress:()=>{
         //干掉cookies中的userid，将redux中的user回到初始状态
         Cookies.remove('userid')
         this.props.resetUser()
       }
     }
   ])
  }
  render() {
    const {username,header,type}=this.props.user
    console.log(type)
    const {bossLists, Lists} =this.state
    const path=this.props.location.pathname
    const currentNav=Lists.find(nav => nav.path===path)
    return (
      <div  style={{marginTop:'1.5rem',marginBottom:'1.21rem'}}>
    <div>
       <List  >
        <Item  extra={<img src={require(`../../assets/images/${header}.png`)} style={{width:70,height:70}} />} multipleLine onClick={() => {}}>
          {username}
          <Brief  style={{fontSize:10}}>我的个人主页</Brief>
        </Item>
        </List>
    </div>    
<div className="flex-container">
    <Flex>
      <Flex.Item><div className='personal'>0</div><div className='personal describe'>沟通过</div></Flex.Item>
      <Flex.Item><div className='personal'>0</div><div className='personal describe'>面试</div></Flex.Item>
      <Flex.Item><div className='personal'>0</div><div className='personal describe'>已投递</div></Flex.Item>
      <Flex.Item><div className='personal'>0</div><div className='personal describe'>感兴趣</div></Flex.Item>
    </Flex>
    <WhiteSpace size="md" />
  </div>
     <List >
        <Item arrow="horizontal" extra={<img src={require(`./jian.png`)} style={{width:21}} />} multipleLine onClick={() => {}}>
          求职助手 <Brief style={{fontSize:10}}>多种道具助你提升求职成功率</Brief>
        </Item>
        </List>
        <WhiteSpace size="md" />    
        <List >
            {
              type==='boss'? 
              Lists.map((nav,index) =>(
                    <Item
                    key={index}
                    thumb={<img src={nav.icon}></img>}
                    arrow="horizontal"
                    onClick={() => {
                      console.log(this)
                      this.props.history.push()
                    }
                  } >{nav.title}</Item>
                )):bossLists.map((nav,index) =>(
                  <Item
                  key={index}
                  thumb={<img src={nav.icon}></img>}
                  arrow="horizontal"
                  onClick={(nav,index) => {
                    
                  }
                }>{nav.title}</Item>
              ))
      }
        </List>
   <Button type='warning' onClick={this.logout}>退出</Button>

   {/* <Switch>
        {
          Lists.map((nav,index) => <Route key={index} path={nav.path} component={nav.component} />)
        }
      </Switch> */}















      </div>

    )
  }
}
export default connect(
    state => ({user:state.user}),
    {resetUser}
  )(Personal)