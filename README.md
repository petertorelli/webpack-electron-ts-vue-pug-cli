I finally got ElectronJS, Webpack@4, TypeScript, VueJS@2, Pug, Webworkers, and a CLI/GUI switchable project to not give me errors under VSCode.

Let's see how long this lasts without package contortions.

Things that threw me:

1. `electron-webpack` creates a `main` and `renderer` entry, and they both need their own `package.json` webpack configs.
2. To prevent VSCode from complaining about `*.vue` modules not found, I had to add a shim, which I still don't quite understand.
3. Still can figure out how to make `yarn dev` HMR understand that the worker thread needs to be re-forked if the source code changes.
