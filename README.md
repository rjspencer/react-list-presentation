# Dear React, Please Render My List Faster

The web is eating the world, and our applications need to keep up. Users expect web applications to react as quickly as desktop applications. Large lists composed of many DOM elements are a common slowdown. Why do slow list renders happen? How can we identify such performance issues? How can we fix our lists so they load as fast as our users expect?

## Why are lists slow?

React devs are quick to look at their map, filter, and reduce functions when a list is slow. Every programmer knows that too many loops will cause performance issues, but is that really it?

To answer this question, first we must remember what React does. React is a render library. Your code determines how the Document Object Model (DOM) should look and React makes it happen. The browser takes the DOM and converts it into the pretty UI you want to show to the user.

Updating the DOM is relatively slow. React seeks to improve display speed by keeping its own internal representation of the DOM. Instead of updating the whole document, React filters down to just the elements with changes and selectively updates only the DOM elements it needs to. React can speed up DOM updates, but not so much for large, brand-new sections being added to the DOM.

Lists and tables can quickly increase the number of DOM elements on a page. Think about how many divs a single card in a list of vehicles can have, between its make, model, year, image and container, getting to 5 elements is easy. Surely, many of you have worked on far more complicated list items. If you display 20 cards, your DOM is getting (5\*20) 100 elements injected at one time. Is 100 a lot? No, not really, but you can see how the multiplication of these two factors can quickly grow into seriously large numbers.

---

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
