
import React, { Component } from 'react'
import {connect } from 'react-redux'
import {BMAP_STATUS_SUCCESS ,BMAP_NAVIGATION_CONTROL_LARGE,BMAP_ANCHOR_TOP_LEFT} from '../../redux/action-types'
// import './index.css'
import { Flex,
    Button,
    NavBar,
    WingBlank
} from 'antd-mobile'
import {getUserList} from '../../redux/actions'
 class MapInfo  extends Component {
     state={
         carTime:'',
         trainTime:'',
         walkTime:'',
         distance:'',
         posiition:''
     }
    componentDidMount(){
     var map = new window.BMap.Map("allmap",{minZoom:5,maxZoom:6});
     const {  BMAP_STATUS_SUCCESS}=window 
     var myGeo = new window.BMap.Geocoder();
     var addre='湖南省岳阳市岳阳楼区'
     var addre2='江西省南昌市新建县'
    // var a=addre.slice(0,addre.indexOf('省')+1)
     // console.log(a,'a')
 myGeo.getPoint(`${addre}`, function(point){  
                 map.centerAndZoom(point, 11);  
                if (point) {      
                        map.addOverlay(new window.BMap.Marker(point));     
                        var geolocation = new window.BMap.Geolocation();
                        geolocation.getCurrentPosition(function(r){
                            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            var mk = new window.BMap.Marker(r.point);
                            map.addOverlay(mk);
                            map.panTo(r.point);
                            var driving = new window.BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
                            driving.search(point, r.point);               
                            var searchComplete = function (results){
                                   if (transit.getStatus() != BMAP_STATUS_SUCCESS){      return ;      }
                           var plan = results.getPlan(0);
                           var time = plan.getDuration(true) + "\n";                                       
                           var distance = plan.getDistance(true) + "\n";                
                           }
                           
                        var transit = new window.BMap.DrivingRoute(map, {renderOptions: {map: map},
                            onSearchComplete: searchComplete,
                            onPolylinesSet: function(){  }
                          });
                        transit.search(`${addre}`, `${addre2}`);
                        
                     }else {     alert('failed'+this.getStatus());       }        
         },{enableHighAccuracy: true})
        }   
    }, "湖南省"); 

    //     var navigationControl = new window.BMap.NavigationControl({
    //         anchor: BMAP_ANCHOR_TOP_LEFT,  // 靠左上角位置
    //         type: BMAP_NAVIGATION_CONTROL_LARGE, // LARGE类型
    //         enableGeolocation: true  // 启用显示定位
    //     });
    //    map.addControl(navigationControl);
}
  render() {
    
    return (
      <div >
         <NavBar>工作地点</NavBar>
         <div style={{width:'10rem',height:'3rem',backgroundColor:'#fff'}}>
            <div>
                <div id='allmap' style={{height:'11rem',width:'10rem'}}><img></img></div>
                
            </div>
            <div>
                <WingBlank>
                <div >
                <div className='city-name'>
                <img  src={require('../../assets/images/mapaddress.png')} style={{margin:'.15rem',width:'.4rem',height:'.4rem'}}></img>
                 <span>哈尔滨吉林写字楼1223</span>
               </div>
               <div className='city-name'>
                <img  src={require('../../assets/images/distance.png')} style={{margin:'.15rem',width:'.4rem',height:'.4rem'}}></img>
                 <span>距离235.6Km</span>
               </div>
            </div>
            <Flex style={{backgroundColor:'#f8f8f8'}}>
                <Flex.Item><div className='personal' style={{marginBottom:'.3rem'}}><img  src={require('../../assets/images/car.png')} style={{height:'.6rem'}}></img></div><div className='personal describe'>1天2小时</div></Flex.Item>
                <Flex.Item><div className='personal' style={{marginBottom:'.3rem'}}><img src={require('../../assets/images/train.png')} style={{height:'.6rem'}}></img></div><div className='personal describe'>18小时</div></Flex.Item>
                <Flex.Item><div className='personal' style={{marginBottom:'.3rem'}}><img src={require('../../assets/images/walk.png')} style={{height:'.6rem'}}></img></div><div className='personal describe'>距离太远</div></Flex.Item>
           </Flex>     
                </WingBlank>
            <Button style={{backgroundColor:'rgb(44, 195, 209)',width:'9.4rem',marginLeft:'.3rem',color:'#fff'}}>到这里去</Button>
         </div>
         </div>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user,userList:state.userList}),
  {getUserList}
)(MapInfo)