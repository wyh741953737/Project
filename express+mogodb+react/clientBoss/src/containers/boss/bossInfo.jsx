//招聘者·信息页面

import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  List,
  Picker,
  Modal,

} from 'antd-mobile'
import {updateUser} from '../../redux/actions'
import HeaderIcon from '../../components/headerSelector/headerSelector'

// import { district, provinceLite } from 'antd-mobile-demo-data'
import CitySelector from '../../components/city/city'
const salarys = [
  {
    label:
    (<div>
      <span>3000-5000</span>
    </div>),
    value: '3k-5k',
  },
  {
    label:
    (<div>
    
      <span>5000-9000</span>
    </div>),
    value: '5k-9k',
  },
  {
    label:
    (<div>
      
      <span>9000-150000</span>
    </div>),
    value: '9k-15k',
  },
  {
    label:
    (<div>
      
      <span>15000-20000</span>
    </div>),
    value: '15k-20k',
  },
  {
    label:
    (<div>
      
      <span>21000-26000</span>
    </div>),
    value: '20k-25k',
  },
];
const experience=[
  {
    label:
    (<div>
      <span>应届生</span>
    </div>),
    value: '无工作经验',
  },
  {
    label:
    (<div>
    
      <span>1</span>
    </div>),
    value: '1年以内',
  },
  {
    label:
    (<div>
      
      <span>1-2</span>
    </div>),
    value: '1-2年',
  },
  {
    label:
    (<div>
      
      <span>2-3</span>
    </div>),
    value: '2-3年',
  },
  {
    label:
    (<div>
      
      <span>3以上</span>
    </div>),
    value: '3年以上',
  },
]
const degree=[
  {
    label:
    (<div>
      <span>博士生</span>
    </div>),
    value: '博士',
  },
  {
    label:
    (<div>
    
      <span>硕士生</span>
    </div>),
    value: '硕士',
  },
  {
    label:
    (<div>
      
      <span>研究生</span>
    </div>),
    value: '研究',
  },
  {
    label:
    (<div> 
      <span>本科生</span>
    </div>),
    value: '本科',
  },
  {
    label:
    (<div>
      
      <span>专科生</span>
    </div>),
    value: '专科',
  },
  {
    label:
    (<div>
      
      <span>高中生</span>
    </div>),
    value: '高中',
  },
  {
    label:
    (<div>
      
      <span>初中生</span>
    </div>),
    value: '初中',
  },
]
const scope=[
  {
    label:
    (<div>
      <span>1-30</span>
    </div>),
    value: '1-30人',
  },
  {
    label:
    (<div>    
      <span>31-60</span>
    </div>),
    value: '31-60人',
  },
  {
    label:
    (<div>      
      <span>61-180</span>
    </div>),
    value: '61-180人',
  },
  {
    label:
    (<div>      
      <span>181-300</span>
    </div>),
    value: '181-300人·',
  },
  {
    label:
    (<div>
      
      <span>300以上</span>
    </div>),
    value: '300人以上',
  },
];
const Item=List.Item
const Brief = Item.Brief;
const alert = Modal.alert;
class BossInfo extends Component {
  
  state={
    header:'',
    post:'',
    info:'',
    company:'',
    salarysValue:'',
    degrees:'',
    experiences:'',
    skills:[],
    scopes:'',
    place:'',
    job:'',
    companyinfo:'',
  }
  handleChange= (name,value) => {
    this.setState({
      [name]:value
    })
  }
  save = () => {
    if(!this.state.header || !this.state.post || !this.state.info || !this.state.company || !this.state.salarysValue || !this.state.experiences || !this.state.degrees) 
    {      alert('信息不完整', '请填写完整信息', [
            { text: '好的', onPress: () => console.log('ok') },
          ]) 
  }
    this.props.updateUser(this.state)
  }
  clickHeader= (header) => {
    this.setState({
     header
    })
  }
  onChange=()=>{

  }
  clickCity= (city) => {
    console.log('jjj',city)
      this.setState({   city  })
  }
  render() {
    const { header,type } = this.props.user
    const {post,info,company,salarysValue, experiences, degrees}=this.state
    if(header && company && post && info && company && salarysValue && experiences && degrees) {
      const path = type==='boss' ? '/boss' : '/employee'
      return <Redirect to={path}/>
    }
    return (

      <div>
       <NavBar>招聘者信息</NavBar>
       <HeaderIcon clickHeader={this.clickHeader} />
       <InputItem placeholder='请输入职位' onChange={val => this.handleChange('post',val)}>招聘职位:</InputItem>
       <InputItem placeholder='请输入公司名称'onChange={val => this.handleChange('company',val)}>公司名称:</InputItem>
       <InputItem placeholder='请输入上班地点' onChange={val => this.handleChange('place',val)}>上班地点:</InputItem>
       <InputItem placeholder='请输入你的职位' onChange={val => this.handleChange('job',val)}>我的职位:</InputItem>
       <TextareaItem title='职位要求:' rows={3} onChange={val => this.handleChange('info',val)}/>
       <List >       
            <TextareaItem title='技能要求:' placeholder='如React，Vue' rows={2} onChange={val => this.handleChange('skills',val)}/>
            <TextareaItem title='公司介绍:' rows={3} onChange={val => this.handleChange('companyinfo',val)}/>
            <Item>
              <Brief>
              <CitySelector clickCity={this.clickCity}/></Brief>
            </Item>
            {/* <Item onClick={() => this.props.history.push('/skill/skill')} arrow="horizontal" extra='请选择'> 技能要求 </Item> */}
            <Picker
              data={degree}
              value={this.state.degrees}
              cols={1}
              onChange={val => this.handleChange('degrees',val)}
                >
              <List.Item arrow="horizontal">学历要求</List.Item>
            </Picker>
            <Picker
              data={salarys}
              value={this.state.salarysValue}
              cols={1}
              onChange={val => this.handleChange('salarysValue',val)}
            >
              <List.Item arrow="horizontal">薪资</List.Item>
            </Picker>
            <Picker
              data={experience}
              value={this.state.experiences}
              cols={1}
              onChange={val => this.handleChange('experiences',val)}
            >
              <List.Item arrow="horizontal">工作经验要求</List.Item>
            </Picker>
            <Picker
          data={scope}
          value={this.state.scopes}
          cols={1}
          onChange={val => this.handleChange('scopes',val)}
        >
          <List.Item arrow="horizontal">公司规模</List.Item>
          
        </Picker>
        </List>
       <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}
export default connect(
    state=>({user:state.user}),
    {updateUser}
)(BossInfo)
