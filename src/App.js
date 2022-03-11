import { useEffect, useState } from 'react';
import './App.css';
import lottery from './lottery';
import web3 from './web3';

function App() {
    const [manager, setManager] = useState('No manager fetched');
    const [statusMessage, setStatusMessage] = useState('');
    const [players, setPlayers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [currentAccount, setCurrentAccount] = useState([]);
    const [balance, setBalance] = useState('');
    const [value, setValue] = useState('0');

    useEffect(() => {
        const fetchContractData = async () => {
            const manager = await lottery.methods.manager().call();
            const players = await lottery.methods.getPlayers().call();
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(lottery.options.address);

            setCurrentAccount(accounts[0]);
            setManager(manager);
            setPlayers(players);
            setBalance(balance);
            setAccounts(accounts);
        };
        fetchContractData();
    }, []);

    const onValueInputChange = (event) => {
        event.stopPropagation();
        setValue(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        setStatusMessage('Waiting on transaction to finish...');
        await lottery.methods.enter().send({
            from: currentAccount,
            value: web3.utils.toWei(value, 'ether')
        });
        setStatusMessage("You've successfully entered into the lottery!");
    };

    const onClickPickWinner = async (event) => {
        event.preventDefault();

        setStatusMessage('Waiting on transaction to success...');
        await lottery.methods.pickWinner().send({ from: currentAccount });
        setStatusMessage('A winner has been picked!');
    };

    return (
        <div className='App'>
            <h1>Lottery Contract</h1>
            <p>This contract is managed by: {manager}</p>
            <p>
                There are currently {players.length} people that entered
                competing to win {web3.utils.fromWei(balance, 'ether')} ETH
            </p>

            <hr />

            <form onSubmit={onSubmit}>
                <h4>Want to try luck?</h4>
                <div>
                    <label>Amount of ether to enter</label>
                    <input value={value} onChange={onValueInputChange} />
                </div>
                <button type='submit'>Enter!</button>
            </form>

            <hr />

            <h3>Ready to pick a winner?</h3>
            <button type='button' onClick={onClickPickWinner}>
                Pick Winner!
            </button>

            <hr />

            <h2>{statusMessage}</h2>
        </div>
    );
}

export default App;
