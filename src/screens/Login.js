
import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Button, StyleSheet, Text, View, Image, Dimensions, ScrollView, AsyncStorage, TextInput } from 'react-native';


const width = Dimensions.get('screen').width;
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            login: '',
            senha: '',
            messageError: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token')
            .then(token => {
                console.warn(token)
                if (token) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Feed' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                }
            })
    }

    getLogin() {
        const uri = "https://instalura-api.herokuapp.com/api/public/login"
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        fetch(uri, requestInfo)
            .then(response => {
                if (response.ok)
                    return response.text()
                throw new Error("Não foi possível efetuar Login")
            })
            .then(token => {
                AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('usuario', this.state.usuario)
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Feed' })],
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch(e => this.setState({ messageError: e.message }))
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.title}>Login</Text>
                <View style={style.form}>
                    <TextInput placeholder="Usuário" style={style.input}
                        onChangeText={texto => this.setState({ usuario: texto })} />
                    <TextInput placeholder="Senha" style={style.input}
                        onChangeText={texto => this.setState({ senha: texto })}
                        secureTextEntry={true} />

                    <Button title='Login' onPress={this.getLogin.bind(this)} />
                </View>


                <Text style={style.erro}> {this.state.messageError} </Text>
            </View>
        )
    }


}


const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    },
    form: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26
    },
    erro: {
        marginTop: 15,
        color: '#e74c3c'
    }


})
