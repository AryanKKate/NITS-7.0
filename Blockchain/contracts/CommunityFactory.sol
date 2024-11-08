// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract CommunityFactory {
    using EnumerableSet for EnumerableSet.AddressSet;
    address public owner;
    address public implementation;
    mapping(address=>EnumerableSet.AddressSet) private ownersAddress;

    event ImplementationUpdated(address _caller, address _implementation);
    event ContractDeployed(address indexed _deployer, address _deployedContract, address _implementation);

    constructor(address _implementation) {
        owner = msg.sender;
        implementation = _implementation;
    }

    function setImplementation(address _implementation) public {
        require(msg.sender == owner, "Not owner!");
        implementation = _implementation;
        emit ImplementationUpdated(msg.sender, _implementation);
    }

    function deployContract(bytes memory _data, address[] memory _owners ) public {
        address deployedContract = Clones.clone(implementation);
        (bool success, ) = deployedContract.call(_data);
        require(success, "Failed to initialize contract!");
        bool add=false;
        for(uint i=0; i<_owners.length;i++){
            add = ownersAddress[_owners[i]].add(deployedContract);
            if(!add){
                break;
            }
        }
        require(add=true, "Not all owners added to registry");
        emit ContractDeployed(msg.sender, deployedContract, implementation);
    }

    function getCommunities(address _deployer) public view returns(address[] memory) {
        return ownersAddress[_deployer].values();
    }

    function countDeployed(address _deployer) public view returns(uint256) {
        return ownersAddress[_deployer].length();
    }
}