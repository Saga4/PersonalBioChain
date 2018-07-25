pragma solidity ^0.4.4;
pragma experimental ABIEncoderV2;

contract PersonalData
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
    function GetStudDoc(string stakeholderId, string docType) public returns (Node[])
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

        return (nodeList);
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

    function test (string stakeholderId, string docType) public returns (string docId, string docName)
    {
        Node[] memory nodeList = GetStudDoc("22", "edu");
        //for (uint i = 0; i < totalEntries; i ++)
        //{
            docId = nodeList[1].docId;
            docName = nodeList[0].docName;
        //}
    }
}