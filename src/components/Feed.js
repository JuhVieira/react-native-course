import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, AppRegistry } from 'react-native';
import Post from './Post'


const width = Dimensions.get('screen').width;
export default class Feed extends Component {

  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  comment(valueComment, inputComment, idFoto) {
    if (valueComment != '') {
      const foto = this.state.fotos.find(foto => foto.id === idFoto)

      console.warn(this.state.valueComment)
      const newList = [...foto.comentarios, {
        id: valueComment,
        login: 'Novo usuário',
        texto: valueComment,
      }]

      const fotoupdate = {
        ...this.state.foto,
        comentarios: newList,
      }

      const fotos = this.state.fotos.map(foto => foto.id === fotoupdate.id ? fotoupdate : foto)
      this.setState({
        fotos: fotos,
      })

      inputComment.clear()
    }
  }


  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)
    let newList = []
    if (!foto.likeada) {
      newList = [
        ...foto.likers,
        { login: 'novousuário' }
      ]
    } else {
      newList = foto.likers.filter(liker => {
        return liker.login !== 'novousuário'
      })
    }

    const fotoupdate = {
      ...foto,
      likeada: !foto.likeada,
      likers: newList
    }

    const fotos = this.state.fotos.map(foto => foto.id === fotoupdate.id ? fotoupdate : foto)
    this.setState({
      fotos: fotos
    })
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(response => response.json())
      .then(json => this.setState({ fotos: json }))
  }

  render() {
    return (
      <FlatList style={style.container}
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} likeCallBack={this.like.bind(this)}
            commentCallBack={this.comment.bind(this)} />
        }
      />

      // <Login />
    );
  }
}


const style = StyleSheet.create({
  container: {
    marginTop: 20,
  },

})