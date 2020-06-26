const Datastore = require('nedb');
const db = new Datastore({ filename: './database/posts', autoload: true });

db.ensureIndex({ fieldName: 'link', unique: true }, function (err) {
});

const insert = (document) => {
    return new Promise((resolve, reject) => {
        db.insert(document, function (err, newDoc) {
            if (err) {
                reject(err);
            }
            resolve(newDoc);
        });
    })
}

const findOneToSendToGroup = () => {
    return new Promise((resolve, reject) => {
        db.findOne({isSent: false}).sort({ score: -1 }).limit(1).exec(function (err, docs) {
            if(err){
                reject(err);
            }
            resolve(docs);
        });
    })
}

const update = (query, updatedDoc) => {
    return new Promise((resolve, reject) => {
        db.update(query, updatedDoc, {}, function (err, numReplaced) {
            if(err){
                reject(err);
            }
            if(numReplaced > 0){
                resolve();
            }
            reject("No docs updated");
        });
    })
}

module.exports = {
    insert,
    update,
    findOneToSendToGroup
}