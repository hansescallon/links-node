const { format } = require('timeago.js');
const helpers = {};
module.exports = helpers;

helpers.timeago = (timestamp) => {
    return format(timestamp);
};