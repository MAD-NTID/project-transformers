/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {stripSpaces} = require("../../../github/objectives/lib/utility");

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

  if(!answer1 || !answer1.toLowerCase().includes('for'))
    return helper.fail('Incorrect answer for question #1');

  if(!answer2 || !answer2.toLowerCase().includes('while'))
    return helper.fail('Incorrect answer for question #2');

  if(!answer3 || (answer3!=='0' && answer3.toLowerCase()!=='zero'))
    return helper.fail('Incorrect answer for question #3');

  if(!answer4 || !stripSpaces(answer4).includes('Array.Sort(numbers)'))
    return helper.fail('Incorrect answer for question #4. Please check the powerpoint from the lecture powerpoint');

  if(!answer5 || !stripSpaces(answer5).includes('Array.Reverse(numbers)'))
    return helper.fail('Incorrect answer for question #5');

  helper.success("Hooray!!! You are starting to get basic of arrays");

};
