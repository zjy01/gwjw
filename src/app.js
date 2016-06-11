
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import Tabbar, { Tab, RawContent, IconWithBar } from 'react-native-tabbar';

//引入组件
import Login from "./components/login.js"
import Course from './components/course'
import Self from './components/self'
export default class App extends Component {
  constructor(props,context) {
    super(props, context);
    this.toggle = false;
    this.state = {
      isLogin:false,
      token:null,
      user:{}
    };
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

  login(data){
    this.setState({
      isLogin: true,
      token:data.token,
      user:{
        username:data.username,
        name:data.name
      }
    });
  }
  logout(){
    this.setState({
      isLogin: false,
      token:null,
      user:{}
    });
  }


  render() {
    return (
        <View style={{flex:1}}>
          { this.state.isLogin
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
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent:'center' }}>
                  <Text onPress={()=>console.log('camera')}>Camera</Text>
                </View>
              </RawContent>
            </Tab>
            <Tab name="stats">
              <IconWithBar label="等级" size={18}/>
              <RawContent>
                <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent:'center' }}>
                  <Text onPress={()=>console.log('stats')}>Stats</Text>
                </View>
              </RawContent>
            </Tab>
            <Tab name="favorite">
              <IconWithBar label="我的" size={18}/>
              <RawContent>
                <Self user={this.state.user} logout={this.logout.bind(this)}/>
              </RawContent>
            </Tab>
          </Tabbar>
              : <Login doLogin={this.login.bind(this)}/>
          }
    </View>
    );
  }
}


class MyLongScrollView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  generateContents() {
    let contents = [];
    for (let i = 0; i < 200; i++) {
      contents.push(
        <Text key={i}>My Awesome Content {i}</Text>
      );
    }

    return contents;
  }

  onScroll(e) {
    const {
      nativeEvent: {
        contentOffset: { y }
      }
    } = e;

    const { getBarRef } = this.context;
    getBarRef().setBarHeight(y);
  }

  render() {
    return (
      <ScrollView
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={16}
        style={{ flex: 1}}
        contentContainerStyle={{ alignItems: 'center' }}>
        {this.generateContents()}
      </ScrollView>
    );
  }
}

MyLongScrollView.contextTypes = {
  getBarRef: React.PropTypes.func
};
