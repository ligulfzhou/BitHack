import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SectionList,
  Alert,
  Modal,
  TouchableHighlight,
  AlertIOS,
  Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { fetchPageNKeypairs } from '../../actions/keypair';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import KeypairCell from '../keypairCell';
import { AdMobBanner } from 'react-native-admob';
import Toast from 'react-native-easy-toast';


class Searchtab extends Component {
  constructor(props){
    super(props)

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    const { dispatch } = this.props;
    dispatch(fetchPageNKeypairs(1))

    this.state = {
      promptVisible: true,
      page: 1
    }
  }

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../img/pagego.png'), // for icon button, provide the local image asset name
        id: 'add', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: 'blue', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
        Alert.alert('NavBar', 'Edit button pressed');
      }
      if (event.id == 'add') {
        AlertIOS.prompt(
          'Enter Page',
          'Page range 1 ~ 14474011154664524427946373126085988481658748083205070504932198000989141204992',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: (page) => { 
                console.log('go to page: ' + page);
                this.setState({
                  page: page
                })
                this.props.dispatch(fetchPageNKeypairs(page));
              },
            },
          ],
        );
      }
    }
  }

  goToNextPage() {
    var nextPage = this.state.page + 1
    this.setState({
      page: nextPage
    })
    this.props.dispatch(fetchPageNKeypairs(nextPage))
  }

  renderItem(item, index, section) {
    console.log(section)
    if (section['title']=='ad') {
      return  <AdMobBanner
          testDevices={[AdMobBanner.simulatorId, 'f3f1e0559573881fc3647836492075a3']}
          adSize="banner"
          style={{ alignSelf: 'center' }}
          adUnitID="ca-app-pub-9174125730777485/8571303636"
          ref={el => (this._basicExample = el)}
        />
    } else {
      return <KeypairCell
                keypair={item}
                key={item.priv}
                showToast={
                  () => { this.refs.searchToast.show('private key copied', 500, ()=>{
                    console.log('close toast');
                  })}
                }/> ;
    }
  }

  renderSectionHeader(title) {
    if (title == 'ad') {
      return <Text style={{fontWeight: 'bold', backgroundColor: 'white'}}> ad </Text>
    } else {
      return <Text style={{fontWeight: 'bold', backgroundColor: 'white'}}>key pairs created with number {title}</Text>
    }
  }

  render() {
    console.log(this.props.pageNKeypairs)
    var keypairs = this.props.pageNKeypairs[this.state.page] || []
    console.log('key pairs: ' + keypairs)

    if (keypairs.length > 5) {
      keypairs.splice(4, 0, {
        'title': 'ad',
        'data': [{'ad': 1}]
      })
      keypairs.splice(0, 0, {
        'title': 'ad',
        'data': [{'ad': 1}]
      })
    }
    return (
      <View style={styles.container}>
        <Spinner visible={ this.props.pageNKeypairs.isFetching } textContent={ "Loading..." } textStyle={{ color: '#FFF' }} />
        <SectionList
          style={styles.sectionList}
          sections={ keypairs }
          renderItem={ ({item, index, section}) => this.renderItem(item, index, section)}
          renderSectionHeader={ ({section: {title}}) => this.renderSectionHeader(title) }
          keyExtractor={(item, index) => item + index}
          onEndReached={() => { console.log('end reached'); console.log('TODO: 这种方式有问题, 估计是中间夹杂广告的原因') }}
          />
        <Toast ref='searchToast' position='center' />
        <Button
          onPress={ this.goToNextPage.bind(this) }
          title="GO TO NEXT PAGE"
          color="#841584"
          style={ styles.genButton }
          accessibilityLabel="goToNextPage"
          />
      </View>
    );
  }
}

export default connect(
  state => ({
    pageNKeypairs: state.pageNKeypairs
  })
)(Searchtab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sectionList: {
    alignSelf: 'stretch'
  }, 
});
