var admin = require("firebase-admin");
var serviceAccount = require("../config/api/firebase-service-account.json");
var _ = require('lodash');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coin-news.firebaseio.com/"
});

function FirebaseManager() {

  function insertData(data, refname) {
    return new Promise(function(resolve, reject) {
      return insertIfNotExist(data, refname, resolve, reject)
    })
  }

  function insertIfNotExist(data, refname, resolve, reject) {
    refname = refname || 'bitcoin';
    var ref = admin.database().ref('/data').child(refname);
    return ref.orderByChild("d").equalTo(data.d).once("value", function(snapshot) {
      var value = snapshot.val();
      if (value) {
        return resolve('boo duplicate')
      }

      var dataRef = ref.push();
      return dataRef.set(data).then(function() {
        return resolve('added ', data);
      });
    });
  }

  return {
    insertData: insertData
  }
}

module.exports = FirebaseManager;
