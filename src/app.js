import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ToastAndroid,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
var querystring = require('querystring');
import Gwxk from './lib/gwxk';
//引入组件
import Login from "./components/login.js"
import Course from './components/course'
import Score from './components/score'
import Cet from './components/cet'
import Self from './components/self'
import Load from './components/loading'

export default class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = false;
        this.state = {
            isLogin: false,
            user: {},
            isLoading: true
        };
    }

    componentWillMount() {
        this.checkStorage();
    }

    handelLogin(username, password) {
        console.log(username + password);
        if (username.trim().length < 9) {
            return this.toastShow("学号长度不正确");
        }
        else if (password.trim().length == 0) {
            return this.toastShow("密码不能为空");
        }

        Gwxk.login({username: username, password: password})
            .then((json) => {
                console.log(json);
                this.setState({
                    isLogin: true,
                    user: {
                        username: json.username,
                        name: json.name
                    },
                    isLoading: false
                });

                storage.save({
                    key: 'loginState',  //注意:请不要在key中使用_下划线符号!
                    rawData: {
                        'username': username,
                        'password': password
                    },

                    expires: null
                });

            })
            .catch((err)=> {
                if (typeof err == 'string') {
                    this.toastShow(err);
                }
                else {
                    console.warn("err");
                    console.warn(err);
                    this.toastShow("出错了");
                }
            })
    }

    checkStorage() {
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
            if (ret.password) {
                this.handelLogin(ret.username, ret.password);
            }
            else {
                this.setState({
                    user: {username: ret.username},
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

    logout(username) {
        Gwxk.logout()
            .then(()=> {
                storage.save({
                    key: 'loginState',  //注意:请不要在key中使用_下划线符号!
                    rawData: {
                        username: username,
                        password: null
                    }
                });
                this.setState({
                    isLogin: false,
                    user: {username}
                });
            })
    }

    toastShow(text) {
        if (typeof text == 'string')
            ToastAndroid.show(text, ToastAndroid.SHORT);
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.state.isLoading
                    ? <Load />
                    : (this.state.isLogin
                    ?
                    <ScrollableTabView tabBarPosition="bottom">
                        <Course tabLabel="课表"/>
                        <Score tabLabel="成绩"/>
                        <Cet tabLabel="等级"/>
                        <Self tabLabel="我的" user={this.state.user} logout={this.logout.bind(this)}/>
                    </ScrollableTabView>
                    : <Login handelLogin={this.handelLogin.bind(this)} username={this.state.user.username || ""}/>)
                }
            </View>
        );
    }
}
