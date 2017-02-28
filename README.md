# Kokovoko Farm Website Redesign

This repository contains the source files for the new Kokovoko Farm website.
The project was undertaken as part fo ICT 4505 Website Design and Management, a
course offered through University College of the University of Denver.

## Directories

The source files for the site are contained in the `public` directory.

I like to write my JavaScript in the ECMAScript 6, but there are plenty of 
old browsers out there that need 5.1, so my local site development is set up
to automatically "transpile" my Javascript 6 file (see `public/_dist/custom.js`)
into the version 5.1 file (see `public/js/custom-5.js`) that is actually inserted
into web pages.  For this I require the node program [Babel](https://babeljs.io/),
hence the presence of the `node-modules` directory and the accompanying file
`package.json`.

The `www` directory contains the actual web-pages that are produced from
the source material by my static-site generator.

## Site-Generator

To generate the site I'm using [Harp.js](https://harpjs.com/).  If from the root
of the project I run the command

```
harp server public
```

then the site is available in my brower at the default URL `localhost:9000`.

When I am happy with the my changes I generate a new version
of the `www` folder with the command:

```
harp compile public ./www
```

Then I'm ready to deploy the updated site.

## Deployment

Currently I'm using 
[Surge,sh](https://surge.sh/), so at the command line I simply type:

```
surge ./www
```

and the site is deployed.  Currently the deployment URL is:

[http://gotlands.surge.sh](http://gotlands.surge.sh)