/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {isFolderExist, dotnet, readFileAsync} = require("../../../github/objectives/lib/utility");
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
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_11_CLASSROOM;

  let project = path.resolve(parentFolder, projectName);


  //attempt to compile the project
  try{
    //does the project exist?
    isFolderExist(project);
    let data = await readFileAsync(path.resolve(project,"Program.cs"));
    if(!data.includes("int.TryParse"))
      return helper.fail("Are you forgetting a try parse?")
    await dotnet(`build ${project}`); //compile

  }catch(err){
    return helper.fail(err);
  }


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
