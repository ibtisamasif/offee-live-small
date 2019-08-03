import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image
} from 'react-native';
import colors from '../Themes/Colors';
import { totalSize } from 'react-native-dimension';
import images from '../Themes/Images';
import Storage from '../helper/asyncStorage'

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        let userToken = await Storage.getItem('user');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        setTimeout(() => { this.props.navigation.navigate(userToken ? 'App' : 'Auth') }, 1000);
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                <Image source={images.logo} style={{ height: totalSize(20), width: totalSize(20) }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'gray', fontSize: totalSize(2), fontWeight: 'bold' }}>Live </Text>
                    <ActivityIndicator color={colors.Offeeblue} size={'small'} />
                </View>

            </View>
        );
    }
}