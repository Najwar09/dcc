/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import app from './src/app';
import Splash from './src/pages/Splash';
import Login from './src/pages/Splash/Login';
import KotakLogin from './src/component/KotakLogin';

AppRegistry.registerComponent(appName, () => Splash);
