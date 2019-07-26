import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../../../Themes/Colors';
import { totalSize } from 'react-native-dimension';

class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name="file-document-box-multiple-outline" color='gray' size={totalSize(7)} type='material-community' />
      <Text style={{color:'gray',fontSize:totalSize(2)}}>All reading material will show here</Text>
    </View>
    );
  }
}

export default Read;
