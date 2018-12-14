
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import InputComment from './inputComment'
import Posts from './posts'


const width = Dimensions.get('screen').width;
export default class Post extends Component {    

    showComents(foto) {
        if (foto.comentario === '')
            return null
        return (
            <View style={style.coments}>
                <Text style={style.nameUser}>{foto.loginUsuario}</Text>
                <Text>{foto.comentario}</Text>
            </View>
        )
    }

    

    render() {
        const { foto, likeCallBack, commentCallBack, showProfileCallBack } = this.props
        return (
            <View key={this.props.foto.id}>
                <TouchableOpacity style={style.header}
                    onPress={() => {showProfileCallBack(foto.id)}}>
                    <Image source={{ uri: this.props.foto.urlPerfil }} style={style.userImage} />
                    <Text>{this.props.foto.loginUsuario}</Text>
                </TouchableOpacity>
                <Image source={{ uri: this.props.foto.urlFoto }} style={style.imagePost} />
                <View style={style.footer}>

                    <Posts foto={foto} likeCallBack={likeCallBack} />
                    {this.showComents(foto)}

                    {foto.comentarios.map(comentario =>
                        <View style={style.coments} key={comentario.id}>
                            <Text style={style.nameUser}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}
                    <InputComment idFoto={foto.id} commentCallBack={commentCallBack} />
                </View>
            </View>
        )
    }
}


const style = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: "center",
        margin: 10
    },
    userImage: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 15
    },
    imagePost: {
        width: width,
        height: width
    },
    like: {
        height: 40,
        width: 40,

    },
    footer: {
        marginLeft: 10
    },
    numberlikes: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    coments: {
        flexDirection: 'row'
    },
    nameUser: {
        marginRight: 10,
        fontWeight: 'bold',

    }

})
