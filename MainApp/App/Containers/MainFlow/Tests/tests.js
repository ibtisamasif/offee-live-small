import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { height, width, totalSize } from 'react-native-dimension'
import colors from '../../../Themes/Colors';
import Modal from 'react-native-modal'
import { subjectList } from '../../../backend/ApiAxios'
import Storage from '../../../helper/asyncStorage'


import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
_this = null;
export default class Tests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisibleLogout: false
        };
    }
    componentDidMount() {
        _this = this
    }
    _toggleModalLogout = () => this.setState({ isModalVisibleLogout: !this.state.isModalVisibleLogout })
    logOut = () => {
        this._toggleModalLogout()
        this.props.navigation.navigate('Auth')
        Storage.removeItem('user');
        Storage.clear();
    }
    render() {
        return (
            <View style={styles.Maincontainer}>
                <View style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <Icon name='menu' color='white' onPress={() => this.props.navigation.openDrawer()} />
                    </View>
                    <View style={{ flex: 5.5, justifyContent: 'center' }}>
                        <View>
                            <Text style={{ fontSize: totalSize(2), color: 'white', fontWeight: 'bold' }} >Live Tests</Text>
                        </View>
                    </View>
                    <View style={styles.headerIconContainer}>
                        <Icon name='search' color='white' />
                    </View>
                    <View style={styles.headerIconContainer}>
                        <Icon name='sign-out' color='white' type='octicon' size={totalSize(3)} onPress={() => this._toggleModalLogout()} />
                        {/* <Icon name='dots-three-vertical' color='white' type='entypo' /> */}
                    </View>
                </View>
                <View style={styles.container}>
                    <TestTabs />

                </View>
                <Modal
                    isVisible={this.state.isModalVisibleLogout} // Logout User
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={250}
                    animationOutTiming={250}
                    backdropOpacity={0.50}>
                    <View style={{ backgroundColor: 'white', height: height(20), width: width(80), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: totalSize(1.5) }}>Are you sure you want to logout?</Text>
                            <View style={{ marginTop: height(2), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>

                                <TouchableOpacity onPress={this._toggleModalLogout} style={{ height: height(8), width: width(30), backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Text style={{ fontSize: totalSize(2), color: 'white' }}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={{ width: width(2.5) }}></View>
                                <TouchableOpacity onPress={() => this.logOut()} style={{ height: height(8), width: width(30), backgroundColor: colors.Offeeblue, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                                    <Text style={{ fontSize: totalSize(2), color: 'white' }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export class TestTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test_category: [
                { id: 1, category: 'ISSB Army' },
                { id: 2, category: 'IDBI Executive' },
                { id: 3, category: 'SBI Clerk' },
                { id: 4, category: 'IBPS Clerk' },
                { id: 5, category: 'RRB Office Assistant' },
                { id: 6, category: 'J&K Bank Clerk' },
            ]
        };
    }

    render() {
        return (
            <ScrollableTabView
                tabBarUnderlineStyle={{ height: 1 }}
                tabBarInactiveTextColor={colors.steel}
                tabBarActiveTextColor='black'
                locked={false}
                initialPage={1}
                renderTabBar={() => <ScrollableTabBar />}
            >
                    <ScrollView>
                        {
                            this.state.test_category.map((item, key) => {
                                return (
                                    <TouchableOpacity key={key} style={styles.mainBtn}
                                    >
                                        <View style={styles.btnIconContainer}>
                                            <View style={{ width: totalSize(6), height: totalSize(6), borderRadius: 100, backgroundColor: colors.Offeeblue, alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon name="clipboard-text" size={totalSize(3)} color='white' type='material-community' />
                                            </View>
                                        </View>
                                        <View style={styles.btnTxtContainer}>
                                            <Text style={styles.btnTxt1}>{item.category}</Text>
                                            <Text style={styles.btnTxt2}>1/11</Text>
                                        </View>
                                        <View style={styles.arrowContainer}>
                                            <Icon name="ios-arrow-forward" size={totalSize(2.5)} color='gray' type='ionicon' />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                {
                    this.state.test_category.map((item, key) => {
                        return (
                            <ScrollView key={key} tabLabel={item.category}>
                                <TestsList />
                            </ScrollView>
                        )
                    })
                }

            </ScrollableTabView>
        );
    }
}

export class TestsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [
                { id: 1, test: 'IBPS Clerk-Full Mock Test', expiry: '02:30PM 31Aug,2020', tag: 'IBPS Clerk', questions: '100', Score: '100', duration: '60' },
                { id: 2, test: 'IBPS Clerk-Full Mock Test', expiry: '09:30AM 22Jun,2019', tag: 'IBPS Clerk', questions: '100', Score: '100', duration: '60' },
                { id: 3, test: 'IBPS Clerk-Full Mock Test', expiry: '04:30PM 05Aug,2020', tag: 'IBPS Clerk', questions: '100', Score: '100', duration: '60' },
                { id: 4, test: 'IBPS Clerk-Full Mock Test', expiry: '11:30AM 21Aug,2019', tag: 'IBPS Clerk', questions: '100', Score: '100', duration: '60' },
                { id: 5, test: 'IBPS Clerk-Full Mock Test', expiry: '12:30PM 17Aug,2020', tag: 'IBPS Clerk', questions: '100', Score: '100', duration: '60' },
                { id: 6, test: 'IBPS Clerk-Full Mock Test', expiry: '02:30PM 25Aug,2019', tag: 'IBPS Clerk', questions: '100', Score: '100', duration: '60' },
            ]
        };
    }

    async componentDidMount() {
        let user = await Storage.getItem('user');
        loginData = await subjectList(user.cat, user.name);
        console.log('api data', loginData);
        if(loginData){
            this.setState({
                tests: loginData
            })
        }
    }

    async EnterToTest(item) {
        console.log('subject object:', item)
        _this.props.navigation.navigate('testInstructions', {oneSubject: item})
    }

    render() {
        return (
            <View style={styles.Maincontainer}>

                <View style={styles.container}>
                    <ScrollView horizontal={true} tabLabel='IBPS Clerk'>
                        {
                            <View style={{ alignItems: 'center' }}>
                                <ScrollView horizontal={true} >
                                    {
                                        this.state.tests.map((item, key) => {
                                            return (
                                                <View key={key} style={{ width: width(60), backgroundColor: 'white', alignItems: 'center', marginVertical: totalSize(2), marginHorizontal: totalSize(0.5), elevation: 2 }}>
                                                    <View style={{ width: width(50), marginVertical: totalSize(2) }}>
                                                        <Text style={[styles.h2]}>{item.quiz_name}</Text>
                                                    </View>
                                                    <View style={{ width: width(50), flexDirection: 'row', alignItems: 'center', marginVertical: totalSize(1) }}>
                                                        <Icon name='clock' type='octicon' color='gray' size={totalSize(1.5)} />
                                                        <Text style={styles.h4}> Starts on: {item.expiry}</Text>
                                                    </View>
                                                    <View style={{ width: width(50), marginVertical: totalSize(1) }}>
                                                        <TouchableOpacity style={{ backgroundColor: 'gray', borderRadius: 100, height: height(3), width: width(20), alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={[styles.h4, { color: 'white' }]}>{item.tag}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{ width: width(50), marginVertical: totalSize(0.5) }}>
                                                        <Text style={[styles.h4, { color: colors.Offeeblue }]}>Syllabus Info</Text>
                                                    </View>
                                                    <View style={{ width: width(50), borderBottomWidth: 0.5, borderBottomColor: colors.steel, flexDirection: 'row' }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={[styles.h4, { marginVertical: totalSize(1.5) }]}>Questions</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={[styles.h4, { color: 'black', fontWeight: 'bold', marginVertical: totalSize(1.5) }]}>{item.questions}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: width(50), borderBottomWidth: 0.5, borderBottomColor: colors.steel, flexDirection: 'row' }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={[styles.h4, { marginVertical: totalSize(1.5) }]}>Score</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={[styles.h4, { color: 'black', fontWeight: 'bold', marginVertical: totalSize(1.5) }]}>{item.Score}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: width(50), flexDirection: 'row' }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={[styles.h4, { marginVertical: totalSize(1.5), }]}>Minutes</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                            <Text style={[styles.h4, { color: 'black', fontWeight: 'bold', marginVertical: totalSize(1.5) }]}>{((item.quiz_duration)/60)*1}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: width(50), marginVertical: totalSize(1.5), alignItems: 'center' }}>
                                                        <TouchableOpacity onPress={() => this.EnterToTest(item)} style={{ backgroundColor: colors.Offeeblue, borderRadius: 2.5, height: height(5), width: width(50), alignItems: 'center', justifyContent: 'center' }}>
                                                            <Text style={[styles.h3, { color: 'white', fontWeight: 'bold' }]}>Enter Now</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>

                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1
    },
    header: {
        flex: .1,
        flexDirection: 'row',
        //backgroundColor: colors.Offeeblue
        backgroundColor: 'black'
    },
    headerIconContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.silver
    },
    h1: {
        fontSize: totalSize(3),
        color: 'black',
        fontWeight: 'bold',
    },
    h2: {
        fontSize: totalSize(2.5),
        color: 'black',
        fontWeight: 'bold',
    },
    h3: {
        fontSize: totalSize(2),
        color: 'black'
    },
    h4: {
        fontSize: totalSize(1.5),
        color: 'gray'
    },
    mainBtn: {
        flexDirection: 'row',
        height: height(10),
        width: width(90),
        borderBottomWidth: 0.5,
        borderColor: 'rgb(217,217,217)',
        alignItems: 'center'
    },
    btnIconContainer: { height: height(15), width: width(15), justifyContent: 'center' },
    btnTxtContainer: { height: height(15), width: width(65), justifyContent: 'center' },
    btnTxt1: { fontSize: totalSize(2), color: 'black' },
    btnTxt2: { fontSize: totalSize(1.5), color: 'gray' },
    arrowContainer: { width: width(10), height: height(15), alignItems: 'center', justifyContent: 'center' },

})
