import React, {useEffect, useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import * as bip39 from 'bip39';
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import 'react-native-get-random-values';
const mnemonic =
  'doctor mask legal clay seed riot recipe today since supreme load accuse';
const createConnection = () => {
  return new Connection(clusterApiUrl('devnet'), 'confirmed');
};

async function getBalance(publicKey: any){
  try {
    const connection = createConnection();
    // const wal=new PublicKey(publicKey);
    const balance = await connection.getBalance(publicKey);
    console.log(`balance is ${balance / LAMPORTS_PER_SOL} SOL`);
    const ans=Number(balance / LAMPORTS_PER_SOL);
    // setBal(ans);
  } catch (err) {
    console.log('error is ', err);
  }
};
function generateKeys() {
  const seed = bip39.mnemonicToSeedSync(mnemonic, ''); // (mnemonic, password)
  const keypair = Keypair.fromSeed(seed.subarray(0, 32));
  console.log('public from key', keypair.publicKey);
  return keypair;
}
const requestAirdrop = async (publicKey:any) => {
  // setRequestAirdropButton({ text: BUTTON_TEXT_LOADING, loading: true });
  try{
    const connection = createConnection();
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL
    )
    const signature = await connection.confirmTransaction(airdropSignature)
  
    const newBalance = await getBalance(publicKey)
    // console.log("new balance is",newBalance)
  }
  catch(err){
    // console.log("error fro airdrop is ",err)
  }
  // setAccount({ ...account, balance: newBalance });
  // setRequestAirdropButton({ text: BUTTON_TEXT, loading: false });
};

async function sendSOL(reciver:any){
  try {
    const kpair=generateKeys();
    const connection=createConnection();
    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: kpair.publicKey,
        toPubkey: reciver,
        lamports: 1,
      })
    );
    const signer = Keypair.fromSecretKey(Uint8Array.from(kpair.secretKey))
    const ps= await sendAndConfirmTransaction(connection, transferTransaction, [
      kpair
    ]);
    
    console.log('done from SOL');
  } catch (error) {
    console.log("error from sol func",error)
  }
}
function Solana() {
  const pubKey=generateKeys().publicKey;
  const [bal,setBal]=useState(0);
  // requestAirdrop(pubKey);
  useEffect(()=>{
    // generateKeys();
    (async()=>{
      try {
        const connection = createConnection();
        // const wal=new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
        const balance = await connection.getBalance(pubKey);
        console.log(`balance is ${balance / LAMPORTS_PER_SOL} SOL`);
        const ans=Number(balance / LAMPORTS_PER_SOL);
        setBal(ans);

        // sendSOL(wal);
      } catch (err) {
        console.log('error from useEffect', err);
      }
    })();
  },[])
  
  return (
    <View>
      <Text>Hi frm keypair</Text>
      <Text>balance is {bal} SOL</Text>
    </View>
  );
}

export default Solana;
