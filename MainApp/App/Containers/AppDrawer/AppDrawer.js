import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension'
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation'
import colors from '../../Themes/Colors'
import { Icon } from 'react-native-elements'
import Tests from '../MainFlow/Tests/tests';
const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: height(15), flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Images/Emptyprofile.jpg')} style={{ height: totalSize(10), width: totalSize(10), borderRadius: 100, marginHorizontal: width(5) }} />
            <View style={{ width: width(30) }}>
                <Text style={{ fontSize: totalSize(3), fontWeight: 'bold', color: 'black' }}>Lorem Ipsum</Text>
            </View>
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
        {/* <View style={{ height: height(10), justifyContent: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20 }} onPress={() => this.props.navigation.navigate('login')} >
                <Icon name="ios-settings" color={'gray'} size={totalSize(3)} type='ionicon' />
                <Text style={{ fontSize: totalSize(2), color: 'gray', marginHorizontal: 5 }}>Log out</Text>
            </TouchableOpacity>
        </View> */}
    </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
    Tests: {
        screen: Tests,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon name="clipboard-text-outline" color={tintColor} size={totalSize(3)} type='material-community' />
            )
        }
    },
},
    {
        contentComponent: CustomDrawerComponent,
        contentOptions: {
            inactiveTintColor: 'gray',
            activeTintColor: colors.Offeeblue
        },

    }
)

export default createAppContainer(AppDrawerNavigator)