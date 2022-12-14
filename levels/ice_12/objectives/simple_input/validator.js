/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {isFolderExist, dotnet, dotnetExecutionBinary, getInputsFromFile, test_inputs, log, run_test_cases_from_file} = require("../../../github/objectives/lib/utility");
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
          //console.log(data);
          if(!data.includes("$"))
            reject(new Error("You must use string interpolation technique!"));
          if(!data.includes('int.TryParse'))
            reject(new Error("Are you forgetting TryParse?"));
          if(data.match(ifRegex)) 
            reject(new Error('You cannot use if statements!'));

          if(!data.includes('switch') || !data.includes('case') || !data.includes('break'))
            reject(new Error('YOu must use switch with case(s) and break!'))
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

    //testing the inputs
    let filename = 'SimpleInputs/validInput.txt';
    let command =  `${dotnetExecutionBinary()} run --project ${project}`;
    let timeout_in_second = 10;

    let res = await run_test_cases_from_file(command, timeout_in_second, filename);

    let out = res.output.toString();
    console.log(out);

    let name = res.inputs[0];
    name = name.replace("\n", '');
    name = name.replace("\r", '');

    console.log(name);
    console.log(out.includes(name));
    console.log(out.includes(res.inputs[1]));
    console.log(out.includes(parseInt(res.inputs[1]) + 5));

    if(!out.includes(name) || !out.includes(res.inputs[1]) || !out.includes(parseInt(res.inputs[1]) + 5))
      return helper.fail("Your program did not pass the input test!");

    //testing invalid input
    filename = 'SimpleInputs/badInput.txt'
    await run_test_cases_from_file(command, timeout_in_second, filename);



  }catch(err){
    await log(err);
    if(err.message.hasOwnProperty('toString') && err.message.toString().toLowerCase().includes('input string was not in a correct format'))
      return helper.fail("Your program didn't pass the test case when a bad input was entered for age. Hint: use try parse to verify before attempting to convert");
    return helper.fail(err);
  }



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
