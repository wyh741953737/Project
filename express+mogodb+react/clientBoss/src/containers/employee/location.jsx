// import React, {Component} from 'react'
// import {Card,Button} from'antd'
// import axios from 'axios'

// class Map extends Component {
//     state = {a:1}
//     map = {}
//     componentDidMount() {
//         this.renderMap()
//         this.getMapData()
//     }
 
//     renderMap = () => {
//         const { BMap } = window
//         this.map = new BMap.Map("baiduMap"); // 创建Map实例
//         this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
//         this.addMapControl()
//     }
//     // 添加地图控件
//     addMapControl = () => {
//         const { BMap } = window
//         let map = this.map;
//         //添加比例尺
//         var control = new BMap.ScaleControl();
//         var navigation = new BMap.NavigationControl();
//         var opts = {    
//           width : 250,     // 信息窗口宽度    
//           height: 100,     // 信息窗口高度    
//           title : "Hello"  // 信息窗口标题   
//          }    
//          var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象    
//          map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
//          map.addOverlay(marker);              // 将标注添加到地图中
//              map.centerAndZoom(point, 15);
//              var opts = {
//                width : 200,     // 信息窗口宽度
//                height: 100,     // 信息窗口高度
//                title : "海底捞王府井店" , // 信息窗口标题
//                enableMessage:true,//设置允许信息窗发送短息
//                message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
//              }
//              var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
//              marker.addEventListener("click", function(){          
//                  map.openInfoWindow(infoWindow,point); //开启信息窗口
//              });
//         //添加控件和比例尺
//         map.addControl(control);
//         map.addControl(navigation);
//         map.enableScrollWheelZoom(true);
//     };
 
//     getMapData = () => {
//         let baseUrl = 'https://www.easy-mock.com/mock/5c84ba14cfb6692c29516334/mockapi'
//         axios.get(baseUrl+'/map/bike').then((res) => {
//             if(res.data.code === 0 && res.status === 200) {
//                 this.setState({
//                     res: res.data.result
//                 })
//             }
//         })
//     }

//     render() {
//         return (
//             <Card title="百度地图使用">
//                 <div id="baiduMap" style={{height:500}}></div>
//                 <Button id = "oneRoute" onClick={this.renderRouter.bind(this,this.state.res)}> 一条路线 </Button>
//                 <Button id = "serviceList" onClick={this.renderServiceList.bind(this,this.state.res)}> 服务区 </Button>
//                 <Button id = "drawBike" onClick={this.renderBike.bind(this,this.state.res)}> 覆盖点(bike) </Button>
//                 <Button id = "driveRouter" onClick={this.driveRouter.bind(this,this.state.res)}>驾驶</Button>
//                 <Button id = "clear" onClick={this.clearOverlays}>清空所有覆盖</Button>
//             </Card>
//         );
//     }
// }
 
// export default Map