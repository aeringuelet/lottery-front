import web3 from './web3';

const contractAddress = '0x8fc9c15da21A86385048d9f368aa7235E8f380e5';
const contractAbi = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
        signature: 'constructor'
    },
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
        payable: true,
        signature: '0xe97dcb62'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [
            { internalType: 'address payable[]', name: '', type: 'address[]' }
        ],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        signature: '0x8b5b9ccc'
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        signature: '0x481c6a75'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        signature: '0x5d495aea'
    }
];

export default new web3.eth.Contract(contractAbi, contractAddress);
