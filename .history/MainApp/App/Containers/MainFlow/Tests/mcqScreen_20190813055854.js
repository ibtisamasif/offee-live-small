import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { height, width, totalSize } from 'react-native-dimension'
import colors from '../../../Themes/Colors';
import CountDown from 'react-native-countdown-component';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal'
import { FlatGrid } from 'react-native-super-grid';
import { getQuestions } from '../../../backend/ApiAxios'

_this = null
class MCQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading_click: false,
            IsModalVisibleQuestions: false,
            IsModalVisibleSubmit: false,
            timeProgress: 5,
            language: false,
            isfav: false,
            quiz: {},
            questions: [
                { id: 1, status: 1 },
                { id: 2, status: 1 },
                { id: 3, status: 2 },
                { id: 4, status: 2 },
                { id: 5, status: 2 },
                { id: 6, status: 2 },
                { id: 7, status: 1 }
            ],
            options: [
                { id: 1, answer: 'Ernest Rutherford', correct: false, isClicked: false },
                { id: 2, answer: 'marie Curie', correct: false, isClicked: false },
                { id: 3, answer: 'John Dalton', correct: false, isClicked: false },
                { id: 4, answer: 'Dmitri Mendeleev', correct: true, isClicked: false },
            ]
        };
    }
    componentDidMount() {
        _this = this
        this.getCurrentItem();
    }

    async getCurrentItem() {
        let quiz = this.props.navigation.getParam("item");
        callback = await getQuestions(quiz.QUIZ_ID);
        if (callback) {
            this.setState({
                quiz: callback,
                questions: callback.questions
                //todo
            })
            console.log('api whole data', callback)
        }
    }

    chooseOption =  (item) => {
        this.setState({ loading_click: true })
        for (let i = 0; i < this.state.options.length; i++) {
            this.state.options[i].isClicked = false
            console.log(this.state.options[i])
        }
        for (let j = 0; j < this.state.options.length; j++) {
            if (item.id == this.state.options[j].id) {
                this.state.options[j].isClicked = true
                console.log(this.state.options[j])
            }
        }
        this.setState({ loading_click: false })
        // console.warn('options===>', this.state.options)
    }

    _toggleModalQuestions = () => this.setState({ IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions })
    _toggleModalSubmit = () => this.setState({ IsModalVisibleSubmit: !this.state.IsModalVisibleSubmit })
    VerifysubmitTest = () => {
        this._toggleModalSubmit()
        // this.props.navigation.replace('testResult')
    }
    submitTest = () => {
        this._toggleModalSubmit()
        this.props.navigation.replace('testResult')
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <View style={styles.header}>
                    <View style={styles.headerIconContainer}>
                        <Progress.Circle progress={this.state.timeProgress} thickness={0} size={totalSize(5)} unfilledColor='gray' color='white' />
                    </View>
                    <View style={{ flex: 5.5, justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'transparent' }}>
                        <View>
                            <CountDown
                                size={totalSize(1.5)}
                                until={parseInt(this.state.quiz.quiz_duration, 10)}
                                onFinish={() => alert('Finished')}
                                digitStyle={{ backgroundColor: 'transparent' }}
                                digitTxtStyle={{ color: 'white' }}
                                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                separatorStyle={{ color: 'white' }}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                showSeparator
                            />
                            <Text style={{ fontSize: totalSize(1.5), color: colors.cloud, left: 8 }}>{this.state.quiz.quiz_name}</Text>
                        </View>
                    </View>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'white', borderRadius: 2.5 }}>
                                        <Text style={[{ marginHorizontal: totalSize(0.5), fontSize: totalSize(1.5), fontWeight: 'bold', color: 'black' }]}>E</Text>
                                    </View>
                                    <Icon name='subdirectory-arrow-left' color='white' size={totalSize(1.5)} type='material' />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name='subdirectory-arrow-right' color='white' size={totalSize(1.5)} type='material' />
                                    <View style={{ backgroundColor: 'white', borderRadius: 2.5 }}>
                                        <View style={{ margin: totalSize(0.25) }}>
                                            <Icon name='hinduism' color='black' size={totalSize(1.5)} type='material-community' />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.headerIconContainer, { backgroundColor: 'transparent' }]} onPress={this._toggleModalQuestions}>
                        <Icon name='menufold' type='antdesign' color='white' size={totalSize(3)} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={{ width: width(100), backgroundColor: 'white', alignItems: 'center', marginVertical: totalSize(1) }}>
                        <View style={{ width: width(90), flexDirection: 'row', marginVertical: totalSize(1) }}>


                            <View style={{ flex: 2, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'gray', width: totalSize(3), height: totalSize(3), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: totalSize(1.2), color: 'white' }}>Q1</Text>
                                </View>
                                <CountDown
                                    size={totalSize(1.5)}
                                    until={parseInt(this.state.quiz.quiz_duration, 10)}
                                    onFinish={() => alert('Time for this question finished')}
                                    digitStyle={{ backgroundColor: 'transparent' }}
                                    digitTxtStyle={{ color: 'gray' }}
                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                    separatorStyle={{ color: 'gray' }}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    showSeparator
                                />
                                <View style={{ width: totalSize(0.5), height: totalSize(3), borderRightWidth: 0.5, borderRightColor: 'gray' }}>
                                </View>
                                <Text style={[styles.h3, { color: 'gray' }]}>  +1.0  </Text>
                                <Text style={[styles.h3, { color: 'gray' }]}>  -0.3  </Text>
                            </View>

                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Icon name='alert-triangle' color='gray' type='feather' size={totalSize(2)} iconStyle={{ marginHorizontal: totalSize(2) }} />
                                <Icon name={this.state.isfav ? 'star' : 'staro'} color='gray' type='antdesign' size={totalSize(2)} onPress={() => this.setState({ isfav: !this.state.isfav })} />
                            </View>



                        </View>
                        <View style={{ width: width(90), marginVertical: totalSize(1.5) }}>
                            <Text style={[styles.h3, { fontWeight: 'normal' }]}>{this.state.questions[0].question_text}</Text>
                        </View>
                    </View>
                    {
                        this.state.options.map((item, key) => {
                            return (
                                <TouchableOpacity key={key} onPress={() => this.chooseOption(item)} style={{ width: width(100), borderWidth: 1, borderColor: item.isClicked ? 'black' : 'white', alignItems: 'center', marginTop: totalSize(1) }}>
                                    <View style={{ width: width(90), marginVertical: totalSize(2), flexDirection: 'row' }}>
                                        <View style={{ flex: 0.1 }}>
                                            <Text style={[styles.h3, { fontWeight: 'normal', color: 'gray' }]}>{item.id}.</Text>
                                        </View>
                                        <View style={{ flex: 0.9 }}>
                                            <Text style={[styles.h3, { fontWeight: 'normal' }]}>{item.answer}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('mcqScreen')} style={{ width: width(100), marginVertical: totalSize(1), backgroundColor: colors.Offeeblue, alignItems: 'center' }}>
                        <View style={{ marginVertical: totalSize(2) }}>
                            <Text style={[styles.h3, { color: 'white' }]}>Next Question</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._toggleModalSubmit} style={{ width: width(100), backgroundColor: colors.Offeeblue, marginVertical: totalSize(1), alignItems: 'center' }}>
                        <View style={{ marginVertical: totalSize(2.5) }}>
                            <Text style={[styles.h3, { color: 'white' }]}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={this.state.IsModalVisibleQuestions} // Show all quesions
                    animationIn='slideInRight'
                    animationOut='slideOutRight'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}
                    width={width(95)}
                    height={height(100)}
                    onBackdropPress={this._toggleModalQuestions}
                    style={{ alignItems: 'flex-end', justifyContent: 'center' }}
                >
                    <View style={{ backgroundColor: 'white', height: height(100), width: width(80) }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: .1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <View style={{ width: width(70), backgroundColor: 'transparent', alignItems: 'flex-start' }}>
                                    <Icon name='menuunfold' type='antdesign' color='black' size={totalSize(3)} onPress={this._toggleModalQuestions} />
                                </View>
                            </View>
                            <View style={{ flex: .7, backgroundColor: 'transparent' }}>
                                <View style={{ flex: 2, backgroundColor: 'transparent' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent' }}>
                                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name='ios-checkmark-circle' type='ionicon' size={totalSize(3)} color={colors.Quizblue} />
                                        </View>
                                        <View style={{ flex: 3.5, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={[styles.h4, {}]} >Attempted</Text>
                                        </View>
                                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name='ios-star' type='ionicon' size={totalSize(3)} color={colors.Offeeblue} />
                                        </View>
                                        <View style={{ flex: 3.5, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={[styles.h4, {}]} >Marked for Review</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderBottomColor: colors.steel }}>
                                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name='md-remove-circle' type='ionicon' size={totalSize(3)} color='gray' />
                                        </View>
                                        <View style={{ flex: 3.5, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={[styles.h4, {}]} >Unattempted</Text>
                                        </View>
                                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ height: totalSize(3), width: totalSize(3), backgroundColor: 'white', borderWidth: 1, borderColor: colors.silver, borderRadius: 100 }}>
                                                <Icon name='eye-off' type='material-community' size={totalSize(2.5)} color={colors.silver} />
                                            </View>
                                        </View>
                                        <View style={{ flex: 3.5, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={[styles.h4, {}]} >Unseen</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', width: width(75), alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                            <Icon name='ios-checkmark-circle' type='ionicon' size={totalSize(2)} color={colors.Quizblue} />
                                            <Text style={styles.h4}> 02</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                            <Icon name='ios-star' type='ionicon' size={totalSize(2)} color={colors.Offeeblue} />
                                            <Text style={styles.h4}> 50</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                            <Icon name='md-remove-circle' type='ionicon' size={totalSize(2)} color='gray' />
                                            <Text style={styles.h4}> 08</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                            <View style={{ height: totalSize(2), width: totalSize(2), backgroundColor: 'white', borderWidth: 1, borderColor: colors.silver, borderRadius: 100 }}>
                                                <Icon name='eye-off' type='material-community' size={totalSize(1.5)} color={colors.silver} />
                                            </View>
                                            <Text style={styles.h4}> 40</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 7, backgroundColor: 'transparent' }}>
                                    <FlatGrid
                                        itemDimension={totalSize(5)}
                                        items={this.state.questions}
                                        renderItem={({ item }) => (
                                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                                <TouchableOpacity onPress={this._toggleModalQuestions} style={{ height: totalSize(4), width: totalSize(4), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: item.status === 1 ? colors.Quizblue : item.status === 2 ? colors.Offeeblue : item.status === 3 ? 'gray' : colors.silver, borderRadius: 100 }}>
                                                    <Text style={{}}>{item.id}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                <TouchableOpacity onPress={() => this.VerifysubmitTest()} style={{ height: height(7.5), width: width(75), backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
                                    <Text style={[styles.h3, { color: 'white' }]}>Submit Test</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.IsModalVisibleSubmit} // signup
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}>
                    <View style={{ backgroundColor: 'white', height: height(70), width: width(95), alignSelf: 'center', borderRadius: 5 }}>
                        <View style={{ flex: 1 }}>

                            <View style={{ flex: .1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <View style={{ width: width(80) }}>
                                    <Text style={[styles.h3]}>Test Submission</Text>
                                </View>
                            </View>
                            <View style={{ flex: .6, backgroundColor: 'transparent' }}>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderBottomColor: colors.steel }}>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name='ios-alarm' type='ionicon' size={totalSize(3.5)} color='gray' />
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.h4, {}]} >Time Left</Text>
                                    </View>
                                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.h3, { color: colors.Offeeblue }]}>01:05:54</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderBottomColor: colors.steel }}>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name='ios-checkmark-circle' type='ionicon' size={totalSize(3.5)} color='gray' />
                                    </View>
                                    <View style={{ flex: 6, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.h4, {}]} >Attempted</Text>
                                    </View>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.h3, {}]}>75</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent', borderBottomWidth: 0.5, borderBottomColor: colors.steel }}>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name='md-remove-circle' type='ionicon' size={totalSize(3.5)} color='gray' />
                                    </View>
                                    <View style={{ flex: 6, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.h4, {}]} >Unattempted</Text>
                                    </View>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.h3, {}]}>25</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent' }}>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name='ios-star' type='ionicon' size={totalSize(3.5)} color='gray' />
                                    </View>
                                    <View style={{ flex: 6, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.h4, {}]} >Marked</Text>
                                    </View>
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.h3, {}]}>5</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                <View style={{ width: width(80) }}>
                                    <Text style={styles.h3}>Are you sure you want to Submit the test?</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: width(80), marginTop: totalSize(1) }}>
                                    <TouchableOpacity onPress={() => this.submitTest()} style={{ height: height(6), width: width(20), backgroundColor: colors.Offeeblue, alignItems: 'center', justifyContent: 'center', borderRadius: 2.5 }}>
                                        <Text style={[styles.h3, { color: 'white' }]}>Yes</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: width(5) }}></View>
                                    <TouchableOpacity onPress={this._toggleModalSubmit} style={{ height: height(6), width: width(20), backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', borderRadius: 2.5 }}>
                                        <Text style={[styles.h3, { color: 'white' }]}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

export default MCQ;

const styles = StyleSheet.create({
    MainContainer: {
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
        flex: .9,
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
        color: 'black',
        fontWeight: 'bold',
    },
    h4: {
        fontSize: totalSize(1.5),
        color: 'gray',

        //marginVertical: height(0.5)
    },
    button: {
        height: height(6),
        width: width(90),
        backgroundColor: colors.Offeeblue,
        borderRadius: 2,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
