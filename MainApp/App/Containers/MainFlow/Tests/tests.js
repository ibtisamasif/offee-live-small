import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { Icon } from 'react-native-elements'
import { height, width, totalSize } from "react-native-dimension";
import colors from "../../../Themes/Colors";
import Modal from "react-native-modal";
import { subjectList, quizActivity, logout } from "../../../backend/ApiAxios";
import Storage from "../../../helper/asyncStorage";
import { StackActions, NavigationActions } from "react-navigation";

_this = null;
export default class Tests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisibleLogout: false
    };
  }

  componentDidMount() {
    _this = this;
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this._toggleModalLogout();
    return true;
  };

  _toggleModalLogout = () =>
    this.setState({ isModalVisibleLogout: !this.state.isModalVisibleLogout });

  async logOut() {
    let user = await Storage.getItem("user");
    let callback = await logout(user);
    if (callback) {
      if (callback.status == "5") {
        this._toggleModalLogout();
        this.props.navigation.navigate("Auth");
        Storage.removeItem("user");
        Storage.clear();
      } else if (
        callback.status == "-3" ||
        callback.status == "-2" ||
        callback.status == "-1"
      ) {
        this.setState({ errorMessage: callback.message });
      }
    }
  };

  render() {
    return (
      <View style={styles.Maincontainer}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: totalSize(2),
              color: "white",
              fontWeight: "bold",
              marginLeft: totalSize(2)
            }}
          >
            Offee
          </Text>
          <View style={styles.headerIconContainer}>
            <Icon name='sign-out' color='white' type='octicon' size={totalSize(3)} onPress={() => this._toggleModalLogout()} />
          </View>
        </View>
        <View style={styles.container}>
          <TestsList />
        </View>

        <Modal
          isVisible={this.state.isModalVisibleLogout} // Logout User
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor="black"
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.5}
        >
          <View
            style={{
              backgroundColor: "white",
              height: height(20),
              width: width(80),
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: totalSize(1.5) }}>
                Are you sure you want to logout?
              </Text>
              <View
                style={{
                  marginTop: height(2),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5
                }}
              >
                <TouchableOpacity
                  onPress={this._toggleModalLogout}
                  style={{
                    height: height(8),
                    width: width(30),
                    backgroundColor: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5
                  }}
                >
                  <Text style={{ fontSize: totalSize(2), color: "white" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View style={{ width: width(2.5) }}></View>
                <TouchableOpacity
                  onPress={() => this.logOut()}
                  style={{
                    height: height(8),
                    width: width(30),
                    backgroundColor: colors.Offeeblue,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5
                  }}
                >
                  <Text style={{ fontSize: totalSize(2), color: "white" }}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export class TestsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      instructionModalVisible: false,
      selectedTest: {},
      tests: [
        {
          id: 1,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "02:30PM 31Aug,2020",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60",
          answered: "300"
        },
        {
          id: 2,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "09:30AM 22Jun,2019",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60",
          answered: "300"
        },
        {
          id: 3,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "04:30PM 05Aug,2020",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60",
          answered: "300"
        },
        {
          id: 4,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "11:30AM 21Aug,2019",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60",
          answered: "300"
        },
        {
          id: 5,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "12:30PM 17Aug,2020",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60",
          answered: "300"
        },
        {
          id: 6,
          test: "IBPS Clerk-Full Mock Test",
          expiry: "02:30PM 25Aug,2019",
          tag: "IBPS Clerk",
          questions: "100",
          Score: "100",
          quiz_duration: "60",
          answered: null
        }
      ]
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let user = await Storage.getItem("user");
    tests = await subjectList(user.cat, user.name);
    this.setState({ loading: false });
    console.log("api data", tests);
    if (tests) {
      this.setState({
        tests: tests
      });
    }
  }

  async quizActivity() {
    quizAct = await quizActivity(this.state.selectedTest);
    console.log("callbackQuizActivity: ", quizAct);
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [
        NavigationActions.navigate({
          routeName: "mcqScreen",
          params: { item: this.state.selectedTest, quizActivity: quizAct }
        })
      ]
    });
    _this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.Maincontainer}>
        <Modal
          visible={this.state.instructionModalVisible}
          transparent
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor="black"
          animationInTiming={250}
          animationOutTiming={250}
          backdropOpacity={0.5}
          style={{ margin: 0 }}
        >
          <View style={styles.MainModalContainer}>
            <View style={{ backgroundColor: "#fff" }}>
              <View
                style={[styles.headerBeginTest, { marginBottom: height(1) }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{
                    fontSize: totalSize(2),
                    color: "white"
                  }}>
                    Begin Test !!
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
                <Text style={{ fontSize: totalSize(2), marginBottom: height(1) }}>
                  Are you sure you want to begin the test ?
                </Text>
              </View>
              <View
                style={{
                  width: width(90)
                }}
              >
                <Text
                  style={[
                    styles.h4,
                    {
                      marginHorizontal: totalSize(1.6),
                      marginTop: totalSize(1)
                    }
                  ]}
                >
                  You won't be able to un-submit the test once you start.
                </Text>
                <Text
                  style={[
                    styles.h4,
                    {
                      marginHorizontal: totalSize(1.6),
                      fontWeight: "bold"
                    }
                  ]}
                >
                  Instructions :
                </Text>
                <View
                  style={{
                    flexWrap: "wrap"
                  }}
                >
                  <Text
                    style={[
                      styles.h4,
                      {
                        marginHorizontal: totalSize(1.6),
                        fontWeight: "bold"
                      }
                    ]}
                  >
                    Do not minimize once you begin the test your activities are
                    monitored
                  </Text>
                </View>
                <View
                  style={{
                    flexWrap: "wrap"
                  }}
                >
                  <Text
                    style={[
                      styles.h4,
                      {
                        marginHorizontal: totalSize(1.6),
                        marginBottom: totalSize(1),
                        fontWeight: "bold"
                      }
                    ]}
                  >
                    Do not use calculator in phone
                  </Text>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() => this.quizActivity()}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "black" }}>Begin Test</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.customButton}
                  onPress={() =>
                    this.setState({
                      instructionModalVisible: !this.state
                        .instructionModalVisible
                    })
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "black" }}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          {this.state.loading === true ? (
            <ActivityIndicator
              style={styles.loading}
              size={"small"}
              color={colors.Offeeblue}
            />
          ) : (
              <View tabLabel="IBPS Clerk">
                {
                  <View style={{ alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {this.state.tests.map((item, key) => {
                        const isAnswered = item.answered;
                        return (
                          <View
                            key={key}
                            style={{
                              width: width(97),
                              backgroundColor: "white",
                              alignItems: "center",
                              marginVertical: totalSize(0.8),
                              marginHorizontal: totalSize(0.5),
                              flexDirection: "row",
                              justifyContent: "space-between",
                              borderRadius: 9,
                              elevation: 2
                            }}
                          >
                            <View
                              style={{
                                //width: width(50),
                                marginLeft: totalSize(1.5)
                              }}
                            >
                              <Text style={[styles.subjectNameText]}>{item.quiz_name}</Text>
                            </View>
                            <View
                              style={{
                                //width: width(30),
                                marginVertical: totalSize(1.5),
                                alignItems: "center"
                              }}
                            >
                              {isAnswered ? (
                                <TouchableOpacity
                                  style={styles.button}
                                  disabled={true}
                                >
                                  <View style={styles.btnTxtContainer}>
                                    <Text style={styles.btnTxt}> SUBMITTED </Text>
                                  </View>
                                </TouchableOpacity>
                              ) : (
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.setState({
                                        instructionModalVisible: true,
                                        selectedTest: item
                                      });
                                    }}
                                    style={styles.button}
                                  >
                                    <View style={styles.btnTxtContainer}>
                                      <Text style={styles.btnTxt}> START </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                }
              </View>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1
  },
  MainModalContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  header: {
    flex: 0.08,
    flexDirection: "row",
    backgroundColor: colors.Offeeblue,
    alignItems: "center"
  },
  headerIconContainer: {
    flex: 1.5,
    alignItems: 'flex-end',
    marginRight: totalSize(2),
    justifyContent: 'center'
},
  container: {
    flex: 1,
    backgroundColor: colors.silver
  },
  h1: {
    fontSize: totalSize(3),
    color: "black",
    fontWeight: "bold"
  },
  subjectNameText: {
    fontSize: totalSize(1.7),
    color: "gray",
    fontWeight: "bold"
  },
  h2: {
    fontSize: totalSize(2),
    color: "gray",
    fontWeight: "bold"
  },
  h3: {
    fontSize: totalSize(2),
    color: "black"
  },
  h4: {
    fontSize: totalSize(1.5),
    color: "gray"
  },
  btnIconContainer: {
    height: height(15),
    width: width(15),
    justifyContent: "center"
  },
  btnTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  button: {
    width: width(36),
    height: height(4),
    marginRight: totalSize(1),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.Offeeblue,
    borderWidth: 1,
    borderRadius: 5
  },
  btnTxt: {
    fontSize: totalSize(1.6),
    color: colors.Offeeblue
  },
  headerBeginTest: {
    height: height(6),
    width: width(90),
    backgroundColor: colors.Offeeblue,
    borderRadius: 2,
    elevation: 2,
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
