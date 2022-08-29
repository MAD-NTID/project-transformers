/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const util = require('util');
const fs = require('fs');
const path = require('path');
const shell = require("../lib/utility");

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
  let clone_path = helper.env.TQ_GITHUB_CLONE_PATH;

  if(!clone_path)
    helper.fail('Missing a step. Go back and perform the clone exercise!');

  //did they create the project?
  let project = 'Octocat2TheMoon';
  let projPath = path.join(clone_path, project);
  console.log(fs.existsSync(projPath));
  if(!fs.existsSync(projPath))
    return helper.fail(`You didn't created the project ${project}`);

  //can we find the Program.cs?
  let programPath = path.join(projPath, 'Program.cs');
  if(!fs.existsSync(programPath))
    return helper.fail(`Cannot locate Program.cs in the ${project}`);

  //matched the console write instructions?
  const data = fs.readFileSync(programPath, 'utf8');
  if(!data.includes(`Console.WriteLine("Houston...")`) || !data.includes(`Console.WriteLine("Sending Octocat, Github's mascot, to space is a go.")`)||
  !data.includes(`Console.WriteLine("T-minus 10, 9, 8…")`) || !data.includes(`Console.WriteLine("Godspeed Octocat!")`)) {
    return helper.fail('Please ensure your program match the Console.WriteLine instructions');
  }

  //are we able to compile it?
  try {
    await shell.dotnet(`run --project ${projPath}`)
  }catch(e)
  {
    return helper.fail(e.toString());
  }


  return helper.success(`Hooray! you are the G.O.A.T! Feed da ego!!!`,  [{ name: "GITHUB_PROJECT_PATH", value: projPath }]);
};
