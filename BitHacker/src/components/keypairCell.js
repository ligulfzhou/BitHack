import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Clipboard,
  Linking,
} from 'react-native';


export default class KeypairCell extends Component {

  render () {
    const privLen = this.props.keypair.priv.length;
    return (
      <View style={ styles.cell }>
        <View style={ styles.row }>
          <Text style={ [styles.text, styles.bontText] }>Private Key: </Text>{ '\n' }
          <Text
            style={ styles.text }
            >{ '    ' }{ this.props.keypair.priv.slice(0, 15) }{ '***' }{this.props.keypair.priv.slice(privLen-15, privLen)} </Text>
        </View>
        <Text style={ styles.row }>
          <Text style={ [styles.text, styles.bontText] }>Address: </Text>{ '\n' }
          <Text
            style={ styles.text }
            >{ '    ' }{ this.props.keypair.addr }</Text>
        </Text>
        <Text style={ styles.row }>
          <Text style={ [styles.text, styles.bontText] }>Balance: </Text>{ '\n' }
          <Text style={ [styles.text, styles.redText]  }>{ '    ' }{ this.props.keypair.confirmed.toFixed(2) }BTC</Text>
        </Text>
        <View 
          style={ styles.buttons }>
          <Button
            onPress={ () => {
              Clipboard.setString(this.props.keypair.priv);
              this.props.showToast(); 
             } }
            title="copy private key"
            color="#841584"
            style={ styles.genButton }
            accessibilityLabel="copy_private_key"
          />
          <Button
            onPress={ () => { 
              Linking.openURL("https://blockchain.info/address/" + this.props.keypair.addr);
            } }
            title="view its transactions"
            color="#798493"
            style={ styles.genButton }
            accessibilityLabel="view_its_transaction"
            />
        </View>
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
