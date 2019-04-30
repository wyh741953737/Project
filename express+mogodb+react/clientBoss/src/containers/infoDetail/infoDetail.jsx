import React, { Component } from 'react'
import {NavBar,
  Icon,
  List,
  Button,
  WhiteSpace,
  Tag
} from 'antd-mobile'
import {connect } from 'react-redux'
import {getUserList} from '../../redux/actions'
import './index.css'
const Item=List.Item
const Brief = Item.Brief;
class InfoDetail extends Component {
  state={
    userinfo:''
  }
 componentDidMount(){
  const {userList}=this.props
  const targetId=this.props.match.params.userid 
  const userInfo=userList.find(item => item._id===targetId)
  const place=userInfo.place
  var map = new window.BMap.Map("allmap");
  var myGeo = new window.BMap.Geocoder();
  myGeo.getPoint(`${place}`, function(point){  
    map.centerAndZoom(point, 18);  
   if (point) {    
           map.addOverlay(new window.BMap.Marker(point));     
           var geolocation = new window.BMap.Geolocation();
           var opts = {    
            width : 100,     // 信息窗口宽度    
            height: 0,     // 信息窗口高度    
            enableCloseOnClick:false,
            title : "工作地点"  // 信息窗口标题   
        }    
        var infoWindow = new window.BMap.InfoWindow(place, opts);      
        map.openInfoWindow(infoWindow,point);    
   }
   })
  //  map.addEventListener("click", function () { this.props.history.push(`/mapinfo/${targetId}`) });
 }
  render() {
    const {userList}=this.props
    const targetId=this.props.match.params.userid 
    const useritem=userList.map(item =>{
      if(item._id===targetId){
        const infoi=item.info
        console.log(infoi);
        // const Rep=/[1-9]/
        // const result=infoi.split(Rep)
        // console.log('result',result)
        return <div key={item._id}>
            <NavBar
            mode="light"
            icon={<Icon type="left" />}
            style={{position:'fixed',zIndex:'1000',width:'10rem',marginTop:'-1rem'}}
            onLeftClick={() => this.props.history.goBack()}
            rightContent={[
                <img key="0" alt='' src={require('../../assets/images/selecter.png')} style={{ marginRight: '16px',width:'.5rem',height:'.5rem' }} />,
                <img key="1" alt=''  src={require('../../assets/images/warn.png')} style={{ marginRight: '16px',width:'.5rem',height:'.5rem' }} />,
                <img key="2" alt='' src={require('../../assets/images/share.png')} style={{ width:'.5rem',height:'.5rem' }} />,
      ]}
 />
 
    <div className='info-container'>
          
      <List>
        <Item multipleLine style={{height:'3rem'}} extra={<span className='font-color'>{item.salarysValue}</span>}>
         {item.post} 
         <Brief>
            <div className='info-detail-header'>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}}  src={require('../../assets/images/address.png')}></img>{item.city.slice(0,1)}</div>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}} src={require('../../assets/images/experience.png')}></img>{item.experiences}</div>
 <div className='detail-header-img'><img alt='' style={{width:'.45rem',height:'.45rem',margin:'.2rem'}} src={require('../../assets/images/degree.png')}></img>{item.degrees}</div>
            </div>
         </Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          thumb={<img alt='' style={{width:'1.2rem',height:'1.2rem'}} src={require(`../../assets/images/${item.header}.png`)}/>}
        >{item.username}<Brief>{item.job}</Brief>
        </Item>
        <Item>
            <div className='post-describe'>职位详情</div>
            <div className='post-describe-content'>
            <pre>
              {infoi}
            </pre>
            </div>
        </Item>
        <Item ><span className='post-describe'>技能要求</span>
            <Brief>
               <div className='post-describe-skill'>
               {item.skills.split('，').map((skill,index) =>(
                  <Tag key={index} style={{margin:'.15rem'}} >{skill}</Tag>
                 ))}
               </div>
            </Brief>
        </Item>
        <Item ><span className='post-describe'>团队介绍</span>
            <Brief>
               <div className='post-describe-skill'>
                 {/* {item.companyinfo.split('，').map((cominfo,index) =>(
                   <Tag style={{margin:'.1rem'}} key={index}>{cominfo}</Tag>
                 ))} */}
               </div>
            </Brief>
        </Item>
        <Item
          arrow="horizontal"
          multipleLine
          // thumb={<img style={{width:'1.2rem',height:'1.2rem'}} src={require('../../assets/images/header5.png')}/>}
        >{item.company}<Brief>已上市·{item.scopes}</Brief>
        </Item>
      </List>
      <WhiteSpace/>
      <div onClick={() => console.log('map')}>
      <div id='allmap' style={{width:'10rem',height:'6rem'}} onClick={() => this.props.history.push(`/chatDetail/${targetId}`)}></div>
      </div>
      <List>  
         <Item
          multipleLine
          wrap
        >
        <div className='danger-wrap'>
          <img alt='' style={{width:'.35rem',height:'.35rem',margin:'.15rem'}} src={require('../../assets/images/danger.png')}/>
          <span className='danger-text'>温馨提示</span>
        </div>
        <Brief wrap><span className='danger-texts'>该Boss承诺名下所有职位不向您收费，如有不实，请立即举报。</span></Brief>
        </Item>
       </List>
       <WhiteSpace/>
                <List renderFooter={() => '目前共有#个牛人沟通过该职位，相比他们，你的综合竞争力排名为第#名'} style={{backgroundColor:'#fff'}}>
        <Item  
        arrow="horizontal" extra="使用竞争力分析器" multipleLine  wrap>
          <span className='post-describe'>你的竞争力分析</span><br/>
         
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
)(InfoDetail)