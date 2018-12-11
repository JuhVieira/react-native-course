import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Dimensions, FlatList, AsyncStorage } from 'react-native';
import Post from './Post'
import Login from '../screens/Login'
import FetchService from '../services/FetchService'
import NotificationAlert from '../api/Notification'


const width = Dimensions.get('screen').width;
export default class Feed extends Component {

  constructor() {
    super()
    this.state = {
      fotos: [],
    }
  }

  comment(idFoto, valueComment, inputComment) {
    if (valueComment != '') {
      const originalList = this.state.fotos
      const foto = this.state.fotos.find(foto => foto.id === idFoto)
      const comment = {
        texto: valueComment
      }
      FetchService.post(`/fotos/${idFoto}/comment`, comment)
        .then(comentario => [...foto.comentarios, comentario])
        .then(newList => {
          const fotoupdate = {
            ...foto,
            comentarios: newList,
          }
          const fotos = this.state.fotos.map(foto => foto.id === fotoupdate.id ? fotoupdate : foto)
          this.setState({
            fotos: fotos,
          })
          inputComment.clear()
        })
        .catch(e => {
          console.warn('e', e)
          this.setState({ fotos: originalList })
          inputComment.clear()
          NotificationAlert.show('Ops..', 'Algo deu errado!')
        })
    }
  }


  like(idFoto) {
    const originalList = this.state.fotos
    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    AsyncStorage.getItem('usuario')
      .then(userLogged => {
        let newList = []
        if (!foto.likeada) {
          newList = [
            ...foto.likers,
            { login: userLogged }
          ]
        } else {
          newList = foto.likers.filter(liker => {
            return liker.login !== userLogged
          })
        }
        return newList
      })
      .then(newList => {
        const fotoupdate = {
          ...foto,
          likeada: !foto.likeada,
          likers: newList
        }

        const fotos = this.state.fotos.map(foto => foto.id === fotoupdate.id ? fotoupdate : foto)
        this.setState({
          fotos: fotos
        })
      })

    FetchService.post(`/fotos/${idFoto}/like`)
      .catch(e => {
        console.warn('e', e)
        this.setState({ fotos: originalList })
        NotificationAlert.show('Ops..', 'Algo deu errado!')
      })
  }

  componentDidMount() {

    FetchService.get('/fotos')
      .then(json => this.setState({ fotos: json }))
      .catch(e => {
        console.warn('e', e)
        NotificationAlert.show('Ops..', 'Algo deu errado!')
      })
  }

  showProfile(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto)
    
    const resetAction = StackActions.push({
       routeName: 'ProfileUser',
    });
    
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <FlatList
        keyExtractor={item => item.id}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item} likeCallBack={this.like.bind(this)}
            commentCallBack={this.comment.bind(this)}
            showProfileCallBack={this.showProfile.bind(this)} />
        }
      />
    );
  }
}
