const util = require('util');
const {default: axios} = require("axios");
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');

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
    return process.platform==='darwin' ? '/usr/local/share/dotnet/dotnet ' : 'dotnet ';
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

module.exports = {
    dotnet,
    git,
    checkGithubUsername,
    isFolderExist,
    dotnetExecutionBinary
}

