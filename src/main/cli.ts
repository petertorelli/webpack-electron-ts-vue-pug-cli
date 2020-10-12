/**
 * Electron breaks STDIN on Windows so we cannot do a portable REPL. Instead,
 * the CLI accepts a run script or multiple single commands (one per param).
 */

import Framework from '../framework'
import { Argv } from 'yargs'

export default class CLI {
    constructor (yargs: Argv, framework: Framework) {
    }
}
