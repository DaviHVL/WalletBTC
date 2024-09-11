//Importando dependencias
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//Definir a rede
//bitcoin - rede principal - mainent
//testnet - rede de teste - testnet
// Define network parameters for Testnet4
const testnet4 = {
    messagePrefix: '\x18Bitcoin Signed Message:\n',
    bech32: 'tb',
    bip32: {
      public: 0x043587cf,  // Base58 prefix for xpub on Testnet4
      private: 0x04358394  // Base58 prefix for xprv on Testnet4
    },
    pubKeyHash: 0x6f,      // P2PKH starts with 'm' or 'n'
    scriptHash: 0xc4,      // P2SH starts with '2'
    wif: 0xef              // Wallet Import Format prefix
  };

//Caminho de derivação de Carteiras HD
const path = `m/49'/1'/0'/0`;

//Criando a mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic); //Seed binário

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, testnet4); //Chave raiz

//Criando uma conta - par pvt-pub keys
let account = root.derivePath(path); //Chave que representa a conta
let node = account.derive(0).derive(0); //nó que armazena uma chave pública e privada

//Criação de um Endereço Bitcoin
let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: testnet4,
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAdress);
console.log("Chave privada:", node.toWIF());
console.log("Seed", mnemonic);