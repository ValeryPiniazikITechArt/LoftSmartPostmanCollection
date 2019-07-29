const newman = require('newman');
const editJsonFile = require('edit-json-file');

const pathToSignUpCollection = './Sign_Up.postman_collection.json';

let Sign_Up_collection = editJsonFile(pathToSignUpCollection);

let arrayOfParams = Sign_Up_collection.get('variable');

arrayOfParams = arrayOfParams.map(param => {
    if (param.key === 'email') {
        param.value = `valery.piniazik+${new Date().getTime()}@yandex.by`;
    }
    return param;
});

Sign_Up_collection.set('variable', arrayOfParams);

Sign_Up_collection.save(() => newman.run({
    collection: require(pathToSignUpCollection),
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
}));