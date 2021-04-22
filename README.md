### Export/Import Firestore Database Collection

1. Clone project.
2. Install **node_modules**
```
npm install --save
```

#### Usage
1. Export collection<br/>
**node import.js [Path to Service Account Key] [Database URL] [Collection Name]**
```
node export.js ./serviceAccountKey.json https://test.firebaseio.com test_db
```

2. Import collection<br/>
**node import.js [Path to Service Account Key] [Database URL] [Collection JSON File Name]**
```
node import.js ./serviceAccountKey.json https://test.firebaseio.com test_db
```
