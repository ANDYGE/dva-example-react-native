/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import dva, { connect } from 'dva/mobile';

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const app = dva();
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add(state) { return state + 1 },
  },
  effects: {
    *addDelay(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'add' });
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({type: 'add'});
    },
  },
});

const App = connect(({ count }) => ({ count }))((props) => {
  const { dispatch, count } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Count: { count }
      </Text>
      <TouchableHighlight onPress={() => { dispatch({ type: 'count/add' }) }}>
        <Text>Add</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => { dispatch({ type: 'count/addDelay' }) }}>
        <Text>Delay Add</Text>
      </TouchableHighlight>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

app.router(() => <App />);

AppRegistry.registerComponent('DvaExampleReactNative', () => app.start());
