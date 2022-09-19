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
  const { answer1} = helper.validationFields;
  let projectName = 'PasswordDecision'
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_12_CLASSROOM;

  let project = path.resolve(parentFolder, projectName);
  let ifRegex = /\s*if\s*\(/gi;

  //attempt to compile the project
  try{
    //does the project exist?
    isFolderExist(project);
    let data = await readFileAsync(path.resolve(project,"Program.cs"));
    if(!data.includes("int.TryParse"))
      return helper.fail("Are you forgetting a try parse?");

    if(!data.includes('switch') || !data.includes('case'))
      return helper.fail("You must use switch in this program!");
    
    if(!data.match(ifRegex))
      return helper.fail('You are missing if statement(s)');

    await dotnet(`build ${project}`); //compile

    //testing the inputs
    let inputs = await getInputsFromFile('PasswordDecision/validInputs.txt');
    let res = await test_inputs(5, `${dotnetExecutionBinary()} run --project ${project}`, inputs);

    if(!res.includes('Welcome Tony Stark!'))
      return helper.fail("Your program must print Welcome Tony Stark! if the user enter the correct username and password");

    //testing bad data
    inputs = await getInputsFromFile('PasswordDecision/badInputs.txt');
    res = await test_inputs(5, `${dotnetExecutionBinary()} run --project ${project}`, inputs);
    //await log(res);

    //testing invalid username or password
    inputs = await getInputsFromFile('PasswordDecision/invalidUsernameOrPassword.txt');
    res = await test_inputs(5, `${dotnetExecutionBinary()} run --project ${project}`, inputs);
    await log(res);
    if(!res.includes("Incorrect username or password!"))
      return helper.fail("You must show Incorrect username or password! if the user didnt enter the correct password or username");



  }catch(err){
    if(err.message.toLowerCase().includes('input string was not in a correct format'))
      return helper.fail("Your program didn't pass the test case when a bad input was entered for the password. Hint: use try parse to verify before attempting to convert");
    return helper.fail(err);
  }


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
