import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


export default class QACell extends Component {

  render () {
    return (
      <View style={ styles.cell }>
          <Text style={ [styles.text, styles.bontText] }>{ this.props.qa.q }</Text>
          <Text style={ [styles.text, styles.bontText] }>{ this.props.qa.a }</Text>
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'grey',
    padding: 3,
    margin: 3
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: 44,
  },
  text: {
    fontSize: 15
  },
  bontText: {
    fontWeight: 'bold'
  },
  redText: {
    color: 'red'
  },
  genButton: {
    borderColor: 'red',
    borderWidth: 2
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
