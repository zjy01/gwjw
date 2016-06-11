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
    ListView
} from 'react-native';
var querystring=require('querystring');

const Dimensions = require('Dimensions');
const {height, width} = Dimensions.get('window');
import {__HOST__} from './../conf'
export  default class Load extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Data is loading!</Text>
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