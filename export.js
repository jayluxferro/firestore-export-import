const usage = function(){
  console.log(`Usage: node ${process.argv[0]} [Path to Service Account Key] [Database_URL] [Collection Name]`)
  process.exit(1)
}

if (process.argv.length != 5){
  usage()
}

const serviceAccount = process.argv[2]
const databaseURL = process.argv[3]
const collectionName = process.argv[4]
const fs = require('fs')
const db = require("./firestore").db(serviceAccount, databaseURL)

let data = {}
data[collectionName] = {}

let results = db.collection(collectionName)
.get()
.then(snapshot => {
  snapshot.forEach(doc => {
    data[collectionName][doc.id] = doc.data()
  })
  return data
})
.catch(error => {
  console.log(error)
})

results.then(dt => {
  fs.writeFile(`${collectionName}.json`, JSON.stringify(data), function(err) {
      if(err) {
          return console.log(err)
      }
      console.log(`${collectionName} was saved!`)
  })
})
