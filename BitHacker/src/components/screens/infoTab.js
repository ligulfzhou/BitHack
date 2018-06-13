import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  TextInput
} from 'react-native';

import {
  AdMobBanner,
  AdMobInterstitial
} from 'react-native-admob';
import { Navigation } from 'react-native-navigation';
import QACell from '../qaCell';


const infos = [{
  'key': 'question1',
  'q': 'Q: it is real?',
  'a': 'A: YES'
}, {
  'key': 'question2',
  'q': 'Q: is my bitcoin save?',
  'a': 'A: YES'
}, {
  'key': 'question3',
  'q': 'Q: why',
  'a': 'A: bitcoin key pair can generate from number range from 1 to 1.158*10^77, it is a very huge number, iterate all its number is almost impossible'
}]


export default class Infotab extends Component {

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem (item) {
    // return <Text key={item.key}>{item.key}</Text>
    return <QACell key={item.key} qa={item} />
  }

  render() {
    console.log('infos: ................. ' + infos)
    return (
      <View style={ styles.container }>
        <FlatList
          style={ styles.flatList }
          data={ infos }
          contentContainerStyle={{ padding: 3 }}
          ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
          renderItem={ ({item}) => (this.renderItem(item)) }
        />

        <AdMobBanner
          testDevices={[AdMobBanner.simulatorId, 'f3f1e0559573881fc3647836492075a3']}
          adSize="banner"
          style={{ alignSelf: 'center' }}
          adUnitID="ca-app-pub-9174125730777485/4622753094"
          ref={el => (this._basicExample = el)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  flatList:{
    flexGrow: 1,
  },
});
