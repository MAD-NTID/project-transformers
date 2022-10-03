/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

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
  const { answer1, answer2, answer3,  answer4, answer5, answer6} = helper.validationFields;

  if(!answer1 || !(answer1.includes('collection') && (answer1.includes('same') || answer1.includes('homogenous '))))
    return helper.fail('Incorrect answer for question #1');


  if(!answer2 || answer2!=='true')
    return helper.fail("Incorrect answer for question #2");

  if(!answer3 || answer3!=='index')
    return helper.fail("Incorrect answer for question #3");

  if(!answer4 || answer4!=='true')
    return helper.fail("Incorrect answer for question #4");


  if(!answer5 || !answer5.includes('zero') && !answer5.includes('0'))
    return helper.fail("Incorrect answer for question #5");

  if(!answer6 || !answer6.includes('Console.WriteLine(names[2])'))
    return helper.fail("Incorrect answer for question #6");

  helper.success("Hooray!!! You are starting to get basic of arrays");

};