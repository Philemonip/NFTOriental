import React, { Component, setState, useState, useEffect } from 'react';
import Web3 from 'web3';
import './trialapp.css';
import FiveToken from './abi/FiveToken.json';


function Trialapp() {
    useEffect(async () => {
        await loadWeb3();
        await loadBLockchainData();
    }, [])

    const [account, setaccount] = useState('');
    const [contract, setcontract] = useState(null);
    const [totalSupply, settotalSupply] = useState(0);
    const [colors, setcolors] = useState([]);
    const [color, setcolor] = useState('')


    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBLockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setaccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = FiveToken.networks[networkId]
        if (networkData) {
            const abi = FiveToken.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            setcontract(contract);
            const totalSupply = await contract.methods.totalSupply().call();
            settotalSupply(totalSupply)
            // Load Colors
            for (var i = 1; i <= totalSupply; i++) {
                const color = await contract.getArray
                setcolors([...colors, color])
            }
        } else {
            window.alert('Smart contract not deployed to detected network.')
        }
    }

    const mint = (color) => {
        contract.methods.mint(color).send({ from: account })
            .on('receipt', (receipt) => {
                console.log("receipt", receipt)
                setcolors([...colors, color])
            })
    }

    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="http://www.dappuniversity.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Color Tokens
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-white"><span id="account">{account}</span></small>
                    </li>
                </ul>
            </nav>
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center">
                        <div className="content mr-auto ml-auto">
                            <h1>Issue Token</h1>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                // const color = color.value
                                mint(color)
                            }}>
                                <input
                                    type='text'
                                    className='form-control mb-1'
                                    placeholder='e.g. #FFFFFF'
                                    // ref={(input) => { color = input }}

                                    onChange={(e) => setcolor(e.target.value)}
                                />
                                <input
                                    type='submit'
                                    className='btn btn-block btn-primary'
                                    value='MINT'
                                />
                            </form>
                        </div>
                    </main>
                </div>
                <hr />
                <div className="row text-center">
                    {colors.map((color, key) => {
                        return (
                            <div key={key} className="col-md-3 mb-3">
                                <div className="token" style={{ backgroundColor: color }}></div>
                                <div>{color}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Trialapp;