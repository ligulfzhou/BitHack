import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

export default class KeypairCell extends Component {

  render () {
    const privLen = this.props.keypair.priv.length;
    return (
      <View style={ styles.cell }>
        <View style={ styles.row }>
          <Text style={ [styles.text, styles.bontText] }>Private Key: </Text>{ '\n' }
          <Text style={ styles.text }>{ '    ' }{ this.props.keypair.priv.slice(0, 15) }{ '***' }{this.props.keypair.priv.slice(privLen-15, privLen)} </Text>
        </View>
        <Text style={ styles.row }>
          <Text style={ [styles.text, styles.bontText] }>Address: </Text>{ '\n' }
          <Text style={ styles.text }>{ '    ' }{ this.props.keypair.addr }</Text>
        </Text>
        <Text style={ styles.row }>
          <Text style={ [styles.text, styles.bontText] }>Balance: </Text>{ '\n' }
          <Text style={ styles.text }>{ '    ' }{ this.props.keypair.confirmed.toFixed(2) }Btc</Text>
        </Text>
      </View>
    ) 
  }
}
/*
          <Button
            onPress={ ()=>{console.log('...')} }
            title="copy"
            color="#841584"
            style={ styles.genButton }
            accessibilityLabel="Learn more about this purple button"
            />
*/

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
  }
});

// fontSize: 10