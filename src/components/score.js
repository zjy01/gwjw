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

import {__HOST__} from './../conf'
import Load from './loading'

export  default class Score extends Component{
    constructor(props,context){
        super(props, context);
        this.state={
            isLoading:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            options:[]
        };

        this.selected = null;
    }
    componentDidMount(){
        this.fetchOption();
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
                    ? <Load>Data is loading!</Load>
                    : this.selected
                    ? this.renderList()
                    :<Load>请选择学年</Load>
                }

            </View>
        );
    }
    fetchOption(){
        const param = {
            token: this.props.token,
        };
        fetch(__HOST__ + "/users/getScoreOption?"+ querystring.stringify(param))
            .then((res) => {
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
                    this.selected = json.data.selected;
                    this.setState({
                        options:json.data.options
                    });
                }
                else{
                    this.toastShow(json.info);
                }
            })
            .catch(err =>{
                this.toastShow(err);
            })
    }
    fetchData(selected){
        this.selected = selected;

        const param = {
            token: this.props.token,
            xq: selected || null
        };

        this.setState({
            isLoading: true
        });

        fetch(__HOST__ + "/users/getScore?"+ querystring.stringify(param))
            .then((res) => {
                if(res.ok){
                    return res.json()
                }
                else{
                    throw "网络请求失败";
                }
            })
            .then(json=>{
                if(json.status){
                    if(json.data.length == 0){
                        this.toastShow("教务系统抓取不到成绩数据");
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
                }
                else{
                    this.toastShow(json.info);
                }
            })
            .catch(err =>{
                this.toastShow(err);
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
                    <Text style={styles.detailItem}>学分：{item.credit}</Text>
                    <Text>学时：{item.period}</Text>
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