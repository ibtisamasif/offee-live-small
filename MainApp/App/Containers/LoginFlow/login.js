import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Image } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension';
import { Icon, Overlay, CheckBox } from 'react-native-elements'
//import store from '../../Stores/orderStore'
//import api from '../../lib/api'
import { login } from '../../backend/ApiAxios';
import Storage from '../../helper/asyncStorage'
import Modal from 'react-native-modal'
import images from '../../Themes/Images';
import colors from '../../Themes/Colors'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            overlayVisible: false,
            checked: true,
            userType: 'user',
            isModalVisibleForgetPassword: false,
            IsModalVisibleSelectSignUp: false,
            icEye: 'visibility-off',
            showPassword: true
        };
    }

    changePwdType = () => {
        let newState;
        if (this.state.showPassword) {
            newState = {
                icEye: 'visibility',
                showPassword: false,
                password: this.state.password
            }
        } else {
            newState = {
                icEye: 'visibility-off',
                showPassword: true,
                password: this.state.password
            }
        }
        this.setState(newState)
    };
    handlePassword = (password) => {
        let newState = {
            icEye: this.state.icEye,
            showPassword: this.state.showPassword,
            password: password
        }
        this.setState(newState);
    };

    static navigationOptions = {
        header: null
    }

    _toggleModalForgetPassword = () =>
        this.setState({ isModalVisibleForgetPassword: !this.state.isModalVisibleForgetPassword });

    _toggleModalSelectSignUp = () =>
        this.setState({ IsModalVisibleSelectSignUp: !this.state.IsModalVisibleSelectSignUp });

    manageOverlay = () => this.setState({ overlayVisible: !this.state.overlayVisible })

    // goto_signup = () => {
    //     this.props.navigation.navigate('signup')
    //     this._toggleModalSelectSignUp()
    // }

    async onLoginFunc() {
        const { username, password } = this.state;
        if (username == '' || password == '') {
            alert('Email and password fields cannot be empty')
        }
        else {
            this.setState({ loading: true });
            let callback = await login(username, password);
            this.setState({ loading: false });

            console.log('callback', callback);

            if (callback) {
                if (callback.status == "5") {
                    Storage.setItem('user', callback)
                    this.props.navigation.navigate('App');
                } else if (callback.status == "-3" || callback.status == "-2" || callback.status == "-1") {
                    alert(callback.message);
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.lowerContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1, width: width(95), alignItems: 'center', backgroundColor: 'transparent', marginTop: height(5) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Image source={images.icon} style={styles.logo} />
                                <Text style={{ fontSize: totalSize(1.5), color: 'gray', fontWeight: 'bold' }}>Live</Text>
                            </View>
                            <View style={[styles.txtContainer]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(5), color: colors.redColor }]}>Offee</Text>
                            </View>
                            <View style={[styles.txtContainer]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(3), color: colors.Offeeblue }]}>Login</Text>
                            </View>
                            {/* <View style={[styles.txtContainer, { flexDirection: 'row' }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(1.5), fontWeight: 'normal' }]}>DON'T HAVE AN ACCOUNT? </Text>
                                <TouchableOpacity onPress={() => this._toggleModalSelectSignUp()}>
                                    <Text style={[styles.welcome, { fontSize: totalSize(1.5), color: colors.Offeeblue, fontWeight: 'normal' }]}>SIGN UP!</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={styles.InputContainer}>
                                <Icon name='email' color='gray' size={totalSize(3)} />
                                <TextInput
                                    onChangeText={(value) => this.setState({ username: value })}
                                    placeholder='EMAIL'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                />
                            </View>
                            <View style={styles.InputContainer}>
                                <Icon name='lock' color='gray' size={totalSize(3)} />
                                <TextInput
                                    placeholder='PASSWORD'
                                    placeholderTextColor='rgb(217,217,217)'
                                    underlineColorAndroid='transparent'
                                    style={styles.TxtInput}
                                    onChangeText={this.handlePassword}
                                    label={this.props.label}
                                    value={this.state.password}
                                    onChangeText={this.handlePassword}
                                    secureTextEntry={this.state.showPassword}
                                    labelActiveColor={componentColors.password_icon_color}
                                    labelColor={componentColors.password_icon_color}
                                    placeholderColor={componentColors.password_icon_color}
                                    underlineColor={componentColors.password_icon_color}
                                    underlineActiveColor={componentColors.password_icon_color}
                                    underlineActiveHeight={2}
                                    underlineHeight={1}
                                />
                                <Icon style={styles.icon}
                                    name={this.state.icEye}
                                    size={totalSize(3)}
                                    color={componentColors.password_icon_color}
                                    onPress={this.changePwdType}
                                />
                            </View>
                            {/* <View style={[styles.InputContainer, { backgroundColor: 'transparent', elevation: 0, justifyContent: 'flex-start', marginVertical: height(1) }]}>
                                <CheckBox
                                    title='Client'
                                    iconType='material-community'
                                    checkedIcon='checkbox-marked-circle'
                                    uncheckedIcon='checkbox-blank-circle-outline'
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    textStyle={{ fontSize: totalSize(1.8), fontWeight: 'normal' }}
                                    size={totalSize(2.5)}
                                    checked={this.state.checked}
                                    checkedColor={colors.SPA_redColor}
                                    onPress={() => this.setState({
                                        checked: true,
                                        userType: 'user'
                                    })}
                                />
                                <CheckBox
                                    title='Technician'
                                    iconType='material-community'
                                    checkedIcon='checkbox-marked-circle'
                                    uncheckedIcon='checkbox-blank-circle-outline'
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    textStyle={{ fontSize: totalSize(1.8), fontWeight: 'normal' }}
                                    size={totalSize(2.5)}
                                    checked={!this.state.checked}
                                    checkedColor={colors.SPA_redColor}
                                    onPress={() => this.setState({
                                        checked: false,
                                        userType: 'company'
                                    })}
                                />
                            </View> */}
                            {/* <View style={[styles.InputContainer, { borderColor: 'transparent', justifyContent: 'flex-end', marginVertical: 0 }]}>
                                <Text style={[styles.welcome, { fontSize: totalSize(1.5), color: colors.Offeeblue }]} onPress={() => this._toggleModalForgetPassword()} >Forgot Password?</Text>
                            </View> */}
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => this.onLoginFunc()}>
                                    <View style={styles.btnTxtContainer}>
                                        {
                                            this.state.loading === true ?
                                                <ActivityIndicator size={'small'} color='white' />
                                                :
                                                <Text style={styles.btnTxt}>Login</Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    isVisible={this.state.isModalVisibleForgetPassword} // Forget Password
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={700}
                    animationOutTiming={700}
                    backdropOpacity={0.50}>
                    <View style={{ backgroundColor: 'white', height: height(35), width: width(95), alignSelf: 'center', borderRadius: 5 }}>
                        {
                            this.state.LoadingForgetPassword === true ?
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator color={colors.SPA_redColor} size={totalSize(5)} />
                                </View>
                                :
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <TouchableOpacity onPress={this._toggleModalForgetPassword} style={{ backgroundColor: 'Transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
                                            <Icon
                                                name='close' color={colors.redColor} />
                                        </TouchableOpacity>
                                        <View style={{ width: 5 }}></View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={[styles.welcome, { fontSize: totalSize(3), color: colors.Offeeblue }]}>Forget Password</Text>
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            onChangeText={(value) => this.setState({ username: value })}
                                            placeholder='Email Address'
                                            placeholderTextColor='gray'
                                            keyboardType={'email-address'}
                                            value={this.state.username}
                                            style={{ width: width(85), height: height(7), marginVertical: height(1), borderRadius: 2.5, paddingLeft: width(4), fontSize: totalSize(2), borderWidth: 1, borderColor: colors.Offeeblue }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <TouchableOpacity style={[styles.button, { height: height(6), width: width(40) }]}>
                                            <Text style={{ fontSize: totalSize(2), color: 'white' }}>Send</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.IsModalVisibleSelectSignUp} // signup
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}>
                    <View style={{ backgroundColor: 'white', height: height(35), width: width(95), alignSelf: 'center', borderRadius: 5 }}>
                        {
                            this.state.LoadingForgetPassword === true ?
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator color={colors.SPA_redColor} size={totalSize(5)} />
                                </View>
                                :
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <TouchableOpacity onPress={this._toggleModalSelectSignUp} style={{ backgroundColor: 'Transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }}>
                                            <Icon name='close' color={colors.SPA_redColor} />
                                        </TouchableOpacity>
                                        <View style={{ width: 5 }}></View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2.5) }]}>Register Your Free</Text>
                                        <Text style={[styles.welcome, { fontSize: totalSize(2.5) }]}>Account</Text>
                                    </View>
                                    {/* <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                            <Text style={[styles.welcome, { fontSize: totalSize(3), color: colors.Offeeblue }]} onPress={() => this.goto_signup()}>Sign Up Now</Text>
                                        </View>
                                    </View> */}
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        {/* <TouchableOpacity  style={[styles.button, { height: height(6), width: width(40) }]}>
                                            <Text style={{ fontSize: totalSize(2), color: 'white' }}>Send</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                        }
                    </View>
                </Modal>

            </View>
        );
    }
}

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width: null,
        //height: null,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: 'rgb(66,67,69)'

    },
    txt: {
        marginTop: height(2.5),
        fontSize: totalSize(2),
        color: 'black'
        //color: 'rgb(219,0,0)'
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: height(2),
        height: totalSize(20),
        width: totalSize(12.5)
    },
    TxtInput: {
        width: width(70),
        height: height(6),
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: 'red',
        fontSize: totalSize(1.5),
        //color: 'rgb(217,217,217)'
        //color: 'rgb(180,210,53)',
        //marginVertical:height(2),
        //borderRadius: 25,
    },
    lowerContainer: {
        flex: 1,
        // width: width(100),
        //height: null,
        //justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgb(245,245,238)',
        //backgroundColor: 'rgb(217,217,217)'
        // backgroundColor: 'rgb(0,173,238)'
        //backgroundColor:'rgb(180,210,53)'
        //marginTop: height(10)
    },
    txtContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //marginVertical: height(3)
        marginVertical: height(2),
    },
    welcome: {
        fontSize: totalSize(5),
        //textAlign: 'center',
        //margin: 10,
        color: 'black',
        fontWeight: 'bold',
        //opacity: 0.6
    },
    instructions: {
        fontSize: totalSize(2),
        textAlign: 'center',
        color: 'rgb(66,67,69)',
        //color: 'rgb(217,217,217)',
        //marginBottom: 5,
    },
    btnTxtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontSize: totalSize(2.5),
        color: 'white',

    },

    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'black'
    },
    InputContainer: {
        flexDirection: 'row',
        width: width(80),
        height: height(7),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        // backgroundColor: 'white',
        //marginBottom: height(1),
        // elevation: 2,
        borderRadius: 2.5,
        marginVertical: height(2),
        borderWidth: 1,
        //borderColor: 'rgb(180,210,53)'
        borderColor: colors.Offeeblue

    },
    button: {
        width: width(80),
        height: height(7),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'rgb(180,210,53)',
        //backgroundColor: 'rgb(0,173,238)',
        backgroundColor: colors.Offeeblue,
        marginVertical: height(5),
        elevation: 5,
        borderRadius: 2.5,

    },


});
export const componentColors = {
    password_icon_color: '#9E9E9E',
};