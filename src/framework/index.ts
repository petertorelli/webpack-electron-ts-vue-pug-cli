/**
 * This wrapper loads the framework into its own process and then connects
 * the input source and output sink to the command parser and GMB,
 * respectively.
 * 
 * NOTES:
 * The packager we are currently using for electron (electron-webpack) can
 * put the worker-thread.js in a different location depending on whether
 * we are in developer mode or production mode. Hence the path searching.
 */
import * as child_process from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export default class Framework {
    private worker: child_process.ChildProcess|null = null;
    constructor (/* input source, output sink */) {
        // Figure out where electron-webpacker put the worker!
        let cwd: string|undefined = path.join(__dirname, '..')
        let cp_path = 'app.asar/worker-thread.js'
        if (fs.existsSync(path.join(cwd, 'app.asar')) === false) {
            cp_path = './dist/main/worker-thread.js'
            cwd = undefined
        }
        // Now that we've resolved where it lives...
        this.worker = child_process.fork(cp_path, [], {
            cwd: cwd
        });
        this.worker.on('close', this.workerClose)
        this.worker.on('disconnect', this.workerDisconnect)
        this.worker.on('error', this.workerError)
        this.worker.on('exit', this.workerExit)
        this.worker.on('message', this.workerMessage)
        //this.worker.send("start");
    }
    public destructor () {
        if (this.worker) {
            console.log("Killing worker")
            this.worker.kill();
        } else {
            console.log("Worker was already killed");
        }
    }
    private workerClose (code: number) {
        console.log('Worker closed, code:', code);
    }
    private workerDisconnect () {
        console.log('Worker disconnected')
    }
    private workerError (error: Error) {
        console.error('Worker error:', error)
    }
    private workerExit (code: number|null, signal: any) {
        console.log('Worker exit, code:', code, ', signal:', signal)
    }
    private workerMessage (message: child_process.Serializable) {
        console.log('Worker message', message)
    }
}
