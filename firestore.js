const admin = require("firebase-admin")

exports.db = function(serviceAccount, databaseURL){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL
  })
  let _db = admin.firestore()
  _db.settings({ timestampsInSnapshots: true })
  return _db
}
