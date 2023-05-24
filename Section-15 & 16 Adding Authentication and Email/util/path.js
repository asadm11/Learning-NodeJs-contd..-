const path = require('path');

//exporting the absolute path of the main module folder
module.exports = path.dirname(require.main.filename);