/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {stripSpaces, projectInfo, hasWhileLoop, log, hasDoWhile, hasForEach, hasForLoop, test_inputs,
  dotnetExecutionBinary
} = require("../../../github/objectives/lib/utility");

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
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_14_CLASSROOM;

  try{
    let info = await projectInfo(parentFolder,'CountDownWhile');

    info.contents = stripSpaces(info.contents);



    //cant use any other loop but for loop
    if(hasDoWhile(info.contents))
      return helper.fail("You cannot use do while loop. You must use a while loop");

    if(!hasWhileLoop(info.contents))
      return helper.fail("You are missing while loop");

    if(hasForLoop(info.contents))
      return helper.fail('You cannot use for loop. you must use a while loop')

    if(hasForEach(info.contents)){
      return helper.fail("You cannot use foreach! you must use a while loop");
    }

    if(info.contents.includes('56') || info.contents.includes('57') || info.contents.includes('58') || info.contents.includes('59'))
      return helper.fail("You hardcoded the values. You cannot do that, you must use a for loop");


    let command =  `${dotnetExecutionBinary()} run --project ${info.project}`;
    let runResults = await test_inputs(15, command, []);

    let lines = runResults.split("\n");

    if(!lines || lines.length === 0)
      return helper.fail('cannot parse the output from your program');

    let REQUIRED = 400;

    for(let i = REQUIRED; i >= 0; i--){
      if(!lines.includes(i.toString())){
        return helper.fail(`Your program is missing ${i} from the counter!`);
      }

    }


  }catch(error){
    return helper.fail(error);
  }


  helper.success("Hooray!!! You are starting to get basic of loop");

};
