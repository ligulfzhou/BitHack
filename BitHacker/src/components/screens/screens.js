import { Navigation } from 'react-native-navigation';
import Login from './login';
import HomeTab from './homeTab';
import SearchTab from './searchTab';
import InfoTab from './infoTab';


export default (store, Provider) =>  {
	Navigation.registerComponent('ReactNativeReduxExample.Login', () => Login, store, Provider);
	Navigation.registerComponent('ReactNativeReduxExample.HomeTab', () => HomeTab, store, Provider);
	Navigation.registerComponent('ReactNativeReduxExample.SearchTab', () => SearchTab, store, Provider);
	Navigation.registerComponent('ReactNativeReduxExample.InfoTab', () => InfoTab, store, Provider);
}