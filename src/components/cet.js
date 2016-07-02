/**
 * Created by zjy on 16-6-10.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ToastAndroid,
    Picker,
    ListView
} from 'react-native';
var querystring=require('querystring');

import Gwxk from '../lib/gwxk'
import Load from './loading'

export  default class Cet extends Component{
    constructor(props,context){
        super(props, context);
        this.state={
            isLoading:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loadMsg:''
        };

    }
    componentDidMount(){
        this.fetchData();
    }
    render(){
        return(
            <View style={styles.container}>
                { this.state.isLoading
                    ? <Load>{this.state.loadMsg}</Load>
                    :this.renderList()
                }
            </View>
        );
    }
    fetchData(){

        const param = {
            token: this.props.token
        };

        this.setState({
            isLoading: true,
            loadMsg:''
        });

        Gwxk.getCet()
            .then( data => {
                if(data.length == 0){
                    throw "教务系统抓取不到等级考试数据";
                }
                else{
                    let dataSource = new ListView.DataSource({
                        rowHasChanged: (row1, row2) => row1 !== row2
                    });
                    this.setState({
                        dataSource: dataSource.cloneWithRows(data),
                        isLoading: false
                    });
                }
            })
            .catch((err)=>{
                this.setState({
                    loadMsg:'无数据'
                });
                if(typeof err == 'string'){
                    this.toastShow(err);
                }
                else{
                    this.toastShow("出错了");
                }
            })
    }
    renderList(){
        return(
            <ScrollView>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                />
            </ScrollView>
        );
    }
    renderItem(item){
        return(
            <View style={styles.viewBox}>
                <Text style={styles.course}>{item.name}</Text>
                <View style={styles.detail}>
                    <Text style={styles.detailItem}>成绩：{item.score}</Text>
                    <Text>时间：{item.time}</Text>
                </View>
            </View>
        );
    }
    toastShow(text){
        if(typeof text == 'string')
            ToastAndroid.show(text, ToastAndroid.SHORT);
    }
};
const styles = StyleSheet.create({
    container:{
        padding:10,
        flex:1,
        backgroundColor:"#eee"
    },
    picker:{
        borderRadius:3,
        backgroundColor:"lightblue",
        marginBottom:3
    },
    viewBox:{
        backgroundColor:"white",
        marginTop:8,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5,
        paddingBottom:5
    },
    course:{
        fontSize:16,
        color:"#555"
    },
    detail:{
        flex:1,
        flexDirection:'row',
        marginTop:3
    },
    detailItem:{
        marginRight:30,
    }

});