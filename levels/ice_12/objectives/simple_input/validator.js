/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {isFolderExist, dotnet, dotnetExecutionBinary} = require("../../../github/objectives/lib/utility");
const {spawn} = require("child_process");
const path = require('path');
const fs = require('fs')

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/

let ifRegex = /\s*if\s*\(/gi;

async function readFileAsync(filename){
  return new Promise((resolve, reject)=>{
    fs.readFile(filename, 'utf-8', (err, data)=>{
      if(err)
        reject(new Error(err));
      else
        {
          console.log(data);
          if(!data.includes("$"))
            reject(new Error("You must use string interpolation technique!"));
          if(!data.includes('int.TryParse'))
            reject(new Error("Are you forgetting TryParse?"));
          if(data.match(ifRegex)) 
            reject(new Error('You cannot use if statements!'));
          resolve(data);
        }
    })
  })
}
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1} = helper.validationFields;
  let projectName = 'SimpleInputs'
  let parentFolder = helper.env.TQ_GITHUB_CLONE_PATH_ICE_12_CLASSROOM;
  let project = path.resolve(parentFolder,projectName);
  let fullPath = path.resolve(project,'Program.cs');
  console.log(project);


  //attempt to compile the project
  try{
    //does the project exist?
    isFolderExist(project);
    await readFileAsync(fullPath);
    await dotnet(`build ${project}`); //compile
  
    //console.log("got here?")
    //

  }catch(err){
    return helper.fail(err);
  }

  // //interact with the program
  // const spawn = require('child_process').spawn;
  // const child = spawn(`${dotnetExecutionBinary()} run --project ${project}`);
  //
  //
  // child.stdout.on('data', (data) => {
  //   helper.fail(data);
  //   console.log(`stdout: "${data}"`);
  // });
  //
  // child.stdin.write("Kemoy Campbell\n");
  // //child.stdin.end(); // EOF
  //
  // child.on('close', (code) => {
  //   console.log(`Child process exited with code ${code}.`);
  // });


  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
