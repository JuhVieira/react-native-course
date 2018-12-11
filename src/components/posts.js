import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';


const width = Dimensions.get('screen').width;
export default class Posts extends Component {

    changeIcon(liked) {
        return liked ? require('../../resources/s2-checked.png')
            : require('../../resources/s2.png')
    }

    showLikes(likers) {
        if (likers <= 0)
            return null;

        return (
            <Text style={style.numberlikes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    render() {
        const { foto, likeCallBack } = this.props
        return (
            <View style={style.footer}>
                <TouchableOpacity onPress={()=>{likeCallBack(this.props.foto.id)}}>
                    <Image style={style.like} source={this.changeIcon(this.props.foto.likeada)} />
                </TouchableOpacity>
                {this.showLikes(foto.likers)}
            </View>
        )
    }
}


const style = StyleSheet.create({

    
    like: {
        height: 40,
        width: 40,

    },
    footer: {
        marginLeft: 10
    },

})
