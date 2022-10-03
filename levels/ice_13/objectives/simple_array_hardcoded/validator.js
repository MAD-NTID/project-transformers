// /*
// In your validation code, you can require core Node.js modules,
// third-party modules from npm, or your own code, just like a regular
// Node.js module (since that's what this is!)
// */
const assert = require("assert");
const R = require("ramda");
const {isFolderExist, dotnet, dotnetExecutionBinary, getInputsFromFile, test_inputs, log, run_test_cases_from_file,
  readFileAsync
} = require("../../../github/objectives/lib/utility");
const path = require('path');

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



  //attempt to compile the project
  try{
      const { answer1} = helper.validationFields;
      let projectName = 'SimpleArrayHardcoded';
      let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_13_CLASSROOM;
      let project = path.resolve(parentFolder,projectName);
      let fullPath = path.resolve(project,'Program.cs');
      console.log(project);

    //does the project exist?
    isFolderExist(project);
    let programFile = await readFileAsync(fullPath);

    //do some basic validations to make sure the stuff we asked for are there
    let declarationRegex = /int\[\]\s+numbers\s*=\s*new\s+int\[10\]\s*;/gm;

    if(!programFile.match(declarationRegex))
      return helper.fail('Incorrect array variable declaration!');

    if(!programFile.includes('Console.WriteLine') && !programFile.includes('Console.Write'))
      return helper.fail('Missing Displaying the result to the user via the console!');

    let contents =programFile.replace(' ', '');

    console.log(contents);

    if(!contents.includes('numbers[0]='))
      return helper.fail('you must assign values by putting in the index eg. variableName[0]=YourValue;');

    if(!contents.includes('Console.WriteLine(numbers[0])') && !contents.includes('Console.Write(numbers[0])'))
      return helper.fail('You must use include the variable name and index to display the result to the console');

    await dotnet(`build ${project}`); //compile

    return helper.success('Yay!!!');


  }catch(err){
    await log(err);
    return helper.fail(err);
  }



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
