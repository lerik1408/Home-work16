const path = require('path');
const fixtures = require('pow-mongodb-fixtures').connect('mongodb://localhost:27017/user');

fixtures.load(path.join(__dirname, '/user.js'), (err) => {
  if (err) console.log(err);
  fixtures.close((err2) => {
    if (err2) console.log(err2);
    console.log('add data');
  });
});
