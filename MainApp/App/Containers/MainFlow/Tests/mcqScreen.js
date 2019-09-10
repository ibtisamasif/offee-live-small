import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements'
import { height, width, totalSize } from 'react-native-dimension'
import colors from '../../../Themes/Colors';
import CountDown from 'react-native-countdown-component';
// import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal'
import { FlatGrid } from 'react-native-super-grid';
import { getQuestions, submitAnswers } from '../../../backend/ApiAxios'
import { normalize } from '../../../helper/normalizeFont'

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
            selected_option: "",
            quiz: {},
            questions: [
                {
                    id: 0,
                    question_text: 'what is your name',
                    question_options: [
                        { id: 1, option_text: 'Ernest Rutherford', correct: false, isClicked: false },
                        { id: 2, option_text: 'marie Curie', correct: false, isClicked: false },
                        { id: 3, option_text: 'John Dalton', correct: false, isClicked: false },
                        { id: 4, option_text: 'Dmitri Mendeleev', correct: true, isClicked: false },
                    ],
                    status: 1,
                    isMark: false,
                },
                {
                    id: 1,
                    question_text: 'what is your age',
                    question_options: [
                        { id: 1, option_text: 'Ernest Rutherford', correct: false, isClicked: false },
                        { id: 2, option_text: 'marie Curie', correct: false, isClicked: false },
                        { id: 3, option_text: 'John Dalton', correct: false, isClicked: false },
                        { id: 4, option_text: 'Dmitri Mendeleev', correct: true, isClicked: false },
                    ],
                    status: 2,
                    isMark: true,
                },
                {
                    id: 2,
                    question_text: 'what is your gender',
                    question_options: [
                        { id: 1, option_text: 'Ernest Rutherford', correct: false, isClicked: false },
                        { id: 2, option_text: 'marie Curie', correct: false, isClicked: false },
                        { id: 3, option_text: 'John Dalton', correct: false, isClicked: false },
                        { id: 4, option_text: 'Dmitri Mendeleev', correct: true, isClicked: false },
                    ],
                    status: 3,
                    isMark: false,
                },
                {
                    id: 3,
                    question_text: '',
                    question_options: ""
                }
            ],
            index: 0
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
            })
            console.log('api whole data', callback)
        }
        this.addIdToQuestionsArray()
    }

    addIdToQuestionsArray() {
        for (let i = 0; i < this.state.questions.length; i++) {
            this.state.questions[i].id = i + 1
        }
    }

    clearSelection() {
        this.state.selected_option = null
        this.state.questions[this.state.index].status = null
    }

    setMark() {
        var quesions = { ...this.state.questions }
        quesions[this.state.index].isMark = !this.state.questions[this.state.index].isMark;
        this.setState({ quesions })
    }

    chooseOption = async (item) => {
        this.setState({ loading_click: true })
        for (let i = 0; i < this.state.questions[this.state.index].question_options.length; i++) {
            this.state.questions[this.state.index].question_options[i].isClicked = false
            // console.log(this.state.questions[this.state.index].question_options[i])
        }
        for (let j = 0; j < this.state.questions[this.state.index].question_options.length; j++) {
            if (item.id == this.state.questions[this.state.index].question_options[j].id) {
                this.state.questions[this.state.index].question_options[j].isClicked = true
                // console.log(this.state.questions[this.state.index].question_options[j])
                this.state.selected_option = this.state.questions[this.state.index].question_options[j].id

                //mark as attempted / unattempted
                if (!this.state.selected_option) {
                    this.state.questions[this.state.index].status = 3
                } else {
                    //todo if none of the options were selected (case needs to be handled)
                    this.state.questions[this.state.index].question_answer = this.state.selected_option
                    this.state.questions[this.state.index].status = 1
                }
            }
        }
        this.setState({ loading_click: false })
        // console.warn('options===>', this.state.questions[this.state.index].question_options)
    }

    goToNext = () => {
        if (this.state.questions[this.state.index].status === 1) {
            //do nothing
            // console.log('1')
        } else if (this.state.questions[this.state.index].status === 2) {
            //do nothing
            // console.log('2')
        } else if (this.state.questions[this.state.index].status === 3) {
            //do nothing
            // console.log('3')
        } else {
            // console.log('none')
            this.state.questions[this.state.index].status = 3
        }
        this.setState({ index: (this.state.index + 1) % this.state.questions.length });
    }

    goToPrevious = () => {
        this.setState({ index: (this.state.index - 1) % this.state.questions.length });
    }

    moveToSpecificQuestion = (index) => {
        this.setState({
            IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions,
            index: (index) % this.state.questions.length
        })
    }

    _toggleModalQuestions = () => this.setState({ IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions })
    _toggleModalSubmit = () => this.setState({ IsModalVisibleSubmit: !this.state.IsModalVisibleSubmit })

    async verifysubmitTest() {
        this._toggleModalSubmit()

        let quizActivity = this.props.navigation.getParam("quizActivity");
        // console.log("quizActivity: ", quizActivity.user_activity)
        // console.log("QuestionsArray: ", this.state.questions)

        let callback = await submitAnswers(this.state.quiz.id, quizActivity.user_activity, this.state.questions);
        console.log("callback", callback)
        if (callback) {
            if (callback.status = "0") {
                this.props.navigation.replace('testResult')
            }
        }
    }

    // submitTest = () => {
    //     this._toggleModalSubmit()
    //     if (!this.state.selected_option) {
    //         this.state.questions[this.state.index].status = 3
    //     } else {
    //         //todo if none of the options were selected (case needs to be handeled)
    //         this.state.questions[this.state.index].question_answer = this.state.selected_option
    //         this.state.questions[this.state.index].status = 1
    //     }
    // }

    render() {
        var countAttempted = 0
        for (const [index, value] of this.state.questions.entries()) {
            // console.log(value);
            if (value.status === 1) {
                countAttempted++
            }
        }
        var countMarkedForReview = 0
        for (const [index, value] of this.state.questions.entries()) {
            // console.log(value);
            if (value.isMark) {
                countMarkedForReview++
            }
        }
        var countUnAttempted = 0
        for (const [index, value] of this.state.questions.entries()) {
            // console.log(value);
            if (value.status === 3) {
                countUnAttempted++
            }
        }
        var countUnSeen = 0
        for (const [index, value] of this.state.questions.entries()) {
            // console.log(value);
            if (!value.status) {
                countUnSeen++
            }
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.MainContainer}>
                    <View style={styles.header}>
                        {/* <View style={styles.headerIconContainer}>
                            <Progress.Circle progress={this.state.timeProgress} thickness={0} size={totalSize(5)} unfilledColor='gray' color='white' />
                        </View> */}
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
                        {/* <View style={styles.headerIconContainer}>
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
                    </View> */}
                        <TouchableOpacity style={[styles.headerIconContainer, { backgroundColor: 'transparent' }]} onPress={this._toggleModalQuestions}>
                            <Icon name='menufold' type='antdesign' color='white' size={totalSize(3)} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <View style={{ width: width(100), backgroundColor: 'white', alignItems: 'center', marginVertical: totalSize(1) }}>
                            <View style={{ width: width(90), flexDirection: 'row', marginVertical: totalSize(1) }}>
                                <View style={{ flex: 2, backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: 'gray', width: totalSize(3), height: totalSize(3), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: totalSize(1.2), color: 'white' }}>Q{this.state.questions[this.state.index].id}</Text>
                                    </View>
                                    {/* <CountDown
                                    size={totalSize(1.5)}
                                    until={parseInt(this.state.quiz.quiz_duration, 10)/this.state.questions.length}
                                    onFinish={() => alert('Time for this question finished')}
                                    digitStyle={{ backgroundColor: 'transparent' }}
                                    digitTxtStyle={{ color: 'gray' }}
                                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                                    separatorStyle={{ color: 'gray' }}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{ m: null, s: null }}
                                    showSeparator
                                /> */}
                                    <View style={{ width: totalSize(0.5), height: totalSize(3), borderRightWidth: 0.5, borderRightColor: 'gray' }}>
                                    </View>
                                    <Text style={[styles.h3, { color: 'gray' }]}>  +1.0  </Text>
                                    <Text style={[styles.h3, { color: 'gray' }]}>  -0.3  </Text>
                                </View>

                                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Icon name={this.state.questions[this.state.index].isMark ? 'star' : 'staro'} color='gray' type='antdesign' size={totalSize(2)} onPress={() => this.setMark()} />
                                </View>
                                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Icon name={'closecircleo'} color='gray' type='antdesign' size={totalSize(2)} onPress={() => this.clearSelection()} />
                                </View>
                            </View>

                            <View style={{ width: width(90), marginVertical: totalSize(1.5) }}>
                                <Text style={[styles.h3, { fontWeight: 'normal' }]}>
                                    {
                                        this.state.questions[this.state.index].question_text
                                    }
                                </Text>
                            </View>
                        </View>

                        {
                            this.state.questions[this.state.index].question_options.map((item, key) => {
                                return (
                                    <TouchableOpacity key={key} onPress={() => this.chooseOption(item)} style={{ width: width(100), borderWidth: 1, borderColor: item.isClicked ? 'black' : 'white', backgroundColor: item.isClicked ? colors.transparentBlue : 'white', alignItems: 'center', marginTop: totalSize(1) }}>
                                        <View style={{ width: width(90), marginVertical: totalSize(2), flexDirection: 'row' }}>
                                            <View style={{ flex: 0.1 }}>
                                                {/* <Text style={[styles.h3, { fontWeight: 'normal', color: 'gray' }]}>{item.id}.</Text> */}
                                            </View>
                                            <View style={{ flex: 0.9 }}>
                                                <Text style={[styles.h3, { fontWeight: 'normal' }]}>{item.option_text}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                        <TouchableOpacity onPress={() => this.goToNext()} style={{ width: width(100), marginVertical: totalSize(1), backgroundColor: colors.Offeeblue, alignItems: 'center' }}>
                            <View style={{ marginVertical: totalSize(2) }}>
                                <Text style={[styles.h3, { color: 'white' }]}>Next Question</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goToPrevious()} style={{ width: width(100), marginVertical: totalSize(1), backgroundColor: colors.Offeeblue, alignItems: 'center' }}>
                            <View style={{ marginVertical: totalSize(2) }}>
                                <Text style={[styles.h3, { color: 'white' }]}>Previous Question</Text>
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
                                                <Icon name='ios-star' type='ionicon' size={totalSize(3)} color={colors.redColor} />
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
                                                <Text style={styles.h4}>
                                                    {
                                                        countAttempted
                                                    }
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                                <Icon name='ios-star' type='ionicon' size={totalSize(2)} color={colors.redColor} />
                                                <Text style={styles.h4}>
                                                    {
                                                        countMarkedForReview
                                                    }
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                                <Icon name='md-remove-circle' type='ionicon' size={totalSize(2)} color='gray' />
                                                <Text style={styles.h4}>
                                                    {
                                                        countUnAttempted
                                                    }
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
                                                <View style={{ height: totalSize(2), width: totalSize(2), backgroundColor: 'white', borderWidth: 1, borderColor: colors.silver, borderRadius: 100 }}>
                                                    <Icon name='eye-off' type='material-community' size={totalSize(1.5)} color={colors.silver} />
                                                </View>
                                                <Text style={styles.h4}>
                                                    {
                                                        countUnSeen
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flex: 7, backgroundColor: 'transparent' }}>
                                        <FlatGrid
                                            itemDimension={totalSize(5)}
                                            items={this.state.questions}
                                            renderItem={({ item }) => (
                                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                                    <TouchableOpacity onPress={() => this.moveToSpecificQuestion(item.id - 1)} style={styles.getCircleStyle(item)}>
                                                        <Text style={{ height: totalSize(2.9), width: totalSize(3), fontSize: normalize(12), alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderWidth: 1, borderColor: colors.silver, borderRadius: 100 }}>
                                                            {
                                                                item.id
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: .2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                                    <TouchableOpacity onPress={() => this.verifysubmitTest()} style={{ height: height(7.5), width: width(75), backgroundColor: colors.Offeeblue, alignItems: 'center', justifyContent: 'center', borderRadius: 2 }}>
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
                                            <Icon name='ios-checkmark-circle' type='ionicon' size={totalSize(3.5)} color='gray' />
                                        </View>
                                        <View style={{ flex: 6, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={[styles.h4, {}]} >Attempted</Text>
                                        </View>
                                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={[styles.h3, {}]}>{countAttempted}</Text>
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
                                            <Text style={[styles.h3, {}]}>{countUnAttempted}</Text>
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
                                            <Text style={[styles.h3, {}]}>{countMarkedForReview}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: .3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <View style={{ width: width(80) }}>
                                        <Text style={styles.h3}>Are you sure you want to Submit the test?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: width(80), marginTop: totalSize(1) }}>
                                        <TouchableOpacity onPress={() => this.verifysubmitTest()} style={{ height: height(6), width: width(20), backgroundColor: colors.Offeeblue, alignItems: 'center', justifyContent: 'center', borderRadius: 2.5 }}>
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
            </SafeAreaView>
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
    },
    getCircleStyle(item) {
        console.log('item', item)
        if (item.isMark) {
            return {
                height: totalSize(4.6), width: totalSize(4.6), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 100, borderColor: colors.redColor
            }
        } else {
            return {
                height: totalSize(4.6), width: totalSize(4.6), alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 100, borderColor: item.status === 1 ? colors.Quizblue : item.status === 3 ? colors.silver : colors.silver,
            }
        }
    }
})
