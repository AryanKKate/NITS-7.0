// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;


contract MicroLoans { 
    enum Status{
        pending,
        approved,
        rejected
    }
    struct Person {
        string name;
        uint256 age;
        string city;
        string addr;
        string adhar_num;
        string image;
        Status st;
    }

    enum Type {
        personal,
        business,
        student
    }

    struct Loan{
        uint256 amount;
        Type typeOfLoan;
        string description;
    }

    mapping(address=>string[]) private forms;

    modifier onlyVerified(address person) {
        require(kycData[person].st==Status.approved, "KYC Status is not approved");
        _;
    }

    mapping(address => Person) private kycData;
    mapping(address => Loan[]) private userLoans;

    function addKYC(
        address addre,
        string memory name,
        uint256 age,
        string memory city,
        string memory addr,
        string memory adhar_num,
        string memory image
    ) public  {
        kycData[addre] = Person(name, age, city, addr, adhar_num, image, Status.pending);
    }
    function approveKYC(address person) public {
        Person storage temp=kycData[person];
        temp.st=Status.approved;
    }
    function rejectKYC(address person) public {
        Person storage temp=kycData[person];
        temp.st=Status.rejected;
    }
    function getKYC(address user) public view returns (Person memory) {
        return kycData[user];
    }

    function requestLoan(uint256 amount, Type _type, string memory description) public onlyVerified(msg.sender){
        Loan memory _temp=Loan(amount, _type, description);
        userLoans[msg.sender].push(_temp);
    } 

    function getUserLoans() public view onlyVerified(msg.sender) returns(Loan[] memory){
        return userLoans[msg.sender];
    }

}
