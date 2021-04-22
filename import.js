const usage = function(){
  console.log(`Usage: node ${process.argv[0]} [Path to Service Account Key] [Database URL] [Collection JSON File Name]`)
  process.exit(1)
}

if (process.argv.length != 5){
  usage()
}

const serviceAccount = process.argv[2]
const databaseURL = process.argv[3]
const fileName = process.argv[4]
const fs = require('fs')
const db = require("./firestore").db(serviceAccount, databaseURL)

fs.readFile(`${fileName}.json`, 'utf8', function(err, data){
  if(err){
    return console.log(err);
  }
  dataArray = JSON.parse(data);
  updateCollection(dataArray);
})

async function updateCollection(dataArray){
  for(const index in dataArray){
    const collectionName = index;
    for(const doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
        await startUpdating(collectionName, doc, dataArray[index][doc]);
      }
    }
  }
}

function startUpdating(collectionName, doc, data){
  return new Promise(resolve => {
    db.collection(collectionName).doc(doc)
    .set(data)
    .then(() => {
      console.log(`${doc} is imported successfully to firestore!`);
      resolve('Data wrote!');
    })
    .catch(error => {
      console.log(error);
    });
  });
}
