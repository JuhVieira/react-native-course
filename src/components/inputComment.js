


import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';



export default class InputComment extends Component {

    constructor(){
        super()
        this.state ={
            valueComment: ''
        }
    }
    
    

    
    render() {
        return(
            <View style={style.container}>
                <TextInput style={style.input} placeholder="Adicionar novo comentário"
                    ref={input => this.inputComment = input} onChangeText={text => this.setState({ valueComment: text })} />
                <TouchableOpacity onPress={() => {
                    this.props.commentCallBack(this.state.valueComment, this.inputComment, this.props.idFoto);
                    this.setState({valueComment: ''})
                }}>
                    <Image style={style.send} source={require('../../resources/send.png')} />
                </TouchableOpacity>
            </View >
    )}
}


const style = StyleSheet.create({

   
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10
    },
    
    input: {
        height: 40,
        flex: 1,
    },
    send: {
        height: 25,
        width: 25,
        marginRight: 10,
    }



})