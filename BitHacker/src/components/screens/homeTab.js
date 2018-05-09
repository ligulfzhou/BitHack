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
  AdMobRewarded,
  AdMobInterstitial,
  PublisherBanner
} from 'react-native-admob';

import Spinner from 'react-native-loading-spinner-overlay';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { fetchKeypair } from '../../actions/keypair';
import KeypairCell from '../keypairCell';


class Hometab extends Component {

  constructor(props) {
    super(props)
    this.onPressFetchKeyPair = this.onPressFetchKeyPair.bind(this);

    const { dispatch } = this.props;
    dispatch(fetchKeypair(1))
    this.state = {
      'number': 1
    }
  }

  componentDidMount() {
  }

  onPressFetchKeyPair() {
    console.log('generate new')
    this.setState({
      'number': this.state.number+1
    })
    var number = this.state.number;
    this.props.dispatch(fetchKeypair(number));
  }

  fetchNKeypair(number=1) {
    const { dispatch } = this.props;
    dispatch(fetchKeypair(number))
  }

  render() {
    var data = this.props.keypairs
    var dataList = []
    if (data) {
      var dataItems = data.items;
      for (var i=0; i<dataItems.length; i++) {
        dataItems[i].key = dataItems[i].priv;
      }
      
      dataList = dataItems; 
    }
    return (
      <View style={ styles.container }>
        <AdMobBanner
          adSize="banner"
          style={{ alignSelf: 'center' }}
          adUnitID="ca-app-pub-9174125730777485/9899062320"
          ref={el => (this._basicExample = el)}
        />
        <View style={ styles.form }> 
          <TextInput
            style={ styles.numberInput }
            placeholder="Type a number"
            keyboardType={ 'numeric' }
            onChangeText={ (text) => { this.setState({number: text }); console.log(text)} }
            />
          <Button
            onPress={ this.onPressFetchKeyPair }
            title="generate"
            color="#841584"
            style={ styles.genButton }
            accessibilityLabel="generate"
            />
        </View>
        <Spinner visible={ this.props.keypairs.isFetching } textContent={ "Loading..." } textStyle={{ color: '#FFF' }} />
        <FlatList
          data={ dataList }
          contentContainerStyle={{ padding: 3 }}
          ItemSeparatorComponent={() => <View style={{ margin: 3 }} />}
          renderItem={({ item }) => <KeypairCell keypair={item} key={item.priv} />}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    keypairs: state.keypairs
  })
)(Hometab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  form: {
    padding: 10,
  },
  numberInput: {
    height: 40,
    alignSelf: "stretch",
    borderWidth: 1,
  },
  genButton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  flatList:{
    flexGrow: 1,
  },
  spinner: {
    marginBottom: 50
  },
});
