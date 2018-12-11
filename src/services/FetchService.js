import { AsyncStorage } from 'react-native'


export default class FetchService {
    static get(recurso) {
        const uri = 'https://instalura-api.herokuapp.com/api' + recurso
        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    headers: new Headers({
                        "X-AUTH-TOKEN": token
                    })
                }
            })
            .then(requestInfo => fetch(uri, requestInfo))
            .then(response => {
                console.warn(response)
                if(response.ok){
                    return response.json()
                }
                throw new Error('Não foi possivel realizar solicitação')
            })
    }

    static post(recurso, data) {
        const uri = 'https://instalura-api.herokuapp.com/api/' + recurso
        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "X-AUTH-TOKEN": token
                    })
                }
            })
            .then(requestInfo => fetch(uri, requestInfo))
            .then(response => {
                console.warn(response)
                if(response.ok){
                    return response.json()
                }
                throw new Error('Não foi possivel realizar solicitação')
            })
    }

}