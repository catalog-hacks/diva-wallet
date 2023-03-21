import React, {Children, useEffect, useState} from 'react';
import {Alert, Button, Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-get-random-values';
import './shim';
import {Buffer} from '@craftzdog/react-native-buffer';
import Wallet from './src/components/myWallet';
import Solana from './src/components/solana';
import {BitcoinProviderAS} from './src/components/bitcoin';
//@ts-ignore
global.Buffer = Buffer;
const mnemonic =
  'doctor mask legal clay seed riot recipe today since supreme load accuse';
const privateKey =
  '0xe5594b4814ce6485455096a3937ac4fb96d04598543ff895072a28d1ec81e894';
// const Stack = createNativeStackNavigator();
// const bb=new BitcoinProviderAS(privateKey);
// const bal=bb.getBalance();

const LoadingScreen = () => (
  <View
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    }}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={{marginTop: 50, color: 'black'}}>App is Opening...</Text>
  </View>
);
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWallet, setShowWallet] = useState(false);
  const [showSolana, setSolona] = useState(false);
  useEffect(() => {
    // Simulate an API call or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}>
      <>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <View>
            <Text style={{fontSize: 30, fontWeight: '400', color: 'orange'}}>
              Hello,Welcome to DivaMask
            </Text>
            <Button
              title="Show Wallet"
              onPress={() => setShowWallet(!showWallet)}
            />
            {/* {setTimeout(() => {
              setIsLoading(false);
            }, 5000) && <Wallet/>} */}
            {showWallet ? (
              <>
                {setTimeout(() => {
                  setIsLoading(false);
                }, 5000) && <Wallet />}
              </>
            ) : (
              <></>
            )}

{showSolana ? (
              <>
                {setTimeout(() => {
                  setIsLoading(false);
                }, 5000) && <Solana />}
              </>
            ) : (
              <></>
            )}
          </View>
        )}
      </>
    </View>
  );
}

export default App;
