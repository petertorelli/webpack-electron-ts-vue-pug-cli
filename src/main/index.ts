import CLI from './cli';
import GUI from './gui';
import Framework from '../framework'
import yargs from 'yargs';

let framework = new Framework();

let argv = yargs.option('cli', {
    alias: 'c',
    type: 'boolean',
    description: 'Use the command-line interface (CLI)'
}).argv;

if (argv.cli) {
    console.log('...loading CLI')
    new CLI(yargs, framework)
} else {
    console.log('...loading GUI')
    new GUI(framework)
}

function cleanup () {
    framework.destructor();
    process.exit();
}

process.on('exit', cleanup);
// TODO: test this
process.on('SIGINT', cleanup);
