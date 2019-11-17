import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    BackHandler,
    ToastAndroid,
    ActivityIndicator,
    AppState
} from "react-native";
import { Icon } from "react-native-elements";
import { height, width, totalSize } from "react-native-dimension";
import colors from "../../../Themes/Colors";
import CountDown from "react-native-countdown-component";
import Modal from "react-native-modal";
import { FlatGrid } from "react-native-super-grid";
import Storage from "../../../helper/asyncStorage";
import { getQuestions, submitAnswers, userActivity } from "../../../backend/ApiAxios";
_this = null;
class MCQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            loading: false,
            IsModalVisibleQuestions: false,
            IsModalVisibleSubmit: false,
            timeProgress: 5,
            language: false,
            quiz: {},
            questions: [
                {
                    id: 1,
                    question_id: "c0bebaf1daf1ba20cb3167eb3be2eb9f",
                    question_text: "what is your name",
                    question_options: [
                        {
                            id: 1,
                            option_number: 1,
                            option_text: "Ernest Rutherford",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 2,
                            option_number: 2,
                            option_text: "marie Curie",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 3,
                            option_number: 3,
                            option_text: "John Dalton",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 4,
                            option_number: 4,
                            option_text: "Dmitri Mendeleev",
                            correct: true,
                            isClicked: false
                        }
                    ],
                    status: 1,
                    isMark: false,
                },
                {
                    id: 2,
                    question_id: "c0bebaf1daf1ba20cb3167eb3be2eb9f",
                    question_text: "what is your age",
                    question_options: [
                        {
                            id: 1,
                            option_number: 1,
                            option_text: "Ernest Rutherford",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 2,
                            option_number: 2,
                            option_text: "marie Curie",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 3,
                            option_number: 3,
                            option_text: "John Dalton",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 4,
                            option_number: 4,
                            option_text: "Dmitri Mendeleev",
                            correct: true,
                            isClicked: false
                        }
                    ],
                    status: 2,
                    isMark: false,
                },
                {
                    id: 3,
                    question_id: "c0bebaf1daf1ba20cb3167eb3be2eb9f",
                    question_text: "what is your gender",
                    question_options: [
                        {
                            id: 1,
                            option_number: 1,
                            option_text: "Ernest Rutherford",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 2,
                            option_number: 2,
                            option_text: "marie Curie",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 3,
                            option_number: 3,
                            option_text: "John Dalton",
                            correct: false,
                            isClicked: false
                        },
                        {
                            id: 4,
                            option_number: 4,
                            option_text: "Dmitri Mendeleev",
                            correct: true,
                            isClicked: false
                        }
                    ],
                    status: 3,
                    isMark: false,
                },
                {
                    id: 4,
                    question_id: "",
                    question_text: "",
                    question_options: ""
                }
            ],
            index: 0
        };
    }

    componentDidMount() {
        _this = this;
        this.getCurrentItem();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackPress
        );
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        this.backHandler.remove();
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    handleBackPress = () => {
        ToastAndroid.show(
            "Please finish your exam before trying to leave the current page",
            ToastAndroid.SHORT
        );
        return true;
    };

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            ToastAndroid.show(
                "This will be counted as minimized",
                ToastAndroid.SHORT
            );
            userActivity()
        }
        this.setState({ appState: nextAppState });
    }

    async userActivity() {
        let quiz = this.props.navigation.getParam("item");
        let user = await Storage.getItem("user");
        let callback = await userActivity(quiz.QUIZ_ID, user.name);
        // if (callback) {
        //     if (callback.status == "5") {
        //         // do nothing
        //     }
        // }
    }

    async getCurrentItem() {
        this.setState({ loading: true });
        let quiz = this.props.navigation.getParam("item");
        let user = await Storage.getItem("user");
        let callback = await getQuestions(quiz.QUIZ_ID, user.name);
        this.setState({ loading: false });
        if (callback) {
            this.setState({
                quiz: callback,
                questions: callback.questions
                // loading: false
            });
            console.log("api whole data", callback);
        }
        this.addIdToQuestionsArray();
    }

    addIdToQuestionsArray() {
        for (let i = 0; i < this.state.questions.length; i++) {
            this.state.questions[i].id = i + 1;
            for (
                let j = 0;
                j < this.state.questions[i].question_options.length;
                j++
            ) {
                this.state.questions[i].question_options[j].option_number = j + 1;
            }
        }
        this.setState({
            questions: this.state.questions
        });
    }

    clearSelection() {
        for (
            let i = 0;
            i < this.state.questions[this.state.index].question_options.length;
            i++
        ) {
            this.state.questions[this.state.index].question_options[
                i
            ].isClicked = false;
        }
        var quesions = { ...this.state.questions };
        quesions[this.state.index].status = null;
        quesions[this.state.index].selected_option = null;
        this.setState({ quesions });
    }

    setMark() {
        var quesions = { ...this.state.questions }
        quesions[this.state.index].isMark = !this.state.questions[this.state.index].isMark;
        this.setState({ quesions })
    }

    chooseOption = async item => {
        for (
            let i = 0;
            i < this.state.questions[this.state.index].question_options.length;
            i++
        ) {
            this.state.questions[this.state.index].question_options[
                i
            ].isClicked = false;
        }
        for (
            let j = 0;
            j < this.state.questions[this.state.index].question_options.length;
            j++
        ) {
            if (
                item.id == this.state.questions[this.state.index].question_options[j].id
            ) {
                this.state.questions[this.state.index].question_options[
                    j
                ].isClicked = true;
                var selected_option = this.state.questions[this.state.index]
                    .question_options[j].id;

                if (!selected_option) {
                    //mark as seen
                    this.state.questions[this.state.index].status = 3;
                } else {
                    //mark as attempted
                    this.state.questions[
                        this.state.index
                    ].question_answer = selected_option;
                    this.state.questions[this.state.index].status = 1;
                }
                this.setState({});
            }
        }
    }

    goToNext = () => {
        //mark as seen before moving if no previous status was set
        if (
            !this.state.questions[this.state.index].status === 1 &&
            !this.state.questions[this.state.index].status === 2 &&
            !this.state.questions[this.state.index].status === 3
        ) {
            this.state.questions[this.state.index].status = 3;
        }
        this.setState({
            index: (this.state.index + 1) % this.state.questions.length
        });
    };

    goToPrevious = () => {
        if (this.state.index > 0) {
            this.setState({
                index: (this.state.index - 1) % this.state.questions.length
            });
        }
    };

    moveToSpecificQuestion = index => {
        //mark as seen before moving if no previous status was set
        if (
            !this.state.questions[this.state.index].status === 1 &&
            !this.state.questions[this.state.index].status === 2 &&
            !this.state.questions[this.state.index].status === 3
        ) {
            this.state.questions[index].status = 3;
        }
        this.setState({
            IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions,
            index: index % this.state.questions.length
        });
    };

    _toggleModalQuestions = () =>
        this.setState({
            IsModalVisibleQuestions: !this.state.IsModalVisibleQuestions
        });
    _toggleModalSubmit = () =>
        this.setState({
            IsModalVisibleSubmit: !this.state.IsModalVisibleSubmit
        });

    verifysubmitTest = () => {
        this._toggleModalSubmit();
    };

    async submitTest() {
        var arr = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            var question_id = this.state.questions[i].question_id
            var answer_id = "";
            if (this.state.questions[i].question_answer === "") {

            } else {
                answer_id = this.state.questions[i].question_answer
            }
            var obj = {
                ['question_id']: question_id,
                ['answer_id']: answer_id
            }
            arr.push(obj);
        }

        this.setState({
            loading: true,
            IsModalVisibleQuestions: false
        });
        let quizActivity = this.props.navigation.getParam("quizActivity");
        let callback = await submitAnswers(
            this.state.quiz.id,
            quizActivity.user_activity,
            arr
        );
        this.setState({ loading: false });
        console.log("callback", callback);
        if (callback) {
            if (callback.status = "0") {
                ToastAndroid.show('Successfully submitted', ToastAndroid.SHORT);
                this.props.navigation.replace("drawer");
            }
        }
    };

    render() {

        var countAttempted = 0
        for (const [index, value] of this.state.questions.entries()) {
            if (value.status === 1) {
                countAttempted++
            }
        }
        // var countMarkedForReview = 0
        // for (const [index, value] of this.state.questions.entries()) {
        //     if (value.isMark) {
        //         countMarkedForReview++
        //     }
        // }
        var countUnAttempted = 0
        countUnAttempted = this.state.questions.length - countAttempted

        // var countUnSeen = 0
        // for (const [index, value] of this.state.questions.entries()) {
        //     if (!value.status) {
        //         countUnSeen++
        //     }
        // }
        // countUnSeen = countUnSeen - 1

        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.state.loading === true ? (
                    <ActivityIndicator
                        style={styles.loading}
                        size={"small"}
                        color={colors.Offeeblue}
                    />
                ) : (
                        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <View
                                        style={{
                                            flex: 5.5,
                                            justifyContent: "center",
                                            alignItems: "flex-start",
                                            backgroundColor: colors.Offeeblue
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <CountDown
                                                size={totalSize(2)}
                                                until={parseInt(this.state.quiz.quiz_duration, 10)}
                                                onFinish={() => alert("Finished")}
                                                digitStyle={{ backgroundColor: "transparent" }}
                                                digitTxtStyle={{ color: "white" }}
                                                timeLabelStyle={{ color: "red", fontWeight: "bold" }}
                                                separatorStyle={{ color: "white" }}
                                                timeToShow={["H", "M", "S"]}
                                                timeLabels={{ m: null, s: null }}
                                                showSeparator
                                            />
                                            <Text
                                                style={{
                                                    fontSize: totalSize(2.6),
                                                    color: "white",
                                                    left: 8
                                                }}
                                            >
                                                {this.state.quiz.quiz_name}
                                            </Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.headerIconContainer,
                                            { backgroundColor: colors.Offeeblue }
                                        ]}
                                        onPress={this._toggleModalQuestions}
                                    >
                                        <Icon
                                            name="menufold"
                                            type="antdesign"
                                            color="white"
                                            size={totalSize(3)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.container}>
                                    <View
                                        style={{
                                            width: width(100),
                                            backgroundColor: "white",
                                            alignItems: "center"
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: width(96),
                                                marginTop: totalSize(1),
                                                marginBottom: totalSize(0.5),
                                                borderWidth: 1,
                                                alignItems: "center",
                                                borderRadius: 5,
                                                borderColor: "gray"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: totalSize(2.3),
                                                    color: "grey",
                                                    margin: totalSize(0.5)
                                                }}
                                            >
                                                Q.{this.state.questions[this.state.index].id}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                width: width(96),
                                                borderWidth: 1,
                                                borderRadius: 5,
                                                borderColor: "gray"
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    {
                                                        fontWeight: "normal",
                                                        fontSize: totalSize(2.1),
                                                        color: "grey",
                                                        margin: totalSize(0.3)
                                                    }
                                                ]}
                                            >
                                                {this.state.questions[this.state.index].question_text}
                                            </Text>
                                        </View>
                                    </View>

                                    {this.state.questions[this.state.index].question_options.map(
                                        (item, key) => {
                                            return (
                                                <View
                                                    style={{
                                                        width: width(100),
                                                        backgroundColor: "white",
                                                        alignItems: "center"
                                                    }}
                                                    key={key}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => this.chooseOption(item)}
                                                        style={{
                                                            width: width(94),
                                                            borderWidth: 1,
                                                            borderRadius: 5,
                                                            marginLeft: totalSize(1),
                                                            marginRight: totalSize(1),
                                                            marginTop: totalSize(2),
                                                            borderColor: "grey",
                                                            backgroundColor: item.isClicked
                                                                ? colors.green
                                                                : "white"
                                                        }}
                                                    >
                                                        <Text
                                                            style={[
                                                                {
                                                                    fontWeight: "normal",
                                                                    fontSize: totalSize(1.6),
                                                                    color: "black",
                                                                    margin: totalSize(0.7)
                                                                }
                                                            ]}
                                                        >
                                                            {item.option_text}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        }
                                    )}

                                    <View
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: totalSize(1),
                                            justifyContent: "flex-end"
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={styles.previousNextButton}
                                                onPress={() => this.clearSelection()}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                        {'Clear Selection '}
                                                    </Text>
                                                    <Icon name={'closecircleo'} color='gray' type='antdesign' size={totalSize(2)} onPress={() => this.clearSelection()} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.previousNextButton}
                                                onPress={() => this.setMark()}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                        {this.state.questions[this.state.index].isMark ? 'UnMark ' : 'Mark '}
                                                    </Text>
                                                    <Icon name={this.state.questions[this.state.index].isMark ? 'star' : 'staro'} color='gray' type='antdesign' size={totalSize(2)} onPress={() => this.setMark()} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={styles.previousNextButton}
                                                onPress={() => this.goToPrevious()}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                        Previous
                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={styles.previousNextButton}
                                                onPress={() => this.goToNext()}
                                            >
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center" }}
                                                >
                                                    <Text style={[styles.h3, { color: colors.Offeeblue }]}>
                                                        Next
                        </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <Modal
                                    isVisible={this.state.IsModalVisibleQuestions} // Show all quesions
                                    animationIn="slideInRight"
                                    animationOut="slideOutRight"
                                    backdropColor="black"
                                    animationInTiming={500}
                                    animationOutTiming={500}
                                    backdropOpacity={0.5}
                                    width={width(95)}
                                    height={height(100)}
                                    onBackdropPress={this._toggleModalQuestions}
                                    onBackButtonPress={this._toggleModalQuestions}
                                    style={{ alignItems: "flex-end", justifyContent: "center" }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: "white",
                                            height: height(100),
                                            width: width(80)
                                        }}
                                    >
                                        <View style={{ flex: 1 }}>
                                            <View
                                                style={{
                                                    height: totalSize(8),
                                                    paddingLeft: totalSize(1.2),
                                                    paddingTop: totalSize(0.5),
                                                    backgroundColor: colors.Offeeblue,
                                                    alignItems: "flex-start",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                <Icon
                                                    name="menuunfold"
                                                    type="antdesign"
                                                    color="white"
                                                    size={totalSize(4)}
                                                    onPress={this._toggleModalQuestions}
                                                />
                                            </View>

                                            <View style={{ flex: 1, backgroundColor: "transparent" }}>
                                                <FlatGrid
                                                    itemDimension={totalSize(5)}
                                                    items={this.state.questions}
                                                    renderItem={({ item }) => {
                                                        if (item.isMark) {
                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() =>
                                                                        this.moveToSpecificQuestion(item.id - 1)
                                                                    }
                                                                >
                                                                    <Icon name={'star'} color='gray' type='antdesign' size={totalSize(4)} />
                                                                </TouchableOpacity>
                                                            )
                                                        } else {
                                                            return (
                                                                <TouchableOpacity
                                                                    onPress={() =>
                                                                        this.moveToSpecificQuestion(item.id - 1)
                                                                    }
                                                                    style={styles.getCircleStyle(item, this.state.index)}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: totalSize(2),
                                                                            textAlign: "center",
                                                                            color: "black"
                                                                        }}
                                                                    >
                                                                        {item.id}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    flex: 0.2,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "transparent"
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => this.verifysubmitTest()}
                                                    style={{
                                                        height: height(7.5),
                                                        width: width(75),
                                                        borderWidth: 1,
                                                        borderColor: colors.Offeeblue,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        borderRadius: 4
                                                    }}
                                                >
                                                    <Text style={[styles.h3]}>SUBMIT</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>

                                    <Modal
                                        isVisible={this.state.IsModalVisibleSubmit} // sumbit
                                        animationIn="slideInUp"
                                        animationOut="slideOutDown"
                                        backdropColor="black"
                                        animationInTiming={500}
                                        animationOutTiming={500}
                                        backdropOpacity={0.5}
                                    >
                                        <View style={styles.MainModalContainer}>
                                            <View style={{ backgroundColor: "#fff" }}>
                                                <View
                                                    style={[
                                                        styles.headerSubmitDialog,
                                                        { marginBottom: height(1) }
                                                    ]}
                                                >
                                                    <View
                                                        style={{ flexDirection: "row", alignItems: "center" }}
                                                    >
                                                        <Text style={[styles.h2, { color: "white" }]}>
                                                            Confirm Submit!!
                        </Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        width: width(90),
                                                        alignItems: "center",
                                                        borderBottomWidth: 0.6
                                                    }}
                                                >
                                                    <Text style={[styles.h3, { marginBottom: height(1) }]}>
                                                        Are you sure you want to submit the test ?
                      </Text>
                                                </View>
                                                <View style={{ width: width(90) }}>
                                                    <Text
                                                        style={[
                                                            styles.h4,
                                                            {
                                                                marginHorizontal: totalSize(1.6),
                                                                marginTop: totalSize(0.6)
                                                            }
                                                        ]}
                                                    >
                                                        Total No of Questions: {this.state.questions.length}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            styles.h4,
                                                            {
                                                                marginHorizontal: totalSize(1.6),
                                                                marginTop: totalSize(0.6)
                                                            }
                                                        ]}
                                                    >
                                                        No of questions attempted: {countAttempted}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            styles.h4,
                                                            {
                                                                marginHorizontal: totalSize(1.6),
                                                                marginTop: totalSize(0.6),
                                                                marginBottom: totalSize(2)
                                                            }
                                                        ]}
                                                    >
                                                        No of questions skipped: {countUnAttempted}
                                                    </Text>
                                                </View>

                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-around"
                                                    }}
                                                >
                                                    <TouchableOpacity
                                                        style={styles.customButton}
                                                        onPress={() => this.submitTest()}
                                                    >
                                                        <View
                                                            style={{ flexDirection: "row", alignItems: "center" }}
                                                        >
                                                            <Text style={[styles.h3]}>Yes,Submit Test</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.customButton}
                                                        onPress={this._toggleModalSubmit}
                                                    >
                                                        <View
                                                            style={{ flexDirection: "row", alignItems: "center" }}
                                                        >
                                                            <Text style={[styles.h3]}>No,Continue Test</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                </Modal>
                            </View>
                        </ScrollView>
                    )}
            </SafeAreaView>
        );
    }
}

export default MCQ;

const styles = StyleSheet.create({
    MainModalContainer: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: "rgba(0,0,0,0.4)"
    },
    header: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "black"
    },
    headerIconContainer: {
        flex: 1.5,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        minHeight: totalSize(77)
    },
    h1: {
        fontSize: totalSize(3),
        color: "black",
        fontWeight: "bold"
    },
    h2: {
        fontSize: totalSize(2),
        color: "gray",
        fontWeight: "bold"
    },
    h3: {
        fontSize: totalSize(1.6),
        color: "black"
    },
    h4: {
        fontSize: totalSize(1.5),
        color: "gray"
    },
    button: {
        width: width(30),
        height: height(4),
        marginRight: totalSize(1),
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.Offeeblue,
        borderWidth: 1,
        borderRadius: 5
    },
    headerSubmitDialog: {
        height: height(6),
        width: width(90),
        backgroundColor: colors.Offeeblue,
        borderRadius: 2,
        elevation: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    previousNextButton: {
        height: height(6),
        width: width(47.5),
        marginBottom: totalSize(0.5),
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    customButton: {
        height: height(6),
        width: width(43),
        marginBottom: totalSize(0.5),
        borderColor: colors.Offeeblue,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    getCircleStyle(item, index) {
        if (item.isMark) {
            return {
                height: totalSize(4.6),
                width: totalSize(4.6),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 100,
                borderColor: colors.redColor,
                backgroundColor: item.status === 1 ? colors.green : item.id === index + 1 ? colors.Quizblue : colors.transparent
            }
        } else {
            return {
                height: totalSize(4),
                width: totalSize(4),
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderRadius: 100,
                borderColor: "gray",
                backgroundColor: item.status === 1 ? colors.green : item.id === index + 1 ? colors.Quizblue : colors.transparent
            }
        }
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
});
