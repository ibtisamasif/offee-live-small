import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { height, width, totalSize } from 'react-native-dimension'
import colors from '../../../Themes/Colors';
_this = null
class TestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        _this = this;
    }
    static navigationOptions = {
        title: 'Result',
        headerRight: (
            <TouchableOpacity onPress={() => _this.props.navigation.replace('testResult')} style={{ backgroundColor: colors.SPA_redColor, borderRadius: 5, marginHorizontal: 5 }} >
                <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name='home' color='black' size={totalSize(3.5)} />
                </View>
            </TouchableOpacity>
        )
    }



    render() {
        return (
            <View style={styles.container}>
                 <Text style={[styles.h2, { color: colors.Offeeblue }]}>Your Test has been Submitted</Text>
               {/*  <View style={styles.mainBtn} >
                    <View style={styles.btnIconContainer}>
                        <View style={{ width: totalSize(6), height: totalSize(6), borderRadius: 100, backgroundColor: colors.Quizblue, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="trophy" size={totalSize(3)} color='white' type='entypo' />
                        </View>
                    </View>
                    <View style={styles.btnTxtContainer}>
                        <Text style={styles.btnTxt2}>Score</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnTxt1}>85</Text>
                            <Text style={styles.btnTxt2}>/100</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mainBtn} >
                    <View style={styles.btnIconContainer}>
                        <View style={{ width: totalSize(6), height: totalSize(6), borderRadius: 100, backgroundColor: colors.fire, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="users" size={totalSize(2.5)} color='white' type='font-awesome' />
                        </View>
                    </View>
                    <View style={styles.btnTxtContainer}>
                        <Text style={styles.btnTxt2}>Percentile</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnTxt1}>60.54</Text>
                            <Text style={styles.btnTxt2}> %</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mainBtn} >
                    <View style={styles.btnIconContainer}>
                        <View style={{ width: totalSize(6), height: totalSize(6), borderRadius: 100, backgroundColor: colors.Green, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="bullseye-arrow" size={totalSize(3)} color='white' type='material-community' />
                        </View>
                    </View>
                    <View style={styles.btnTxtContainer}>
                        <Text style={styles.btnTxt2}>Accuracy</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnTxt1}>65</Text>
                            <Text style={styles.btnTxt2}> %</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mainBtn} >
                    <View style={styles.btnIconContainer}>
                        <View style={{ width: totalSize(6), height: totalSize(6), borderRadius: 100, backgroundColor: colors.ember, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="checklist" size={totalSize(3)} color='white' type='octicon' />
                        </View>
                    </View>
                    <View style={styles.btnTxtContainer}>
                        <Text style={styles.btnTxt2}>Attempted</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnTxt1}>90</Text>
                            <Text style={styles.btnTxt2}>/100</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.mainBtn, { flex: 1.5 }]} >
                    <View style={[styles.btnIconContainer, { flex: 1, }]}>
                        <Text style={styles.btnTxt1}>95.45</Text>
                        <Text style={styles.btnTxt2}>Best Score</Text>
                    </View>
                    <View style={[styles.btnIconContainer, { flex: 0.25, }]}>
                        <View style={{ width: 1, height: totalSize(15), borderRightWidth: 1, borderRightColor: 'rgb(217,217,217)' }}></View>
                    </View>
                    <View style={[styles.btnIconContainer, { flex: 1, }]}>
                        <Text style={styles.btnTxt1}>35.5</Text>
                        <Text style={styles.btnTxt2}>Average Score</Text>
                    </View>
                </View> */}

            </View>
        );
    }
}

export default TestResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    h2: {
        fontSize: totalSize(2.5),
        color: 'black',
        fontWeight: 'bold',
    },
    mainBtn: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'rgb(217,217,217)',
        //alignItems: 'center'
        // backgroundColor: 'red'
    },
    btnIconContainer: { flex: 2, alignItems: 'center', justifyContent: 'center', },
    btnTxtContainer: { flex: 8, justifyContent: 'center', },
    btnTxt1: { fontSize: totalSize(2.5), color: 'black', fontWeight: 'bold', },
    btnTxt2: { fontSize: totalSize(1.5), color: 'gray' },
    arrowContainer: { width: width(10), height: height(15), alignItems: 'center', justifyContent: 'center' },

})
