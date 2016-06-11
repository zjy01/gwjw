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
var querystring=require('querystring');

const Dimensions = require('Dimensions');
const {height, width} = Dimensions.get('window');
import {__HOST__} from './../conf'
export  default class Self extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.user.username}</Text>
                <Text>{this.props.user.name}</Text>
                <TouchableOpacity>注销</TouchableOpacity>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container:{
        padding:10,
        flex:1,
        height:height,
        justifyContent:"center",
        alignItems:"center"
    }
});