import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
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

    _bootstrapAsync = async () => {
        let userToken = await Storage.getItem('user');
        setTimeout(() => { this.props.navigation.navigate(userToken ? 'App' : 'Auth') }, 1000);
    };

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