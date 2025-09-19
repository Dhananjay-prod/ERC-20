# ERC-20 Token Implementation

This repository contains a robust implementation of the ERC-20 token standard, the most widely used fungible token protocol on the Ethereum blockchain. The ERC-20 standard defines a common interface for smart contracts to manage tokens, allowing for seamless integration across wallets, exchanges, and decentralized applications.

## Features

- **ERC-20 Compliance**: Fully adheres to the official ERC-20 specification.
- **Minting & Burning**: Supports token creation and destruction (if enabled).
- **Ownership Control**: Implements access control for administrative functions.
- **Safe Math Operations**: Prevents overflow and underflow bugs.
- **Extensible Design**: Easily customizable for advanced use cases.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Hardhat](https://hardhat.org/) or [Truffle](https://www.trufflesuite.com/) for local blockchain development
- [MetaMask](https://metamask.io/) for interacting with deployed contracts

### Installation

Clone the repo:

```bash
git clone https://github.com/Dhananjay-prod/ERC-20.git
cd ERC-20
```

Install dependencies:

```bash
npm install
# or
yarn install
```

### Usage

#### 1. Compile the Smart Contracts

```bash
npx hardhat compile
```

#### 2. Run Tests

```bash
npx hardhat test
```

#### 3. Deploy

Update deployment parameters in the configuration file, then run:

```bash
npx hardhat run scripts/deploy.js --network <network>
```

#### 4. Interact

Use Hardhat tasks, scripts, or a frontend to interact with the deployed token contract.

## Project Structure

```
ERC-20/
├── contracts/          # Solidity smart contracts
│   └── ERC20.sol       # Main ERC-20 implementation
├── scripts/            # Deployment and interaction scripts
├── test/               # Test cases for the contracts
├── package.json
└── README.md
```

## Example ERC-20 Methods

- `totalSupply()`: Returns total number of tokens.
- `balanceOf(address account)`: Returns balance of specified address.
- `transfer(address to, uint256 amount)`: Transfers tokens.
- `approve(address spender, uint256 amount)`: Allows spender to withdraw tokens.
- `transferFrom(address from, address to, uint256 amount)`: Transfers tokens on behalf of another address.

## Customization

You can easily extend the base ERC-20 contract to add features like:

- Pausable transfers
- Blacklisting
- Transaction fees
- Governance

## Contributing

Contributions are welcome! Please fork the repo and open a pull request.

## License

This project is licensed under the MIT License.

---

**Author:** [Dhananjay-prod](https://github.com/Dhananjay-prod)  
**Repository:** [ERC-20](https://github.com/Dhananjay-prod/ERC-20)