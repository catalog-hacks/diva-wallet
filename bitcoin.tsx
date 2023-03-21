import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import  CryptoAccount  from 'send-crypto';
import axios from 'axios';
import { ethers} from 'ethers';
// import 'react-native-get-random-values';
const mnemonic =
  'doctor mask legal clay seed riot recipe today since supreme load accuse';
  
  function BTC() {
    // const private="0xe5594b4814ce6485455096a3937ac4fb96d04598543ff895072a28d1ec81e894"
    const [wallet, setWallet] = useState<CryptoAccount>();
    async function create(){
        const hdWallet = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const acc=new CryptoAccount(hdWallet.privateKey);
        const addr=await acc.address('BTC');
        // return BitcoinProvider(hdWallet.privateKey, addr, acc, 'testnet');
        console.log("address ",addr);
    }
  return (
    <View>
        {/* <CryptoAccount></CryptoAccount> */}
      <Text>Hi frm BTC</Text>
    </View>
  );
}

export default BTC;
