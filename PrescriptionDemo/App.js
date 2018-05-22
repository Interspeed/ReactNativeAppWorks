import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation';


/* Pages for routing */

import PrescriptionForm from './component/PrescriptionForm';
import HomeScreen from './component/HomeScreen';
import AllPrescriptionList from './component/AllPrescriptionList';
import PrescriptionDetails from './component/PrescriptionDetails';


const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    PrescriptionForm: {
      screen: PrescriptionForm,
    },
    PrescriptionList: {
      screen: AllPrescriptionList,
    },
    PrescriptionDetails: {
      screen: PrescriptionDetails,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component {

  render() {
    return <RootStack />;
  }
}
