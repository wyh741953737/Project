import React, { Component } from 'react'
import {Picker} from 'antd-mobile' 
// import PropTypes from 'prop-types'
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px',position:'relative',borderBottom:0 }}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
        </div>
    </div>
);
 
class CitySelector extends Component {
  
 constructor(props){
    super(props);
     this.state={
        pickerValue: [],//当前还没有选择，等选择了，就加进去，[省，市，区]，将这个结果作为参数给父组件给回调函数中
     };
    }
    render(){
        let antdDistrict =[];//全部信息数组
        let districtData = require('./location');//全部信息
        Object.keys(districtData).forEach((index)=>{//遍历
            let itemLevel1 ={};//省
            let itemLevel2 ={};//市
            itemLevel1.value = districtData[index].code;//itemLevel1.value的值是省份编号
            itemLevel1.label = districtData[index].name;//itemLevel1.label的值是省份名字
            itemLevel1.children = [];//省份的孩子，市区，县城
            let data = districtData[index].cities;//一个省份的所有市区
            Object.keys(data).forEach((index)=>{//遍历所有某个省份的所有市区
                itemLevel2.value = data[index].code;//itemLevel2.value的值是某个市区编码
                itemLevel2.label = data[index].name;//itemLevel2.label的值是某个市区名字
                itemLevel2.children = [];//市区的孩子，县城
                let data2 = data[index].districts;////一个市区的所有县城
                let itemLevel3 ={};//县城
                itemLevel3.children = [];//县城的孩子
                Object.keys(data2).forEach((index)=>{ //遍历一个市区的所有县城
                    itemLevel3.value = index;//itemLevel3.value的值是某个县城编码
                    itemLevel3.label = data2[index];//itemLevel2.label的值是县城
                    itemLevel2.children.push(itemLevel3);//将这个县城添加到市区的孩子数组中
                    itemLevel3 ={};
                });
                itemLevel1.children.push(itemLevel2);//将添加了县城的市区添加到省份中去
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)//将最后的结果加到antdDistrict中
        });
        return (
            <div>
                <Picker
                    title="选择地区"
                    data={antdDistrict}//要选择的全部信息
                    value={this.state.pickerValue} //选中的信息
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={v => this.setState({ pickerValue: v })}
                   
                >
                    <CustomChildren>请选择</CustomChildren>
                </Picker>
            </div>
        )
    }
}
export default  CitySelector