//Importando dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Definir a rede
//bitcoin - rede principal - mainent
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//Caminho de derivação de Carteiras HD
const path = `m/49'/1'/0'/0`

//Criando a mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic) //Seed binário

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network) //Chave raiz

//Criando uma conta - par pvt-pub keys
let account = root.derivePath(path) //Chave que representa a conta
let node = account.derive(0).derive(0) //nó que armazena uma chave pública e privada

//Criação de um Endereço Bitcoin
let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAdress)
console.log("Chave privada:", node.toWIF());
console.log("Seed", mnemonic)