import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {ethers} from 'ethers';
import {JsonRpcProvider} from '@ethersproject/providers';
import '@ethersproject/shims';

function Wallet() {
  function differentPkeys(mnemonic: string) {
    return ethers.utils.HDNode.fromMnemonic(mnemonic);
  }
  const mnemonic =
    'sense letter between tuna domain fragile gate soul evolve master estate damp';
  console.log(differentPkeys(mnemonic));
  const HdnodeAddress = differentPkeys(mnemonic);
  
  const privatekey="0xe5594b4814ce6485455096a3937ac4fb96d04598543ff895072a28d1ec81e894";
  const publicKey="0x0476a63b569f29bb3dd7f1ba37bfd2d5c45b17faaf54f07cf9efeb69ec9d558831d1e6f79e2f7378c3f95ce21f17db1e0c1ef631d1dab2ecf8a43618c7c6007a83";
  const publicAddress="0x4CfCa8920e7EF4465Eb2E0bB26e240D8A134F2a0";

  const [balance, setBalance] = useState('');

  const recieverAddress = '0xa35d0F3a4d61A72BdDDb0701DcbE48e2cE9509D0'; // charan annas

  async function SR() {
    try {
      console.log('func activated');
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc.ankr.com/eth_goerli',
        5,
      );
      const sender = new ethers.Wallet(privatekey, provider);

      const balanceBefore = await provider.getBalance(recieverAddress);
      console.log(
        `Destination balance before sending: ${ethers.utils.formatEther(
          balanceBefore,
        )} ETH`,
      );
      console.log('Sending...\n');

      const tx = await sender.sendTransaction({
        to: recieverAddress,
        value: ethers.utils.parseEther('0.0001'),
      });
      console.log(`TX hash: ${tx.hash}`);
      console.log('Waiting for receipt...');
      await provider.waitForTransaction(tx.hash, 1, 150000).then(() => {});
      const balanceAfter = await provider.getBalance(recieverAddress);
      console.log(
        `Destination balance after sending: ${ethers.utils.formatEther(
          balanceAfter,
        )} ETH`,
      );
      // fetchBalance()
    } catch (error) {
      console.log(error);
      console.log('Error in Send');
    }
  }

  async function fetchBalance() {
    try {
      const provider = new JsonRpcProvider(
        'https://rpc.ankr.com/eth_goerli',
        5,
      );
      const balancefromwallet = await provider.getBalance(publicAddress);
      setBalance(ethers.utils.formatEther(balancefromwallet).toString());
      // console.log("balance is ",balance)
      console.log('Balance fetched successfully');
    } catch (error) {
      console.log(error);
      console.log('Error fetching balance');
    }
  }
console.log('wallet started')
  useEffect(() => {
    fetchBalance();
    // SR();
  }, [publicKey, privatekey, publicAddress]);

  return (
    <>
      <View >
        <Text style={{fontSize:20,fontWeight:'200'}}>Your Public Key: {publicKey}</Text>
        
        <Text style={{fontSize:20,fontWeight:'200'}}>Private Key: {privatekey}</Text>
        {/* <br /> */}
        <Text style={{fontSize:20,fontWeight:'200'}}>Public Address: {publicAddress}</Text>
        <Button title="Fetch Balance" onPress={fetchBalance} />
        <Text style={{fontSize:20,fontWeight:'200'}}>Balance: {balance?balance:0} ETH</Text>
        <Button title="Send" onPress={SR} />
      </View>
    </>
  );
}

export default Wallet;
