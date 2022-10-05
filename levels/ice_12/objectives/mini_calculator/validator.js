/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");
const {isFolderExist, dotnet, readFileAsync, getInputsFromFile, test_inputs, dotnetExecutionBinary, log, run_test_cases_from_file} = require("../../../github/objectives/lib/utility");
const path = require("path");
const {toString} = require("ramda");
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

    let filename = 'MiniCalculator/addInput.txt';
    let command =  `${dotnetExecutionBinary()} run --project ${project}`;
    let timeout_in_second = 10;

    let res = await run_test_cases_from_file(command, timeout_in_second, filename);

    console.log(res);
    console.log(res.output);
    console.log(res.inputs);



    if(!res.output.toString().replace(/ /g,"").includes("MINICALCULATORVERSION3.0"))
      return helper.fail("You must show MINI CALCULATOR VERSION 3.0 as the title of the calculator!");


    let num1 = parseInt(res.inputs[1]);
    let num2 = parseInt(res.inputs[2]);


    if(!res.output.includes(num1+num2) || !res.output.includes(num1) || !res.output.includes(num2))
      return helper.fail("Your program didnt passed the input test for add!");

    //testing the subtract
    filename = 'MiniCalculator/subtractInput.txt';
    res = await run_test_cases_from_file(command, timeout_in_second, filename);
    console.log(res);
    num1 = parseInt(res.inputs[1]);
    num2 = parseInt(res.inputs[2]);

    if(!res.output.includes(num1-num2) || !res.output.includes(num1) || !res.output.includes(num2))
      return helper.fail("Your program didnt passed the input test for subtract!");

    //testing multiply
    filename = 'MiniCalculator/multiplyInput.txt';
    res = await run_test_cases_from_file(command, timeout_in_second, filename);
    console.log(res);
    num1 = parseInt(res.inputs[1]);
    num2 = parseInt(res.inputs[2]);

    if(!res.output.includes(num1*num2) || !res.output.includes(num1) || !res.output.includes(num2))
      return helper.fail("Your program didnt passed the input test for multiply!");

    //test divide
    filename = 'MiniCalculator/divideInput.txt';
    res = await run_test_cases_from_file(command, timeout_in_second, filename);
    console.log(res);
    num1 = parseInt(res.inputs[1]);
    num2 = parseInt(res.inputs[2]);

    if(!res.output.toString().includes(num1/num2) || !res.output.toString().includes(num1) || !res.output.toString().includes(num2))
      return helper.fail("Your program didnt passed the input test for divide!");

    let intException = 'input string was not in a correct format';

    //testing a string as input for menu 1-4
    filename = 'MiniCalculator/notaNumberAsMenuChoice.txt';
    res = await run_test_cases_from_file(command, timeout_in_second, filename);
    if(res.output.toString().toLowerCase().includes(intException))
      return helper.fail("your program didnt passed the input test for when the user enter a string was tested from the menu 1-4");

    //testing submitting non digit for number 1 and number 2 for menu 1-4
    await test_inputs(timeout_in_second, command, [1,"a","b"]);
    await test_inputs(timeout_in_second, command, [2,"a","b"]);
    await test_inputs(timeout_in_second, command, [3,"a","b"]);
    await test_inputs(timeout_in_second, command, [4,"a","b"]);


    //testing divide by 0 - do not remove this line. The exception is caughted in the try and return appropriately
    filename = 'MiniCalculator/illegalDivideByZero.txt';
    res = await run_test_cases_from_file(command, timeout_in_second, filename);


  }catch(err){
    if(err.hasOwnProperty('toString')){
      if(err.message.toString().includes('System.DivideByZeroException'))
        return helper.fail('Your program didnt passed the input test when we tested divisible by zero for the second number for option 4');
      else if(err.message.toString().toLowerCase().includes('input string was not in a correct format'))
        return helper.fail('Your program didnt passed the input test when a string was entered for an int or double variable. Are you forgetting tryparse for the input?');
      else if(err.message.toString().toLowerCase().replace(/ /g,"").includes('commandfailed:dotnetbuild'))
        return helper.fail('We were not able to compile the project due to syntax error(s)');
    }

    return helper.fail(err);
  }



  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it!
  `);
};
