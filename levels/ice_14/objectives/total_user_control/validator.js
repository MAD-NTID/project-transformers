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
    let info = await projectInfo(parentFolder,'TotalUserControl');

    info.contents = stripSpaces(info.contents);

    if(!info.contents.includes('start'))
      return helper.fail('You must use the Console Write to ask the user to enter the starting value!');

    if(!info.contents.includes('stop'))
      return helper.fail('You must use the Console Write to ask the user to enter the stopping value!');


    if(!info.contents.includes('Console.ReadLine()')){
      return helper.fail('You need to ask the user for the inputs: the starting value,the stopping value and the count up or down option');
    }


    //must use loop
    if(!hasLoop(info.contents))
      return helper.fail('You must use loop in your program! You can use the following loops, for, while, foreach');

    //checking for the count up or count down options
    if(!info.contents.includes("1") || !info.contents.includes("2"))
      return helper.fail("You must show the user the 1. Count Up and 2. Count down options!");


    if(info.contents.includes('56') || info.contents.includes('57') || info.contents.includes('58') || info.contents.includes('59'))
      return helper.fail("You hardcoded the values. You cannot do that, you must use a for loop");

    //testing invalid starting number
    let command =  `${dotnetExecutionBinary()} run --project ${info.project}`;
    let runResults = await test_inputs(15, command, [-55]);

    let res = stripSpaces(runResults);

    if(!res.includes(stripSpaces("The starting value cannot have negative number"))){
      return helper.fail('Your program must show "The starting value cannot have negative number" if the user enter a negative value for the starting number');
    }

    if(res.toLowerCase().includes('countup'))
      return helper.fail('Your program must not show the counts and count up or down menu options if the user enter an invalid starting value');


    //testing invalid stopping number
    runResults = await test_inputs(15, command, [1,-55]);
    res = stripSpaces(runResults);

    if(!res.includes(stripSpaces("The stopping value cannot have negative number"))){
      return helper.fail('Your program must show "The stopping value cannot have negative number" if the user enter a negative value for the starting number');
    }

    if(res.toLowerCase().includes('countup'))
      return helper.fail('Your program must not show the counts and count up or down menu options if the user enter an invalid stopping value');

    //testing invalid selection from the menu
    //testing invalid selection for count up/count down option
    runResults = await test_inputs(15, command, [800,805,"P"]);
    if(!stripSpaces(runResults).includes(stripSpaces("Invalid counter option selected! Please select the option 1 or 2")))
      return helper.fail('Your program must show "Invalid counter option selected! Please select the option 1 or 2" if the user select an invalid counting option');

    //all is well so we can test valid aprproach
    //test the count up first
    runResults = await test_inputs(15, command, [800,900,1]);

    let lines = runResults.split("\n");

    if(!lines || lines.length === 0)
      return helper.fail('cannot parse the output from your program');


    for(let i = 800; i<= 900; i++){
      let match = lines.find(element=>{
        if(element.includes(i))
          return true;
      })
      if(!match){
        return helper.fail(`Your program is missing ${i} from the counter!`);
      }

    }

    //testing the countdown
    runResults = await test_inputs(15, command, [800,900,2]);

    lines = runResults.split("\n");

    if(!lines || lines.length === 0)
      return helper.fail('cannot parse the output from your program');


    for(let i = 900; i>800; i--){
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


  helper.success("Hooray!!! You nailed this!!!");

};
