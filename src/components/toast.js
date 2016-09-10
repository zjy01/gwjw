/**
 * Created by zjy on 16-6-10.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
const Dimensions = require('Dimensions');
const {height, width} = Dimensions.get('window');
export default class Toast extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textView}>
                    <Text style={styles.text}>{this.props.children}</Text>
                </View>
            </View>
        );
    }
    componentDidMount(){
        setTimeout(()=>{
            this.props.disappear();
        },3000)
    }
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        bottom:100,
        left:0,
        width
    },
    textView:{
        backgroundColor:"rgba(0,0,0,0.7)",
        borderRadius:5,
        paddingBottom:5,
        paddingTop:5,
        paddingLeft:15,
        paddingRight:15,
        alignSelf:"center"
    },
    text:{
        color:"white"
    }
});