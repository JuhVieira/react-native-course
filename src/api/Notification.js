import { Alert } from 'react-native'
export default class NotificationAlert {
    static show( title, message ){
        console.warn(title, message)
        Alert.alert(title, message)
    }
}