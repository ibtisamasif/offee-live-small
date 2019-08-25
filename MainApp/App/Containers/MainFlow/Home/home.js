import React, { Component } from 'react';
import { Platform, View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Dimensions, Picker } from 'react-native';
import images from '../../../Themes/Images';
import colors from '../../../Themes/Colors'
import { Icon } from 'react-native-elements';
import { height, width, totalSize } from 'react-native-dimension';
import Modal from 'react-native-modal'
import RNLockTask from 'react-native-lock-task';

export default class HomeTechnician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finishedTokens: 0,
      pendingTokens: 0,
      onProcessTokens: 0,
      loading_refresh: false,
      isModalVisibleLogout: false
    };
  }
  _toggleModalLogout = () => this.setState({ isModalVisibleLogout: !this.state.isModalVisibleLogout })
  logOut = () => {
    this._toggleModalLogout()
    this.props.navigation.navigate('Auth')
    Storage.removeItem('user');
    Storage.clear();
    RNLockTask.stopLockTask();
  }
  render() {
    return (
      <View style={styles.Container}>
        <View style={{ width: width(90), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent', marginVertical: height(2) }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Icon name='bell' color='gray' type='octicon' size={totalSize(3)} onPress={() => this.props.navigation.navigate('notification')} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Icon name='sign-out' color='gray' type='octicon' size={totalSize(3)} onPress={() => this._toggleModalLogout()} />
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.branchNameContainer}>
            <Text style={styles.branchName}>Max Lee</Text>
          </View>
          <View style={styles.activityContainer}>
            <Text style={styles.activity}>DASHBOARD</Text>
          </View>
          <View style={styles.tokensContainer}>
            <View style={styles.sqareView}>
              <Text style={styles.count}>95/100</Text>
              <Text style={styles.txt}>BEST</Text>
              <Text style={styles.txt}>SCORE</Text>
            </View>
            <View style={styles.sqareView}>
              <Text style={styles.count}>71.5/100</Text>
              <Text style={styles.txt}>AVERAGE</Text>
              <Text style={styles.txt}>SCORE</Text>

            </View>
            <View style={styles.sqareView}>
              <Text style={styles.count}>14</Text>
              <Text style={styles.txt}>ATTEMPTED</Text>
              <Text style={styles.txt}>TESTS</Text>

            </View>
          </View>
          {/* <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('portfolio')} style={styles.btnRed}>
                            <Text style={styles.btnTxt}>My Portfolio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('myServices')} style={styles.btnRed}>
                            <Text style={styles.btnTxt}>My Services</Text>
                        </TouchableOpacity>
                    </View> */}

        </View>


        <View style={styles.shopImageContainer}>
          <Image source={images.profile} style={styles.shopImage} />
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


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.SPA_LightRed,
    alignItems: 'center',
    //opacity:0.5
  },
  searchInputContainer: {
    width: width(80),
    height: height(6),
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 5,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    //marginTop: height(2)
    shadowColor: 'gray',
    shadowOpacity: 0.3,

  },
  searchInput: {
    width: width(75),
  },
  btnRefresh: {
    height: height(6),
    width: width(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
  },
  titelContainer: {
    marginTop: height(3),
    alignItems: 'center'
  },
  titelTxt: {
    fontSize: totalSize(3),
    fontWeight: '500',
    color: 'rgb(0,41,132)'
  },
  shopImageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height(5)
  },
  shopImage: {
    width: totalSize(25),
    height: totalSize(25),
    borderRadius: 200,
    // borderWidth: 2,
    borderColor: 'black',
  },
  lowerContainer: {
    width: width(90),
    height: height(60),
    marginTop: height(17.5),
    borderRadius: 5,
    backgroundColor: 'white',
    //elevation:5

  },
  branchNameContainer: {
    height: height(15),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  branchName: {
    fontSize: totalSize(3),
    fontWeight: 'bold',
    color: 'black'
  },
  activityContainer: {
    marginTop: height(10),
    height: height(6),
    width: width(90),
    borderBottomWidth: 0.5,
    //borderTopWidth: 0.5,
    borderColor: colors.steel,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activity: {
    color: 'gray',
    fontSize: totalSize(2),
    fontWeight: '300'
  },
  tokensContainer: {
    flexDirection: 'row',
    height: height(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  sqareView: {
    height: height(15),
    width: width(25),
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    marginRight: width(1),
    borderBottomWidth: 4,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  tokenTxt: {
    height: height(5),
    width: width(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  count: {
    // color: 'rgb(0,41,132)',
    color: colors.SPA_graycolor,
    fontSize: totalSize(2),
    marginBottom: height(1)
  },
  txt: {
    color: colors.Offeeblue,
    fontSize: totalSize(1.5)
  },
  buttonsContainer: {
    flexDirection: 'row',
    height: height(6),
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnRed: {
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    width: width(40),
    height: height(6),
    backgroundColor: 'rgb(218,21,30)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 3,
    marginRight: width(2)
  },
  btnBlue: {
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    width: width(40),
    height: height(5),
    backgroundColor: 'rgb(0,41,132)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 3,
  },
  btnTxt: {
    color: 'white',
    fontSize: totalSize(2),
    fontWeight: '300'
  },


})


