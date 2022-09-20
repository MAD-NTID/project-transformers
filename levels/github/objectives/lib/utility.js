const util = require('util');
const {default: axios} = require("axios");
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const procexec = require('child_process').exec;
const kill  = require('tree-kill');
const os = require("os");

const path = require('path');

async function log(content, trace){
    let logFile = path.resolve(__dirname, '../../../../logs/log.txt');

    let log = new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true }) + ' - ' + content + '\n';
    if(trace)
        log+='stack trace:' + trace + '\n';

    await fs.appendFile(logFile, log, function(err) {
        if(err)
            throw err;

        console.log('log saved!');

    });
    //await fs.appendFile()
}

async function getInputsFromFile(filename){
    let inputPath = path.resolve(__dirname, '../../../../inputs');

    if(!filename.includes("/"))
        inputPath = path.resolve(inputPath, filename);
    else{
        let items = filename.split("/");
        for(let i = 0;i < items.length; i++)
            inputPath = path.resolve(inputPath,items[i]);
    }
    const result = await readFileAsync(inputPath);
    return result.split("\n");
}

async function readFileAsync(filename){
    return new Promise((resolve, reject)=>{
      fs.readFile(filename, 'utf-8', (err, data)=>{
        if(err)
          reject(new Error(err));
          
        resolve(data);
      })
    })
  }

async function dotnet(command)
{
    let dotnet = 'dotnet ';
    if(process.platform==='darwin')
        dotnet = '/usr/local/share/dotnet/dotnet ';

    const { stdout, stderr } = await exec(`${dotnet} ${command}`);
    if(stderr)
        throw stderr;
    return stdout;
}

function dotnetExecutionBinary(){
    let execution = 'dotnet';
    if(process.platform === 'darwin')
        execution = '/usr/local/share/dotnet/dotnet'

    return execution;
}

async function git(command)
{
    const { stdout, stderr } = await exec(`git ${command}`);
    if(stderr)
        throw stderr;
    console.log(stdout);
    return stdout;
}

async function checkGithubUsername(username)
{
    if(!username)
        throw "Please provide your github username";


    try{
        const response = await axios.get(`https://api.github.com/users/${username}`);
        if(response.status===200)
            return true;

        throw `We couldn't find the GitHub user, ${username}. Is there a typo in the username?`;
    }catch(err){
        if(err.response.status===404)
            throw `We couldn't find the GitHub user, ${username}. Is there a typo in the username? Make sure you sign up for github, verified your email before entering it in the box here`;
        throw err;
    }

}

function cleanPath(path){
    if(process.platform==='win32' && path.includes('/c/'))
        return path.substring(2);

    return path;
}

function isFolderExist(path)
{
    if(!path)
        throw "Please provide the path!";
    path = cleanPath(path);
    console.log(path);
    if(!fs.existsSync(path))
        throw 'Invalid path! the path is not a folder and doesnt exist!';
}


async function wait(seconds) 
{
    let ms = seconds * 1000;
    return new Promise((_, reject) => {
       setTimeout(() => reject(new Error('input testing timeout!')), ms);
    });
}

async function child_process_inputs(child, inputs)
{
    return new Promise((resolve, reject)=>{
        let contents = '';
        let errors = '';
        let index = 0;



        
        child.stdout.on('data', (data)=>{
            contents+=data;
            //any remaining inputs from our tests?
            if(index < inputs.length)
            {
                child.stdin.write(inputs[index] + '\n');
                index++;
            }
            
        });

        child.stderr.on('data', (data)=>{
            errors+=data
        });

        child.on('exit', ()=>{
            process.stdin.destroy();
            if(errors)
                reject(new Error(errors));
            else
                resolve(contents);
        })

        
     
    })
}

async function test_inputs(timeout_in_second, cmd, inputs)
{
    let child = procexec(cmd);
    try{

        return await Promise.race([wait(timeout_in_second),child_process_inputs(child, inputs)]);
    }catch(err) {
        if(err.message.includes('timeout')) {
            throw 'Your program timed out. You might have more inputs than required or your program hangs';
        }

        kill(child.pid);
        throw err;
    }
}

async function run_test_cases_from_file(command, timeout_in_second,input_test_cases_file)
{

    let inputs = await getInputsFromFile(input_test_cases_file);
    let res = await test_inputs(timeout_in_second, command, inputs);

    return {
        output: res,
        inputs: inputs
    }

}

module.exports = {
    dotnet,
    git,
    checkGithubUsername,
    isFolderExist,
    dotnetExecutionBinary,
    test_inputs,
    readFileAsync,
    wait,
    child_process_inputs,
    log,
    getInputsFromFile,
    run_test_cases_from_file
}

