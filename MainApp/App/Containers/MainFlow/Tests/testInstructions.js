import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { height, width, totalSize } from 'react-native-dimension'
import colors from '../../../Themes/Colors';
import {quizActivity} from '../../../backend/ApiAxios'

class TestInstructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.getCurrentItem();
    }

    async getCurrentItem() {
        let item = this.props.navigation.getParam("oneSubject");
        console.log('oneSubject:', item)
        if (item) {
            this.setState({
                data: {
                    QUIZ_ID: item.QUIZ_ID,
                    quiz_name: item.quiz_name,
                    quiz_duration: item.quiz_duration,
                    quiz_visibility: item.quiz_visibility
                }
            });
        }
    }

    async quizActivity() {
        quizAct = await quizActivity(this.state.data);
        console.log('callbackQuizActivity: ', quizAct);
        this.props.navigation.navigate('mcqScreen', {item: this.state.data, quizActivity: quizAct})
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.Maincontainer}>
                    <View style={{ marginVertical: height(2) }}>
                        <Text style={styles.h2}> IBPS - Clerk Teat 4 </Text>
                    </View>
                    <View style={{ width: width(80), flexDirection: 'row', marginVertical: height(1) }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.h4, { fontWeight: 'bold' }]}>Duration: {this.state.data.quiz_duration} mins</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <Text style={[styles.h4, { fontWeight: 'bold' }]}>Maximum Marks: 100</Text>
                        </View>
                    </View>
                    <View style={{ width: width(85) }}>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- The test containes single section having 100 questions</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- Each questions has 4 options out of which only one is correct</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- You have to finish the test in 90 minutes</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- Each questions has 4 options out of which only one is correct</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- Try not to guess the answers as there is negative marking</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- You will be awarded 1 mark on each correct answer and 0.33 marks will be deducted on each wrong answer.</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- You can write the test only once</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- Make sure you have completed the test before submitting it</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- I have read all the instructions carefully and have understood them.</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- I agree not to cheat or use unfair means in the examination</Text>
                        <Text style={[styles.h4, { fontWeight: 'normal' }]}>- I understand that using unfair means of any sort for my own or someone else's will lead to my immediate disqualification</Text>

                    </View>
                    <View style={{ marginVertical: height(10) }}>
                        <TouchableOpacity style={styles.botton} onPress={() => this.quizActivity()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.h3, { color: 'white' }]}>Agree and Continue</Text>
                                <Icon name='arrowright' type='antdesign' color='white' size={totalSize(2.5)} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default TestInstructions;

const styles = StyleSheet.create({
    Maincontainer: {
        flex: 1,
        alignItems: 'center',
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
        fontSize: totalSize(1.75),
        color: 'gray',
        marginVertical: height(0.25)
    },
    botton: {
        height: height(6),
        width: width(90),
        backgroundColor: colors.Offeeblue,
        borderRadius: 2,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})