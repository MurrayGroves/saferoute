import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { Styled } from '@opentripplanner/base-map'
// import BaseMap from '@opentripplanner/base-map'
import { registerRootComponent } from 'expo';
import { ThemeProvider } from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import BaseMap from '@opentripplanner/base-map';


export default function App() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      {/* <Searchbar
        placeholder="Search" value={searchQuery} style={{ 'position': 'absolute', 'top': '2%', 'margin': '5%', 'width': '95%' }} onChangeText={(text) => {
          setSearchQuery(text);
        }} />

      <Text>Open up pee to start working on your app!</Text> */}
      <BaseMap
        // baseLayer={[
        //   `http://100.86.237.92/otp/routers/default/vectorTiles`,
        // ]}
        baseLayerNames={["Streets"]}>
      </BaseMap>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

// registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
