/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {stripSpaces, projectInfo, hasWhileLoop, log, hasDoWhile, hasForEach, hasForLoop, test_inputs,
  dotnetExecutionBinary, hasLoop
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
    let info = await projectInfo(parentFolder,'ToInfinityAndBeyond');

    info.contents = stripSpaces(info.contents);

    //student must  use a infinite loop
    if(!info.contents.match(/while(true)/gm) &&!info.contents.match(/while\([a-zA-z]+\)/gm))
        return helper.fail('You must use a infinite loop!');

    //must prompt for input
    if(!info.contents.includes('Console.ReadLine()'))
      return helper.fail("You must get the value from buzz through ReadLine!");

    if(!info.contents.includes('break'))
      return helper.fail("You must use break to break out of the infinite loop once the countdown hits 0");

    //all is well,so we can go ahead and run a test
    let command =  `${dotnetExecutionBinary()} run --project ${info.project}`;
    let runResults = await test_inputs(15, command, [60]);

    let lines = runResults.split("\n");
    console.log(lines);

    if(!lines || lines.length === 0)
      return helper.fail('cannot parse the output from your program');


    for(let i = 60; i>=0; i--){
      let match = lines.find(element=>{
        if(element.includes(i))
          return true;
      })
      if(!match){
        return helper.fail(`Your program is missing ${i} from the counter!`);
      }

    }



  }catch(error){
    return helper.fail(error);
  }


  helper.success("Hooray!!! To infinity and beyond!!!");

};
