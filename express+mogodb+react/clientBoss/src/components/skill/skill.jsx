import React, { Component } from 'react'
import {
  NavBar,
  Icon,
  Tag,
  List,
  WingBlank
} from 'antd-mobile'
import './skill.css'
const Item=List.Item
const Brief = Item.Brief;
export default class Skill extends Component {
  state={
    skillList:[
     { name:'互联网/IT/电子/通信',child:['电子商务','游戏开发','媒体','广告营销','数据服务','医疗健康','旅游','在线教育','信息安全','社交网络','互联网','计算机硬件','计算机服务','计算机软件','电子']},
      {name:'金融',child:['银行','保险','证券','基金','信托','互联网金融','投资','租赁','担保']},
      {name:'医疗',child:['制药','护理','医疗设备']},
      {name:'交通',child:['运输','物流','批发','零售','贸易','出口']},
      {name:'房地产',child:['房地产开发','工程施工','建筑设计','装修装饰','建材','中介']},
      {name:'消费品',child:['食品','日化','服装','家具','玩具','珠宝','工艺品','礼品']},
    ],
    disabled:false,
  }
  selected=(val)=>{
    console.log(val)
    if(val===true){

    }
  }
  render() {
    const {skillList,disabled}=this.state
    console.log(skillList)
    return (
      <div>
         <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => this.props.history.goBack()}
    >选择行业</NavBar>
    <div>
       <List extra='0/3'>
         <Item style={{height:'2rem'}}>选择行业
           <Brief><div className='select-wrap'>请选择行业，最多3个</div></Brief>
         </Item>
        <WingBlank>
        <div className='work-wrap'>
         {
           skillList.map((item,index) => (
             <div key={index} className='work-child'>
                <div className='work-header'> {item.name}</div>
                <div >{item.child.map((chil,index) =>(
                  <Tag key={index}
                  style={{margin:'.1rem'}} 
                  onChange={val =>this.selected(val)}
                  disabled={disabled}
                  >{chil}</Tag>
                ))}</div>
             </div>
           ))
         }
        
        </div>
        </WingBlank>
       </List>
    
    </div>
      </div>
    )
  }
}
