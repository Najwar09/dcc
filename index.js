/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import app from './src/app';
import Splash from './src/pages/Splash';
import KotakLogin from './src/component/KotakLogin';
import Home from './src/pages/Home';
import Router from './src/routes';
import Login from './src/pages/Login';

AppRegistry.registerComponent(appName, () => Home);
