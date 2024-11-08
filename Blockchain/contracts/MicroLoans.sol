// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MicroLoans {
    enum Status { pending, approved, rejected }
    enum Type { personal, business, student }

    struct Person {
        string name;
        uint256 age;
        string city;
        string addr;
        string adhar_num;
        string image;
        Status st;
        uint256 strikes;
    }

    struct RequestedLoan {
        uint256 amount;
        Type typeOfLoan;
        string description;
    }

    struct ApprovedLoan {
        uint256 amount;
        Type typeOfLoan;
        string description;
        uint256 duration; 
        uint256 interestRate; 
        uint256 totalAmount; 
        uint256 paidAmount; 
        uint256 monthlyPayment; 
        uint256 nextPaymentDue; 
        address borrower;
        address lender;
        bool isActive;
    }

    modifier onlyVerified(address person) {
        require(kycData[person].st == Status.approved, "KYC Status is not approved");
        _;
    }

    mapping(address => Person) private kycData;
    mapping(address => RequestedLoan[]) private userRequestedLoans;
    mapping(address => ApprovedLoan[]) private userApprovedLoans;

    function addKYC(
        address addre,
        string memory name,
        uint256 age,
        string memory city,
        string memory addr,
        string memory adhar_num,
        string memory image
    ) public {
        kycData[addre] = Person(name, age, city, addr, adhar_num, image, Status.pending, 0);
    }

    function approveKYC(address person) public {
        Person storage temp = kycData[person];
        temp.st = Status.approved;
    }

    function rejectKYC(address person) public {
        Person storage temp = kycData[person];
        temp.st = Status.rejected;
    }

    function getKYC(address user) public view returns (Person memory) {
        return kycData[user];
    }

    function requestLoan(uint256 amount, Type _type, string memory description) public onlyVerified(msg.sender) {
        RequestedLoan memory _temp = RequestedLoan(amount, _type, description);
        userRequestedLoans[msg.sender].push(_temp);
    }

    function getUserRequestedLoans() public view onlyVerified(msg.sender) returns (RequestedLoan[] memory) {
        return userRequestedLoans[msg.sender];
    }

    function getUserApprovedLoans() public view onlyVerified(msg.sender) returns (ApprovedLoan[] memory) {
        return userApprovedLoans[msg.sender];
    }

    function approveLoan(
        address lender,
        uint256 loanIndex,
        uint256 duration,
        uint256 interestRate
    ) public {
        RequestedLoan memory requestedLoan = userRequestedLoans[msg.sender][loanIndex];

        uint256 totalInterest = (requestedLoan.amount * interestRate * duration) / (100 * 12);
        uint256 totalAmount = requestedLoan.amount + totalInterest;
        uint256 monthlyPayment = totalAmount / duration;

        ApprovedLoan memory newLoan = ApprovedLoan({
            amount: requestedLoan.amount,
            typeOfLoan: requestedLoan.typeOfLoan,
            description: requestedLoan.description,
            duration: duration,
            interestRate: interestRate,
            totalAmount: totalAmount,
            paidAmount: 0,
            monthlyPayment: monthlyPayment,
            nextPaymentDue: block.timestamp + 30 days,
            borrower: msg.sender,
            lender: lender,
            isActive: true
        });

        userApprovedLoans[msg.sender].push(newLoan);

        
        delete userRequestedLoans[msg.sender][loanIndex];
    }

    function repayLoan(address borrower, uint256 loanIndex) public payable onlyVerified(borrower) {
    ApprovedLoan storage loan = userApprovedLoans[borrower][loanIndex];
    require(loan.isActive, "Loan is not active");

    uint256 startOfDueDay = (loan.nextPaymentDue / 1 days) * 1 days;
    require(block.timestamp >= startOfDueDay, "Payment not due yet");

    uint256 payment = msg.value;
    require(payment >= loan.monthlyPayment, "Insufficient payment amount");

    loan.paidAmount += payment;
    loan.nextPaymentDue += 30 days;

    if (loan.paidAmount >= loan.totalAmount) {
        loan.isActive = false; 
    }
}

    function checkMissedPayments(address borrower) public {
        for (uint256 i = 0; i < userApprovedLoans[borrower].length; i++) {
            ApprovedLoan storage loan = userApprovedLoans[borrower][i];
            if (loan.isActive && block.timestamp > loan.nextPaymentDue) {
                kycData[borrower].strikes++;
                loan.nextPaymentDue += 30 days; 
            }
        }
    }

    function getStrikes(address borrower) public view returns (uint256) {
        return kycData[borrower].strikes;
    }
}
