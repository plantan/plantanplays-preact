# plantanplays-preact

This is a learning project for getting into web development. It's a Single Page Application that displays all of the games I've finished or completed. I'm using Bun as http server and bundler, and Preact for UI. I'm also using TypeScript for the backend code as well as for the frontend (TSX).

## Install & Run
1. After cloning this repo, install [Bun](https://www.bun.sh).
1. Start a command line tool, and go to the root folder of the repo clone. 
1. Run `bun install`
1. Run `bun http.ts`
1. Done! You should have the web page served on http://localhost:3000.

## Project Structure
At the root level you will find the main entry point for the web page, http.ts and index.html, as well as config files for TypeScript and Bun package dependencies. Let's go through the file structure in detail...

### root `(./)`

#### index.html
Entry point for the web application. It's basically just a html base with a `div` where we later mount the Preact root component.

#### http.ts
Starts the HTTP server, and bundles the web page (we'll go through what _bundling_ is further down in the readme).

#### tsconfig.json
Specifies compiler options for TypeScript. There's a myriad of options to pick from, and the ones in my config file mainly comes from the template provided when running `bun init`.

There's also some import mappings in there to get rid of ugly absolute paths when importing assets/modules from Preact components located further down the directory structure. Have a look at `import { App } from '@components/app.tsx'` in `main.tsx`, where `@components` is a path alias for `./src/components`. This is all thanks to the `paths` section in the tsconfig.json file. 

#### package.json
Lists all packages we need for running the web application. When running `bun install`, bun will read this config and download any dependency, and recursive dependency, to a folder called node_modules.

#### bun.lock
A `bun.lock` file is generated after running `bun install`, storing the exact version of any downloaded package. It's a good idea to submit this file to version control, making sure that any other dev contributing to the project uses the exact same version of the packages as on your machine.

### assets `(./assets)`
Various resources that we load from the page, such as images, svg's and json data.

### src (./src)
`.tsx` files for defining Preact components. `main.tsx` mounts the root component `App` to the `app` div, and the rest is built from the component hierarchy. By "component hierarchy", I refer to the structure that Preact components inherently live by, i.e. the `App` root component will load the `Grid` component, which in turn will load `Card` components, etc, effectively building a hierarchy of components.

## Bundling
It's quite difficult to define what bundling is in web development, since it tries to solve multiple problems. A Bundler can...
1. Take care of combining logic into fewer javascript files.
1. Transpile `.JSX`, `.TSX`, `.SCSS`, `.TS`, etc, into javascript that the browser can read and execute.
1. Inline assets such as .svg straight into javascript.
1. Strip unused code and minify resulting javascript bundles.
1. Probably other stuff too that I still don't quite have grips on...

As far as I understand, a bundler works by being given an entry point, usually `index.html` or a `index.ts`. From there, it starts to "crawl" the code, looking for html elements such as `img`, `link` etc, and javascript imports, and builds a dependency hierarchy. Using that, it can then figure out which files to combine, what needs to be transpiled, which files needs to be moved without being processed, etc. 

I've noticed that we sometimes need to be explicit for the bundler to identify dependencies. Have a look at `./src/app.tsx`. There, it wasn't enough specifying the path for the banner in the `img` element for the component template. Instead, I had to "import" the image with `import bannerUrl from "@assets/banner.webp";`, which properly lets the bundler know that banner.webp is part of the component's dependencies, and has it be considered when copying files around when rendering the bundle.
