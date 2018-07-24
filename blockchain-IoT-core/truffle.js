module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id,
      from: '0x4ccaF171C22927eb91e6618885550335eB7caE45'
    },
    ropsten: {
      host: '127.0.0.1',
      port: 8545,
      network_id: 3,
      gas: 2900000,
    }
  }
};
