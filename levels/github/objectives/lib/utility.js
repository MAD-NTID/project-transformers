const util = require('util');
const exec = util.promisify(require('child_process').exec);

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

async function git(command)
{
    const { stdout, stderr } = await exec(`git ${command}`);
    if(stderr)
        throw stderr;
    console.log(stdout);
    return stdout;
}

function cleanPath(path){
    if(process.platform==='win32' && path.includes('/c/'))
        return path.substring(2);

    return path;
}

module.exports = {
    dotnet,
    git
}

