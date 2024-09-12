// Importando dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Definir a rede testnet
const testnete = bitcoin.networks.testnet; // Usar a configuração testnet da biblioteca bitcoinjs-lib

// Caminho de derivação de carteiras HD para P2PKH
const path = `m/44'/1'/0'/0/0`;

// Criando a mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic); // Seed binária

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, testnete); // Chave raiz

// Criando uma conta - par de chaves privadas e públicas
let account = root.derivePath(path); // Chave que representa a conta
let node = account.derive(0).derive(0); // Nó que armazena uma chave pública e privada

// Criação de um endereço Bitcoin P2PKH
let btcAddress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: testnete,
}).address;

console.log("Carteira gerada");
console.log("Endereço P2PKH:", btcAddress);
console.log("Chave privada:", node.toWIF());
console.log("Seed:", mnemonic);

