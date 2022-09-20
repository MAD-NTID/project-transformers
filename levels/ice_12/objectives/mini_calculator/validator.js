/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {isFolderExist, dotnet, readFileAsync, getInputsFromFile, test_inputs, dotnetExecutionBinary, log} = require("../../../github/objectives/lib/utility");
const path = require("path");
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
  const { answer1 } = helper.validationFields;

  let projectName = 'MiniCalculator'
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_12_CLASSROOM;
  let project =  path.resolve(parentFolder, projectName);
  let ifRegex = /\s*if\s*\(/gi;


  //attempt to compile the project
  try{
    //does the project exist?
    isFolderExist(project);
    let data = await readFileAsync(path.resolve(project,"Program.cs"));
    if(!data.includes("int.TryParse") && !data.includes("double.TryParse"))
      return helper.fail("are you forgetting TryParse?");
    let acceptables = ["const", "ADD", "SUB", "MUL", "DIV"];

    for(let i = 0; i< acceptables.length; i++){
      if(!data.includes(acceptables[i]))
        return helper.fail("Are you forgetting something? hint: "+ acceptables[i]);
    }

    if(!data.includes("switch") || !data.includes("case"))
      return helper.fail("You must implement switch");

    if(!data.includes("when"))
      return helper.fail("You must use when in this exercise");

    if(!data.match(ifRegex))
      return helper.fail('You must implement an if statement(s) in this exercise')

     
    await dotnet(`build ${project}`); //compile

    //testing the inputs
    let inputs = await getInputsFromFile('MiniCalculator/addInput.txt');
    log(inputs)
    let res = await test_inputs(5, `${dotnetExecutionBinary()} run --project ${project}`, inputs);
    await log(res);

    if(!res.replace(/ /g,"").includes("MINICALCULATORVERSION3.0"))
      return helper.fail("You must show MINI CALCULATOR VERSION 3.0 as the title of the calculator!");

    let num1 = Number(inputs[1]);
    let num2 = Number(inputs[2]);

    console.log(res);

    if(!res.includes(num1+num2) || !res.includes(num1) || !res.includes(num2))
      return helper.fail("Your program didnt passed the input test for add!");


    return helper.fail("place holder");

  }catch(err){
    log(err, err.stackTrace);
    return helper.fail(err);
  }



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
