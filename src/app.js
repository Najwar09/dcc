import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
// import Router from './routes';
import Orientation from 'react-native-orientation-locker';
import Router from './routes';

const app = () => {
  
  useEffect(() => {
    if (Orientation) {
      console.log('Orientation module loaded:', Orientation);
      Orientation.lockToPortrait();
    } else {
      console.error('Orientation module is null');
    }
  }, []);

  return (
    <>
      <Router />
    </>
  );
};

export default app;

const styles = StyleSheet.create({});
