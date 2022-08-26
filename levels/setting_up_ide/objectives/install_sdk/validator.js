/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { shellCorrectVersion} = require("../lib/shell_helper");

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

  if(!answer1 || answer1!=='6') {
    return helper.fail('Incorrect, that is not the correct version');
  }

  try{
    let command = 'dotnet';
    //mac have the dotnet executable at a specific location and the symlink doesnt seems to be available when calling through script
    if(process.platform==='darwin')
      command = '/usr/local/share/dotnet/dotnet';

    shellCorrectVersion(`${command} --version`);
  } catch (e){
    if (e!=='Wrong version installed'){
      e =  `Incorrect. SDK not installed. Please install the SDK`
    }
    return helper.fail(e);
  }



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
