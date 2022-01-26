# React Demo Project with JSON Server and Storybook

This project shows the basic features associated with creating a vanilla React application capable of organizing features into separate pages using a Single Page Application (SPA) approach.

The Api layer uses JSON Server to authentication and to-do operations.

Although this project uses Bootstrap, via CDN (i.e **not** React Bootstrap), for styling of components; all reusable elements (Alert, Button, Card, Modal, Pager, and Toast) were created to demonstrate React props and state management.

Finally the UI testing and documentation is handled by Storybook.

## How to Use

Open the .env file and set the environment variable for REACT_APP_API_ADDRESS to point to the JSON Server endpoint. A default database is included in the src/data/db.json path.

Configure the JSON Server (see 'Scripts' section of package.json) database file location and default port.

Run an npm install or update
```
npm i
```

This project uses npm-run-all to start up scripts in parallel. Start JSON Server and React separately or optionally run
```
npm run start
```

Start the JSON Server server separately by using
```
npm run start:json-server
```

Start the React instance separately by using
```
npm run start:react-scripts
```

Then navigate to the default React location http://localhost:3000

## Storybook Testing and Documentation

This project includes an instance of Storybook which can be started by
```
npm run storybook
```

Then navigate to the default Storybook location http://localhost:6006

## Deploying to Azure

In the General settings tab within the Configuration blade, add the following Startup Command
```
pm2 serve /home/site/wwwroot --no-daemon --spa
```

Then deploy the build folder after running the following command
```
npm build
```

## Copyright and Ownership

All terms used are copyright to their original authors.

## Live Demo

Live demo hosted in Microsoft Azure [React Demo Project](https://dev-react-demo-re01.azurewebsites.net/) and [Storybook UI Documentation](https://dev-react-demo-storybook-re01.azurewebsites.net/).

Azure F1 instances are :snowflake: ice cold. Those first loads are going to need some :sun_with_face: warming up.