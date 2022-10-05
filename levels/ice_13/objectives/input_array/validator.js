// /*
// In your validation code, you can require core Node.js modules,
// third-party modules from npm, or your own code, just like a regular
// Node.js module (since that's what this is!)
// */
const assert = require("assert");
const R = require("ramda");
const {isFolderExist, dotnet, dotnetExecutionBinary, getInputsFromFile, test_inputs, log, run_test_cases_from_file,
  readFileAsync, stripSpaces, hasLoop
} = require("../../../github/objectives/lib/utility");
const path = require('path');
const {contains} = require("ramda");

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
      let projectName = 'ArrayInputSimple';
      let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_13_CLASSROOM;
      if(!parentFolder)
          return helper.fail("Did you forget to clone the github classroom?");

      let project = path.resolve(parentFolder,projectName);
      let fullPath = path.resolve(project,'Program.cs');

      //read the program file
      //does the project exist?
      isFolderExist(project);
      let programFile = await readFileAsync(fullPath);


      console.log(programFile);

      //array declaration
      let declarationRegex = /string\[\]\s+[a-z]+(?:[A-Z][a-z]+)*\s*=\s*new\s*string\[5\]\s*;/gm;

      programFile = stripSpaces(programFile);
      //mandate approprate data type and array declaration
      if(!programFile.match(declarationRegex))
          return helper.fail('You must declare an array to hold 5 family members with the appropriate data type');

      //mandate input
      if(!programFile.includes('Console.ReadLine()'))
          return helper.fail('Your program must take inputs from the user!');

      //probhit for loop
      if(hasLoop(programFile))
          return helper.fail('You are not allowed to use loop!');

      //we need at least
      if(programFile.match(/Console.Write\(".+"\);/gm).length>=5)
          return helper.fail("You need 5 Console.Write() to take the inputs from the user for each family members");

      if(programFile.match(/Console.WriteLine\(".+"\);/gm).length>=7)
      return helper.fail("You need at least 7 Console.WriteLine to ouput the final result based on the screenshot")

      //test the program with inputs
      return helper.fail("we made it here");






  }catch(err){
    await log(err);
    return helper.fail(err);
  }


};
