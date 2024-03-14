# 📚 houdainbrary

A simple web application to search for books using [openlibrary.org API.](https://openlibrary.org/developers/api) and [wikipedia API](https://www.mediawiki.org/wiki/API:Main_page).

## Local setup

Firstly, you need to clone the repository and install the dependencies.

```bash
git clone
cd houdainbrary
npm install
```

Then, you need to create a `.env` file in the root of the project and add the following environment variables:

```env
REACT_APP_OPENLIBRARY_API_URL=https://openlibrary.org
REACT_APP_WIKIPEDIA_API_URL=https://en.wikipedia.org/w/api.php
```

After that, you can run the application using the following command:

```bash
npm run start
```

## Available scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Documentation

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [openlibrary.org API documentation](https://openlibrary.org/developers/api).
- [wikipedia API documentation](https://www.mediawiki.org/wiki/API:Main_page).
