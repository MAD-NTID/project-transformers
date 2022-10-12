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
    let info = await projectInfo(parentFolder,'UserDefinedArraySize');

    info.contents = stripSpaces(info.contents);

    //must declare array
    if(!info.contents.includes('[]') || !info.contents.match(/\[[a-z]+\]/gm))
      return helper.fail('You must declare an array to hold the number of names the user entered. The size of the array must be the size input by the user');

    //must use loop
    if(!hasLoop(info.contents))
      return helper.fail("You MUST use loop.It can be any type of loop");

    //must prompt for enter your name
    if(!info.contents.includes('Enteryourname:'))
      return helper.fail("You must prompt the user to enter their name with the following words,Enter your name:")

    //must prompt for input
    if(!info.contents.includes('Console.ReadLine()'))
      return helper.fail("You must get the name from the user through ReadLine!");

    //checking for hard coded
    let hardcoded = info.contents.toLowerCase().match(/enteryourname:/gm);
    if(hardcoded && hardcoded.length > 1)
      return helper.fail("You cannot hardcoded the prompts. You must use loop!");


    //the basics seems to be up so we can just test?
    let inputs = [
        13,
        "Kenya Ali",
        "Darrin Ferguson",
        "Sterling Serrano",
        "Royce Hendricks",
        "Leigh Bennett",
        "Stacie Lewis",
        "Carrie Cross",
        "Nicholas Rivas",
        "Addie Stevenson",
        "Annie Hubbard",
        "Guadalupe Mason",
        "Berta Merritt",
        "Gene Morgan"
    ];


    let command =  `${dotnetExecutionBinary()} run --project ${info.project}`;
    let runResults = await test_inputs(15, command, inputs);

    for(let input of inputs){
        if(input!==13) // 13 is the size of the array
            if(!runResults.includes(input))
                return helper.fail("We test your program with 13 names and one or more of the names was not found in the array output");
    }



  }catch(error){
    return helper.fail(error);
  }


  helper.success("Hooray!!!");

};
