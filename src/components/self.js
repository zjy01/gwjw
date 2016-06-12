/**
 * Created by zjy on 16-6-10.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Self extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.myTextView}>
                    <Text style={styles.label}>学号：</Text><Text style={styles.myText}>{this.props.user.username}</Text>
                </View>
                <View style={styles.myTextView}>
                    <Text style={styles.label}>名字：</Text><Text style={styles.myText}>{this.props.user.name}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={this.handleTouch.bind(this)}>
                    <Text style={styles.btntext}>注销</Text>
                </TouchableOpacity>
                <View style={styles.cr}>
                    <Text>
                        &copy; 版权所有:张嘉永
                    </Text>
                    <Text>
                        备注：手机软件大作业
                    </Text>
                </View>
            </View>
        );
    }
    handleTouch(){
        this.props.logout(this.props.user.username);
    }
};
const styles = StyleSheet.create({
    container:{
        padding:10,
        flex:1,
        flexDirection: 'column',
    },
    myTextView:{
        flexDirection: 'row',
        height:50,
        paddingLeft:20,
        marginBottom:10,
        alignItems:"center",
        backgroundColor:"#eee",
        borderRadius:5,
    },
    myText:{
        fontSize:20
    },
    label:{
        width:80,
        fontSize:20,
        color:"#999"
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        alignSelf:"stretch"
    },
    btntext:{
        color:"white",
        fontSize:16
    },
    cr:{
        position:"absolute",
        bottom:10,
        right:10
    }
});