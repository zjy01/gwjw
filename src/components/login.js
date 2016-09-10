/**
 * Created by zjy on 16-6-10.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Image,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';

const Dimensions = require('Dimensions');
const {height, width} = Dimensions.get('window');
import LOGO from './../img/gwjw.png'
import {__HOST__} from './../conf'
export  default class Login extends Component{
    constructor(props,context){
        super(props, context);
        this.state={
            username:this.props.username,
            password:""
        };
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>广外轻松查</Text>
                <View style={styles.loginBox}>
                    <Text style={styles.loginText}>登录</Text>
                    <TextInput style={styles.input}
                               keyboardType="numeric"
                               defaultValue={this.state.username}
                               autoFocus={true}
                               placeholder='学号'
                               onChangeText={(username) =>this.setState({username})}
                               blurOnSubmit={true}
                    />
                    <TextInput style={styles.input}
                               placeholder='密码'
                               secureTextEntry={true}
                               onChangeText={(password) =>this.setState({password})}
                               blurOnSubmit={true}
                    />
                    <Text style={styles.tips}>
                        请使用数字广外帐号、密码登录
                    </Text>
                    <TouchableOpacity style={styles.btn} onPress={this.handleTouch.bind(this)}>
                        <Text style={styles.btntext}>登录</Text>
                    </TouchableOpacity>
                </View>
                <Image source={LOGO} style={styles.image}/>
            </View>
        );
    }
    handleTouch(){
        this.props.handelLogin(this.state.username, this.state.password);
    }
    toastShow(text){
        if(typeof text == 'string')
            ToastAndroid.show(text, ToastAndroid.SHORT);
    }
}

const styles = StyleSheet.create({
    container:{
      padding:10,
        flex:1,
        height:height,
        backgroundColor:'#0070f7'
    },
    title:{
        color:"white",
        fontSize:30,
        justifyContent:"center",
        marginTop:20,
        marginBottom:20,
        textAlign:"center"
    },
    tips:{
        textAlign:"right",
        fontSize:12,
        color:"#999"
    },
    input: {
        height: 40,
        marginTop: 10, //间隔
        borderWidth: 1,
        borderRadius: 5, //圆角
        borderColor: 'lightblue',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0070f7',
        height: 40,
        width:100,
        borderRadius: 5,
        marginTop: 10,
        alignSelf:"center"
    },
    btntext:{
        color:"white"
    },
    loginBox:{
        padding:20,
        backgroundColor:"rgba(255,255,255,0.7)",
        borderRadius: 5
    },
    loginText:{
        textAlign:"center",
        fontSize:18,
        fontWeight:"bold"
    },
    image:{
        width:200,
        height:200,
        marginTop:20,
        alignSelf:"center"
    }
});