
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ToastAndroid,
} from 'react-native';

import Tabbar, { Tab, RawContent, IconWithBar } from 'react-native-tabbar';
var querystring=require('querystring');
import {__HOST__} from './conf'
//引入组件
import Login from "./components/login.js"
import Course from './components/course'
import Score from './components/score'
import Cet from './components/cet'
import Self from './components/self'
import Load from './components/loading'

export default class App extends Component {
  constructor(props,context) {
    super(props, context);
    this.toggle = false;
    this.state = {
      isLogin:false,
      token:null,
      user:{},
      isLoading:true
    };
  }

  componentWillMount(){
    this.checkStorage();
  }
  componentDidMount() {
    // let toggle = "tab2";
    // setInterval(() => {
    //   console.log(`goto ${toggle}`);
    //   this.refs['myTabbar'].gotoTab(toggle);
    //   toggle = toggle == "tab2"? "tab3" : "tab2";
    // }, 1000);
    //
    //
    //
    // let toggleShow = true;
    // setInterval(() => {
    //   toggleShow = !toggleShow;
    //   this.refs['myTabbar'].getBarRef().show(toggleShow);
    // }, 200);


    // setTimeout(() => {
    //   this.refs['myTabbar'].gotoTab('tab2');
    // }, 2000);
    //
    // setTimeout(() => {
    //   this.refs['myTabbar'].gotoTab("tab3");
    // }, 4000);
  }

  tabbarToggle() {
    this.refs['myTabbar'].getBarRef().show(this.toggle);
    this.toggle = !this.toggle;
  }

  handelLogin(username, password){
    if(username.trim().length<9) {
      return this.toastShow("学号长度不正确");
    }
    else if(password.trim().length==0){
      return this.toastShow("密码不能为空");
    }
    const option = {
      method:"POST",
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:querystring.stringify({username:username, password: password})
    };
    storage.save({
      key: 'loginState',  //注意:请不要在key中使用_下划线符号!
      rawData: {
        'username':username,
        'password':password
      },

      // 如果不指定过期时间，则会使用defaultExpires参数
      // 如果设为null，则永不过期
      expires: null
    });

    fetch(__HOST__ + "/users/login", option)
        .then((res) => {
          console.log(res);
          if(res.ok){
            return res.json()
          }
          else{
            throw "网络请求失败";
          }
        })
        .then(json=>{
          console.log(json);
          if(json.status){
            this.setState({
              isLogin: true,
              token:json.data.token,
              user:{
                username:json.data.username,
                name:json.data.name
              },
              isLoading: false
            });
          }
          else{
            this.toastShow("帐号或密码不正确");
          }
        })
        .catch(err =>{
          this.toastShow(err);
        })
  }

  checkStorage(){
    // 读取
    storage.load({
      key: 'loginState',

      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
      autoSync: false,

      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用同步方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true
    }).then(ret => {
      if(ret.password){
        this.handelLogin(ret.username, ret.password);
      }
      else{
        this.setState({
          user: {username:ret.username},
          isLoading: false
        });
      }
    }).catch(err => {
      //如果没有找到数据且没有同步方法，
      //或者有其他异常，则在catch中返回
      this.setState({
        isLoading: false
      });
      err && console.warn(err);
    })
  }

  logout(username){
    storage.save({
      key: 'loginState',  //注意:请不要在key中使用_下划线符号!
      rawData: {
        username:username,
        password: null
      }
    });
    this.setState({
      isLogin: false,
      token:null,
      user:{username}
    });
  }

  toastShow(text){
    if(typeof text == 'string')
      ToastAndroid.show(text, ToastAndroid.SHORT);
  }

  render() {
    return (
        <View style={{flex:1}}>
          {this.state.isLoading
              ?<Load>数据正在更新...</Load>
              : (this.state.isLogin
              ? <Tabbar ref="myTabbar" barColor={'#55ACEE'}>
                  <Tab name="home">
                    <IconWithBar label="课表" size={18}/>
                    <RawContent>
                      <Course token={this.state.token}/>
                    </RawContent>
                  </Tab>
                  <Tab name="camera">
                    <IconWithBar label="成绩" size={18}/>
                    <RawContent>
                      <Score token={this.state.token}/>
                    </RawContent>
                  </Tab>
                  <Tab name="stats">
                    <IconWithBar label="等级" size={18}/>
                    <RawContent>
                      <Cet token={this.state.token}/>
                    </RawContent>
                  </Tab>
                  <Tab name="favorite">
                    <IconWithBar label="我的" size={18}/>
                    <RawContent>
                      <Self user={this.state.user} logout={this.logout.bind(this)}/>
                    </RawContent>
                  </Tab>
                </Tabbar>
              : <Login handelLogin={this.handelLogin.bind(this)} username={this.state.user.username || ""}/>)
          }
    </View>
    );
  }
}

