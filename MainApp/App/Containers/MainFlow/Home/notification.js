import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { totalSize } from 'react-native-dimension';
import colors from '../../../Themes/Colors';
import { Icon } from 'react-native-elements';
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static navigationOptions = {
    title: 'Notifications'
  }
  render() {
    return (
      <View style={styles.container}>
        <Icon name='bell' color={colors.steel} type='octicon' size={totalSize(4)} />
        <Text style={styles.txt}> No Older Notifications </Text>
      </View>
    );
  }
}

export default Notification;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    marginTop: 10,
    fontSize: totalSize(2),
  }
})