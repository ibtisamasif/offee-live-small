import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image
} from "react-native";
import { height, width, totalSize } from "react-native-dimension";
import { CheckBox } from "react-native-elements";
import { login } from "../../backend/ApiAxios";
import Storage from "../../helper/asyncStorage";
import images from "../../Themes/Images";
import colors from "../../Themes/Colors";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      overlayVisible: false,
      userType: "user",
      isModalVisibleForgetPassword: false,
      IsModalVisibleSelectSignUp: false,
      icEye: "visibility-off",
      showPassword: false,
      errorMessage: ""
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.showPassword) {
      newState = {
        icEye: "visibility",
        showPassword: false,
        password: this.state.password
      };
    } else {
      newState = {
        icEye: "visibility-off",
        showPassword: true,
        password: this.state.password
      };
    }
    this.setState(newState);
  };
  handlePassword = password => {
    let newState = {
      icEye: this.state.icEye,
      showPassword: this.state.showPassword,
      password: password
    };
    this.setState(newState);
  };

  static navigationOptions = {
    header: null
  };

  _toggleModalForgetPassword = () =>
    this.setState({
      isModalVisibleForgetPassword: !this.state.isModalVisibleForgetPassword
    });

  _toggleModalSelectSignUp = () =>
    this.setState({
      IsModalVisibleSelectSignUp: !this.state.IsModalVisibleSelectSignUp
    });

  manageOverlay = () =>
    this.setState({ overlayVisible: !this.state.overlayVisible });

  async onLoginFunc() {
    const { username, password } = this.state;
    if (username == "" || password == "") {
      this.setState({
        errorMessage: "User Id and password fields cannot be empty"
      });
    } else {
      this.setState({ loading: true });
      let callback = await login(username, password);
      this.setState({ loading: false });

      if (callback) {
        if (callback.status == "5") {
          Storage.setItem("user", callback);
          this.props.navigation.navigate("App");
        } else if (
          callback.status == "-3" ||
          callback.status == "-2" ||
          callback.status == "-1"
        ) {
          this.setState({ errorMessage: callback.message });
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.lowerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                width: width(95),
                alignItems: "center",
                backgroundColor: "transparent",
                marginTop: height(5)
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Image source={images.textLogo} style={styles.logo} />
              </View>
              <View style={styles.InputContainer}>
                <TextInput
                  onChangeText={value => this.setState({ username: value })}
                  placeholder="USER ID"
                  placeholderTextColor="rgb(217,217,217)"
                  underlineColorAndroid="transparent"
                  style={styles.txtInput}
                />
              </View>

              <View style={styles.InputContainer}>
                <TextInput
                  placeholder="PASSWORD"
                  placeholderTextColor="rgb(217,217,217)"
                  underlineColorAndroid="transparent"
                  style={styles.txtInputPassword}
                  onChangeText={this.handlePassword}
                  label={this.props.label}
                  value={this.state.password}
                  onChangeText={this.handlePassword}
                  secureTextEntry={!this.state.showPassword}
                  labelActiveColor={componentColors.password_icon_color}
                  labelColor={componentColors.password_icon_color}
                  placeholderColor={componentColors.password_icon_color}
                  underlineColor={componentColors.password_icon_color}
                  underlineActiveColor={componentColors.password_icon_color}
                  underlineActiveHeight={2}
                  underlineHeight={1}
                />
              </View>
              <View style={{ width: "100%" }}>
                <CheckBox
                  title="Show password"
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderWidth: 0
                  }}
                  textStyle={{ fontSize: totalSize(2), fontWeight: "normal" }}
                  size={totalSize(3)}
                  checked={this.state.showPassword}
                  checkedColor={colors.Offeeblue}
                  onPress={() =>
                    this.setState({
                      showPassword: !this.state.showPassword
                    })
                  }
                />
                <View>
                  <Text
                    style={[
                      {
                        fontSize: totalSize(2),
                        color: colors.Offeeblue,
                        marginLeft: totalSize(2)
                      }
                    ]}
                  >
                    {this.state.errorMessage}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onLoginFunc()}
                >
                  <View style={styles.btnTxtContainer}>
                    {this.state.loading === true ? (
                      <ActivityIndicator
                        size={"small"}
                        color={colors.Offeeblue}
                      />
                    ) : (
                        <Text style={styles.btnTxt}>LOG IN</Text>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  txt: {
    marginTop: height(2.5),
    fontSize: totalSize(2),
    color: "black"
  },
  logo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height(4),
    marginLeft: height(2),
    height: totalSize(15),
    width: totalSize(26)
  },
  txtInput: {
    width: width(80),
    height: height(6),
    fontSize: totalSize(2)
  },
  txtInputPassword: {
    width: width(80),
    height: height(6),
    fontSize: totalSize(2)
  },
  lowerContainer: {
    flex: 1,
    alignItems: "center"
  },
  btnTxtContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  btnTxt: {
    fontSize: totalSize(2.2),
    color: colors.Offeeblue
  },
  InputContainer: {
    flexDirection: "row",
    width: width(90),
    height: height(7),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2.5,
    marginVertical: height(2),
    borderBottomWidth: 1,
    borderColor: colors.Offeeblue
  },
  button: {
    width: width(90),
    height: height(5),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.Offeeblue,
    borderWidth: 1,
    marginVertical: height(3),
    borderRadius: 2.5
  }
});
export const componentColors = {
  password_icon_color: "#9E9E9E"
};
