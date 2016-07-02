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
    ListView,
    ActivityIndicator
} from 'react-native';
var querystring=require('querystring');

const Dimensions = require('Dimensions');
const {height, width} = Dimensions.get('window');
import {__HOST__} from './../conf'
export  default class Load extends Component{
    render(){
        return(
            <View style={styles.container}>
                {
                    this.props.children
                        ? <Text>{this.props.children}</Text>
                        :<ActivityIndicator
                            animating={true}
                            style={[styles.centering, {height: 80}]}
                            size="large"
                        />
                }
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
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
});