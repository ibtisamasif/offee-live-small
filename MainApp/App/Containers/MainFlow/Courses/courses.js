import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../../../Themes/Colors';
import { totalSize } from 'react-native-dimension';
import Chalkboard from 'react-native-vector-icons/FontAwesome5'
class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Chalkboard name="chalkboard" color='gray' size={totalSize(7)} />
        <Text style={{color:'gray',fontSize:totalSize(2)}}>No Courses are available</Text>
      </View>
    );
  }
}

export default Courses;
