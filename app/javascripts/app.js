// Import the page's CSS. Webpack will know what to do with it.
import "../css/app.css";
import isString from 'lodash/fp/isString';
import IPFS from 'ipfs-mini';
// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

// Import our contract artifacts and turn them into usable abstractions.
import personalData_artifacts from '../../build/contracts/PersonalData.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var PersonalData = contract(personalData_artifacts);
const _ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    PersonalData.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        //alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        //alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      //alert("Accoount found!!");

      accounts = accs;
      account = accounts[0];
    });
  },

  filereader: function (filepath) {
    var filereader = new FileReader()
    var file = new File(filepath)
    filereader.readAsArrayBuffer(file)
    filereader.onload = function () {
      var data = filereader.result
      var buffer = Buffer.from(data)
      var content = []
      content.push(
        {
          path: filepath,
          content: buffer

        })
    }
  },



  GetDataIpfs: function (multihash) {
    if (!isString(multihash)) {
      return new Error('multihash must be String')
    } else if (!multihash.startsWith('Qm')) {
      return new Error('multihash must start with "Qm"')
    }

    return new Promise((resolve, reject) => {
      _ipfs.files.cat(multihash, (err, result) => {
        if (err) reject(new Error(err))
        resolve(result)
      })
    })
  },

  AddObjectIPFS: function (obj) {
    const CID = new Promise((resolve, reject) => {
      _ipfs.files.add(obj, (err, result) => {
        if (err) reject(new Error(err))
        resolve(result)
      })
    })
    console.log('CID:', CID)
    return CID
  },

  //document.getElementById("Demo").onclick= function(){add();};

  upload: function () {
    const reader = new FileReader();
    reader.onloadend = function () {
      const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
      const buf = buffer.Buffer(reader.result) // Convert data into buffer
      ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
        if (err) {
          console.error(err)
          return
        }
        let url = `https://ipfs.io/ipfs/${result[0].hash}`
        console.log(`Url --> ${url}`)
        // document.getElementById("url").innerHTML= url
        // document.getElementById("url").href= url
        // document.getElementById("output").src = url
        alert(url);
      })
    }
    // const photo = document.getElementById("photo");
    // reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
  },

  add: function () {
    console.log("add func");

    var author = document.getElementById("author").value;
    var stakeholder = document.getElementById("stakeholder").value;
    var docType = document.getElementById("doc-type").value;
    var docname = document.getElementById("docName").value;
    var validFrom = document.getElementById("validfrom").value;
    var validTo = document.getElementById("validto").value;
    var docpath = document.getElementById("docpath").baseURI;
    // var filepath=self.AddObjectIPFS(self.filereader(docpath));
    var docId = "0x3d5cdb8cde6ab91fed8782a6fc"; // TODO:Change this with ipfs generated hash
    // alert(filepath);

    //this.setStatus("Initiating record creation... (please wait)");
    var pd;

    PersonalData.deployed().then(function (instance) {
      //account = "0x3d5cdb8cc6e6e59adf8de6ab91fed8782a6fcdbb";
      alert(account);
      pd = instance;
      return pd.AddPersonalData(author, stakeholder, docName, docType, docId, validFrom, validTo, { from: account });
    }).then((result) => {
      console.log("Stakeholder record added")
      window.alert("Your data is added successfully !!")
      location.reload();
    })
  },

  show: function () {
    var stakeholder = document.getElementById("stakeholder").value;
    var docType = document.getElementById("doc-type").value;
    var pd;

    // MetaCoin.deployed().then(function(instance) {
    //   meta = instance;
    //   return meta.getBalance.call(account, {from: account});
    // }).then(function(value) {
    //   var balance_element = document.getElementById("balance");
    //   balance_element.innerHTML = value.valueOf();
    // }).catch(function(e) {
    //   console.log(e);
    //   self.setStatus("Error getting balance; see log.");
    // });

    PersonalData.deployed().then(function (instance) {
      alert(account);
      pd = instance;
      return pd.GetStudDoc.call(stakeholder, docType, { from: account });
    }).then((result) => {
      console.log(result);
      console.log("Stakeholder record retrieved")
      window.alert("Your data is retrieved successfully !!")
      // location.reload();
    })
  }
};

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    //alert("Error!!!");
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    //alert("Error!!!");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
