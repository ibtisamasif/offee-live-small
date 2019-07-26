import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../Themes/Colors'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements'
import Home from '../MainFlow/Home/home';
import Practice from '../MainFlow/Practice/practice';
import Tests from '../MainFlow/Tests/tests';
import Courses from '../MainFlow/Courses/courses';
import Read from '../MainFlow/Read/read';
import Chalkboard from 'react-native-vector-icons/FontAwesome5'
const tabNavigator = createBottomTabNavigator({
    // Home: {
    //     screen: Home,
    //     navigationOptions: {
    //         tabBarLabel: '',
    //         tabBarIcon: ({ tintColor }) => (
    //             <Icon name="home" color={tintColor} size={totalSize(2.5)} type='simple-line-icon'/>
    //         )
    //     }
    // },
    // Practice: {
    //     screen: Practice,
    //     navigationOptions: {
    //         tabBarLabel: '',
    //         tabBarIcon: ({ tintColor }) => (
    //             <Icon name="book" color={tintColor} size={totalSize(3)} type='octicon' />
    //         )
    //     }
    // },
    Tests: {
        screen: Tests,
        navigationOptions: {
            tabBarLabel: 'Live Tests',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="clipboard-text-outline" color={tintColor} size={totalSize(3)} type='material-community' />
            )
        }
    },
    // Courses: {
    //     screen: Courses,
    //     navigationOptions: {
    //         tabBarLabel: '',
    //         tabBarIcon: ({ tintColor }) => (
    //             <Chalkboard name="chalkboard" color={tintColor} size={totalSize(2)} />
    //         )
    //     }
    // },
    // Read: {
    //     screen: Read,
    //     navigationOptions: {
    //         tabBarLabel: '',
    //         tabBarIcon: ({ tintColor }) => (
    //             <Icon name="file-document-box-multiple-outline" color={tintColor} size={totalSize(2.5)} type='material-community' />
    //         )
    //     }
    // },

}, {
        tabBarOptions: {
            activeTintColor: colors.Offeeblue,
            //inactiveTintColor:colors.SPA_graycolor,
            inactiveTintColor: 'gray',
            //activeBackgroundColor: 'rgb(0,41,132)',
            //inactiveBackgroundColor: 'rgb(0,41,132)',
            safeAreaInset: { bottom: 'never', top: 'never' }
        },

    }
);

export default createAppContainer(tabNavigator);