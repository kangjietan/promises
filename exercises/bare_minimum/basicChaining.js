/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var github = require('./promisification');
var firstLine = require('./promiseConstructor');
var fs = Promise.promisifyAll(require('fs'));


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return firstLine.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      if (username) {
        return username;
      } else {
        throw new Error('File does not exist!');
      }
    })
    .then(function(currentUser) {
      if (currentUser) {
        return github.getGitHubProfileAsync(currentUser);
      } else {
        throw new Error('User does not exist in database!');
      }
    })
    .then(function(response) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(response));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
