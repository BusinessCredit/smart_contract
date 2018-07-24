/* eslint-disable prefer-destructuring,prefer-const */
import React, { Component } from 'react';
import IOTDevice from '../build/contracts/IOTDevice.json';
import getWeb3 from './utils/getWeb3';

import './App.css';
import '../node_modules/uikit/dist/css/uikit.min.css';

import RegisterIOT from './components/form/RegisterIOT';
import RegisterIOTStatus from './components/form/RegisterIOTStatus';
import IOTStatus from './components/IOTStatus';

const contract = require('truffle-contract');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      forms: {
        registerOwner: {
          _disabled: false,
        },
        updateStatus: {
          _disabled: true,
          event: '',
          comment: '',
          id: ''
        },
      },
      contracts: {
        IOTDevice: {
          address: null,
          IOTStatus: []
        }
      }
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then((results) => {
        const state = { ...this.state };
        state.web3 = results.web3;
        // state.web3.eth.defaultAccount = results.web3.eth.accounts[0];
        this.setState(state);

        // this.setState({ web3: results.web3 });
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  instantiateIOTOwnerContract() {
    const IOTOwner = contract(IOTDevice);
    IOTOwner.setProvider(this.state.web3.currentProvider);

    this.state.web3.eth.getAccounts((error, accounts) => {
      IOTOwner.new({ from: accounts[0], gas: 2100000 })
        .then((instance) => {
          const state = { ...this.state };
          state.contracts.IOTDevice.address = instance.address;
          state.forms.updateStatus._disabled = false;
          this.setState(state);
        });
    });
  }

  callCreateIOT() {
    const IOTOwner = contract(IOTDevice);
    IOTOwner.setProvider(this.state.web3.currentProvider);

    const { forms, contracts } = this.state;
    const address = contracts.IOTDevice.address;
    // eslint-disable-next-line one-var,no-unused-vars
    let _,
      event,
      comment,
      id;
    ({
      _, event, comment, id
    } = forms.updateStatus);

    // IOTOwner.at(address)
    //   .then(instance => instance.createNewIOT(model, make, vin))
    //   .then((result) => {
    //     const state = { ...this.state };
    //     const IOT = {
    //       model,
    //       make,
    //       vin,
    //       address: result.logs[0].args.newIOT
    //     };
    //     contracts.IOTOwner.IOTs.push(IOT);
    //     this.setState(state);
    //   });

    return this.state.web3.eth.getAccounts((error, accounts) => {
      IOTOwner.at(address)
        .then(instance => instance.addStatusForIODevices(
          accounts[0],
          event, comment, id, { from: accounts[0], gas: 2100000 }
        ))
        .then((result) => {
          const state = { ...this.state };
          const Status = {
            event,
            comment,
            id,
            address: result.logs[0].args.newStatus
          };
          contracts.IOTDevice.IOTStatus.push(Status);
          this.setState(state);
        });
    });
  }

  IOTFormChangedHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    const address = this.state.contracts.IOTDevice.address;

    // Update form
    const form = { ...this.state.forms.updateStatus };
    form[name] = value;

    // Validate form input
    const {
      event, comment, id
    } = form;
    const isValid = comment !== '' && event !== '' && id !== '' && address;
    form._disabled = !isValid;

    // Update state
    const state = { ...this.state };
    state.forms.updateStatus = form;
    this.setState(state);
  }
  IOTFormSubmittedHandler(e) {
    e.preventDefault();
    if (!this.state.forms.updateStatus._disabled) {
      this.callCreateIOT();
    }
  }

  ownerFormSubmittedHandler(e) {
    e.preventDefault();
    if (!this.state.forms.registerOwner._disabled) {
      this.instantiateIOTOwnerContract();
    }
  }

  render() {
    const { contracts, forms } = this.state;
    return (
      <div className="App">
        <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
          <div className="uk-grid-match" data-uk-grid-margin>
            <RegisterIOT
              onSubmit={this.ownerFormSubmittedHandler.bind(this)}
              state={forms.registerOwner}
            />
            <RegisterIOTStatus
              onChange={this.IOTFormChangedHandler.bind(this)}
              onSubmit={this.IOTFormSubmittedHandler.bind(this)}
              state={forms.updateStatus}
            />
            <IOTStatus IOTs={contracts.IOTDevice.IOTStatus} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
