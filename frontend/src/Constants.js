export const microLoansAbi=[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addre",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "city",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "addr",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "adhar_num",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        }
      ],
      "name": "addKYC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "person",
          "type": "address"
        }
      ],
      "name": "approveKYC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getKYC",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "city",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "addr",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "adhar_num",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            },
            {
              "internalType": "enum MicroLoans.Status",
              "name": "st",
              "type": "uint8"
            }
          ],
          "internalType": "struct MicroLoans.Person",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserLoans",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "enum MicroLoans.Type",
              "name": "typeOfLoan",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            }
          ],
          "internalType": "struct MicroLoans.Loan[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "person",
          "type": "address"
        }
      ],
      "name": "rejectKYC",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "enum MicroLoans.Type",
          "name": "_type",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        }
      ],
      "name": "requestLoan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

export const microLoansAddress="0x5EA9eF9b585a3Ef1d6CFB29f0420b468b52521a5"
