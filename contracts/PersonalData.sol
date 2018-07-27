pragma solidity ^0.4.4;
pragma experimental ABIEncoderV2;

import "./Seriality.sol";

contract PersonalData is Seriality
{
    struct Node
    {
        uint timestamp;
        string authorityId;
        string stakeholderId;
        string docName;
        string docType;
        string docId;
        string validFrom;
        string validTo;
        //image doc;
    }

    uint totalEntries=0;
    mapping(uint => Node) Pdata;
    //mapping(unit => mapping(uint=> Node)) PData;

    function AddPersonalData(string authorityId, string stakeholderId, string docName, string docType, string docId, string validFrom, string validTo) public
    {
        Node memory newData;
        newData.authorityId = authorityId;
        newData.stakeholderId = stakeholderId;
        newData.docName = docName;
        newData.docType = docType;
        newData.docId = docId;
        newData.validFrom = validFrom;
        newData.validTo = validTo;
        newData.timestamp = now;

        Pdata[totalEntries] = newData;
        //PData[stakeholderId] = newData;
        totalEntries++;
    }

   

/*    function GetStudDoc(string stakeholderId, string docType) public returns (Node[])
    {
        Node[] memory nodeList = new Node[]();
        uint256 count=0;
        for (uint i = 0; i < totalEntries; i ++)
        {
            if(stringsEqual(Pdata[i].stakeholderId, stakeholderId))
            {
                if(stringsEqual(Pdata[i].docType, docType))
                {
                    nodeList[count]= Pdata[i];
                    count++;
                }
            }
        }

        return (nodeList);
    } */

    //mapping (uint => Node) nodeList;
    function GetStudDoc(string stakeholderId, string docType) public view returns (bytes)
    {
        //Node[] memory nodeList = new Node[]();
        Node[] nodeList;
        uint256 count=0;
        for (uint i = 0; i < totalEntries; i ++)
        {
            bytes memory stakeholder = bytes(stakeholderId);
            bytes memory doctype = bytes(docType);
            if(stakeholder.length !=0 && doctype.length !=0)
            {
                if(stringsEqual(Pdata[i].stakeholderId, stakeholderId))
                {
                    if(stringsEqual(Pdata[i].docType, docType))
                    {
                        //nodeList[count]= Pdata[i];
                        nodeList.push(Pdata[i]);
                        count++;
                    }
                }
           }
        }
        string[3] memory testStr = ["str1", "str2", "str3"];
        bytes memory buffer = getBytes(testStr, 0, 2);
        return buffer;
    }

    function stringsEqual(string memory _a, string memory _b) public returns (bool) 
    {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);

        bool res;
        // Compare two strings using SHA3
        //if(bytes(a).length !=0 && bytes(b).length !=0)
        //{
            if (keccak256(a) != keccak256(b)) { res=false; }
            else {res=true;}
        //}
        return res;
    }

    function getBytes(string[3] arr, uint startindex, uint endindex) public view returns(bytes){

        require(endindex >= startindex);
        
        if(endindex > (arr.length - 1)){
            endindex = arr.length - 1;
        }
        
        //64 byte is needed for safe storage of a single string.
        //((endindex - startindex) + 1) is the number of strings we want to pull out.
        uint offset = 64*((endindex - startindex) + 1);
        
        bytes memory buffer = new  bytes(offset);
        string memory out1  = new string(32);
        
        
        for(uint i = endindex; i >= startindex; i--){
            out1 = arr[i];
            
            stringToBytes(offset, bytes(out1), buffer);
            offset -= sizeOfString(out1);
        }
        
        return (buffer);
    }

    //function test (string stakeholderId, string docType) public returns (string docId, string docName)
    //{
    //    Node[] memory nodeList = GetStudDoc("22", "edu");
        //for (uint i = 0; i < totalEntries; i ++)
        //{
    //        docId = nodeList[1].docId;
    //        docName = nodeList[0].docName;
        //}
    //}
}