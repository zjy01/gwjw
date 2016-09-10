/**
 * Created by zjy on 16-6-10.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Picker,
    ToastAndroid,
    ListView
} from 'react-native';
var querystring=require('querystring');

import Gwxk from '../lib/gwxk'
import Load from './loading'
export  default class Course extends Component{

    constructor(props,context){
        super(props, context);
        this.state={
            isLoading:true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            options:[],
            loadMsg:''
        };

        this.selected = null;
    }
    componentDidMount(){
        this.fetchLoad();
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={this.selected}
                        onValueChange={(selected) => this.fetchData.bind(this)(selected)}
                        mode="dropdown">
                        {
                            this.state.options.map((v,i)=>{
                                return <Picker.Item label={v.text} value={v.value} key={"courseOptions" + i} />
                            })
                        }
                    </Picker>
                </View>
                { this.state.isLoading
                    ?<Load>{this.state.loadMsg}</Load>
                    :this.renderAllList()
                }
            </View>
        );
    }
    fetchData(selected){
        this.selected = selected;
        const param = {
            xq: selected || null
        };
        this.setState({
            isLoading: true,
            loadMsg:''
        });

        Gwxk.getCourse(param)
        .then(json => {
            //课表信息
            if(json.data.length == 0){
                throw "教务系统抓取不到课表数据";
            }
            else{
                let dataSource = new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2
                });
                this.setState({
                    dataSource: dataSource.cloneWithRows(json.data),
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

    fetchLoad(){
        Gwxk.getCourse()
        .then((json)=>{
            //选择栏
            this.selected = json.option.selected;
            this.setState({
                options:json.option.options
            });
            //课表信息
            if(json.data.length == 0){
                throw "教务系统抓取不到课表数据";
            }
            else{
                let dataSource = new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2
                });
                this.setState({
                    dataSource: dataSource.cloneWithRows(json.data),
                    isLoading: false
                });
            }

        })
        .catch((err)=>{
            if(typeof err == 'string'){
                this.toastShow(err);
            }
            else{
                this.toastShow("出错了");
            }
        })
    }
    renderAllList(){
        return(
        <ScrollView>
                <ListView
                    renderHeader={this.renderHeader}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderList}
                    style={styles.courseTable}
                />
        </ScrollView>
        );
    }
    renderList(list, sectionID,rowID){
        return(
            <View style={styles.courseRow}>
                <View style={[styles.courseTime,styles.courseTh]}>
                    <Text>第{Number(rowID)+1}大节</Text>
                </View>
                {list.map((v,i)=>{
                    return (
                    <View key={"courseIndex" + i} style={styles.courseSpan}>
                        <Text>{v}</Text>
                    </View>
                    )
                })}
            </View>
        );
    }
    renderHeader(){
        return(
            <View style={[styles.courseRow,styles.courseTh, styles.courseHeader]}>
                {["","星期一","星期二","星期三","星期四","星期五","星期六","星期日"].map((v,i)=>{
                    if(i==0){
                        return (
                            <View key={"courseHeader" + i} style={styles.courseTime}>
                                <Text>{v}</Text>
                            </View>
                        )
                    }
                    else{
                        return (
                            <View key={"courseHeader" + i} style={styles.courseSpan}>
                                <Text>{v}</Text>
                            </View>
                        )
                    }
                })}
            </View>
        );
    }
    toastShow(text){
        if(typeof text == 'string')
        ToastAndroid.show(text, ToastAndroid.SHORT);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    picker:{
        borderRadius:3,
        backgroundColor:"lightblue",
        marginBottom:3
    },
    courseTable:{
        flex:1,
        flexDirection:'column',
        paddingBottom:10
    },
    courseHeader:{
      borderTopWidth: 1,
    },
    courseRow:{
        flexDirection:'row',
        borderBottomWidth: 1
    },
    courseTh:{
        backgroundColor:"lightblue"
    },
    courseTime:{
        borderLeftWidth:1,
        borderRightWidth:1,
        alignItems:"center",
        width:40
    },
    courseSpan:{
        flex:1,
        borderRightWidth:1
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