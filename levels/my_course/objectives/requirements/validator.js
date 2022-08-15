/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isDoWellOnAllAssignments, isCanSkipExam, isCorrectlyDefinedICE} = require("../lib/requirements_helpers");

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1, answer2, answer3, answer4,answer5,answer6,answer7} = helper.validationFields;

  if(!answer1 || !isDoWellOnAllAssignments(answer1)) {
    return helper.fail("Incorrect answer. Please read 'The requirements' again.");
  }

  if(!answer2 || !isCanSkipExam(answer2)) {
    return helper.fail("Incorrect answer. Please read the exam section on the requirement again");
  }

  if(!answer3 || !isCorrectlyDefinedICE(answer3)) {
    return helper.fail("Incorrect answer. Please read the ICE section again")
  }




  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
