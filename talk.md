# Dear React, Please Render My List Faster

The web is eating the world, and our applications need to keep up. Users expect web applications to react as quickly as desktop applications. Large lists composed of many DOM elements are a common slowdown. Why do slow list renders happen? How can we identify such performance issues? How can we fix our lists so they load as fast as our users expect?

React is not the major problem. By switching to another view library, like Svelte or Preact, you sacrifice some features and gain some speed, but is that really the solution? If your list render is blocking the DOM for 15 seconds, does cutting the time in half really fix it?

`>>`

## But First, Why Me?

About 5 years ago I was at an edtech, working with the marketing department. I spent a lot of time in CSS, which I love, but the job was hectic. I was constantly building new things, but most of the data was static, or at least built server-side and user-agnostic. I mostly worked in PHP and Twig templates, which was perfect for that. I dabbled in Angular and then the next Angular.

About 5 years ago I moved to React (and Ruby on Rails), working at auto insurance startups. The last few years, I have worked on programs for insurance agents to:

- build rate quotes
- adjustors to estimate repair costs
- rapidly send payments to repair shops.

These web apps replaced installed Windows applications.

`>>`

Since moving to React, it feels like I am always making lists: users, clients, payment history, types of vehicles, cost breakdowns. Yes, I'm going to lump in tables as just another kind of list. Whether the data calls for an `li` or a `tr`, I'm still mapping over an array of objects and adding some decoration.

```js
<ul>
  {collection.map((data) => (
    <Item data={data} />
  ))}
</ul>
```

One project, we had so many lists that we built out the pieces so we basically just added a config object to build out a new list page. After we had the sorting & filtering built into the data fetching hook and the reusable table display component, it was simple. Product expected new page work to take a week, but it took about an hour. We spent the rest of the time playing foosball. Not really, but if you do have some free time may I suggest writing tests? I've heard good things about them.

`>>`

Displaying lists all day sounds pretty boring, but I enjoy it. Boring doesn't set release dates based on marketing goals and then expect you to work late instead of spending time with your kids. Boring doesn't crash on Saturday while you're trying to catch up with some friends. There are still plenty of interesting problems to fix in the world of Boring, and it seems like the more boring the job, the more we get paid.

What industry do you work in? I would love to see an unscientific poll in the comments.

`>>`

## Why are lists slow?

Product wants you to build a quick thing; display some data. There are only 5 lines of data, and probably will not be much more than that, we don't need to worry about pagination they say. Six months later, there are 100 lines being displayed and it takes 10 seconds for the page to load.

React devs are quick to look at their map, filter, and reduce functions when a list is slow. Every programmer knows that too many loops will cause performance issues, but is that really it?

Let's time some code.

```js
// map over stuff
```

### Looping isn't the problem, what next?

To answer this question, first we must remember what React does. React is a render library. Your code determines how the Document Object Model (DOM) should look and React makes it happen. The browser takes the DOM and converts it into the pretty UI you want to show to the user.

Updating the DOM is relatively slow and somewhat clunky. If you've ever updated DOM elements with Javascript or jQuery, you know. Changing one element isn't so bad. Tracking changes by `#id` at application scale is a nightmare.

"React" is an ecosystem full of choose-your-own adventure tools like React Router, Redux, Storybook, and Axios. The library React is much smaller. React the library comes down to 2 main benefits:

- Declarative code to make it easier to code large SPAs
- Efficient DOM updates for a snappy UI

### Declarative Code

If you work in React, you already get the first part. The componentized architecture that almost naturally forms in a React project is far easier to grok than what ends up happening in a large jQuery application.

```js
// Plain JS
function changeElement(domId, newContent) {
  let element = document.getElementById(domId);
  if (!element) {
    // fail or should I make a new one?
    element = document.createElement("div");
    element.id = domId;
    element.className = "";
    document.append(element);
  }

  element.innerHTML = newContent;
}

function updateUser(user) {
  changeElement("user-first", user.first);
  changeElement("user-last", user.last);
  changeElement("user-email", user.email);
}

// React, so much cleaner
function User(user) {
  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}
```

### Responsive UI

The second part is what we are exploring today: a responsive UI.

#### What is a responsive UI?

We need to define "responsive" before we try to build towards it. Nielsen Norman Group has been a leader in user research for decades, well before the term UX was invented. They created a set of timings that were as true in the 90s as they are today.

<!-- https://www.nngroup.com/articles/response-times-3-important-limits/ -->

- < 0.1 seconds: Feels instant to the user
- < 1 second: Noticeable, but doesn't break the user's flow.
- < 10 seconds: Roughly the limit for keeping a user's attention.

Anything over 1 second requires a loading signal and anything over 10 seconds should also provide an expected time (this usually takes around 30 seconds).

### How does React help us create a responsive UI

React seeks to improve display speed by keeping its own internal representation of the DOM. Instead of updating the whole document, React filters down to just the elements with changes and selectively updates only the DOM elements that have actual changes.

In the example above, that user element could be part of a larger list. What happens when that list changes? Do you drop all the existing user elements from the DOM and build out a new node? If you were trying to handle this in plain JS, you probably would. Instead, React tries to identify and manipulate only the specific elements with changes. If your new list includes some of the same user elements, those elements will remain untouched for a more efficient set of DOM updates. The UI is maintained and only a small change occurs without needing a loading state.

Loading a new page/screen in React is not going to be better than plain JS or a static site, but the ongoing updates will be faster while allowing for clean, maintainable code.

### Where does React go wrong?

React can handle hundreds of elements without to much issue, but at some point, the DOM changeset becomes too large.

Lists and tables can quickly increase the number of DOM elements on a page. Think about how many divs a single card in a list of vehicles can have, between its make, model, year, image and container, getting to 5 elements is easy. Surely, many of you have worked on far more complicated list items. If you display 20 cards, your DOM is getting `5 * 20 = 100` elements injected at one time. Is 100 a lot? No, not really, but you can see how the multiplication of these two factors can quickly grow into seriously large numbers.

Let's get back to that list Product said was only going to be a few things, but now has hundreds of items, each with a dozen data points to display and is now loading really slow. It seems the cause is too many DOM elements.

## How do we fix it?

I see 3 main ways to tackle React list UI performance issues:

- Progressively load additional items with a "Show more" button
- Pagination to display a limited set of data
- Virtualized lists

All 3 of these do essentially the same thing, _give React less elements to render_.

### Progressive loading / lazy loading / infinite scroll

Take our array of objects and only display the first 2 dozen items. At the end of the list, provide a "Show more" button to increase the items in the list by another 2 dozen.

Why this works? React is only adding a small number of elements to the DOM on each pass. Each item element may be composed of 10-20 elements, but less than 500 elements is going to render quickly. Even with an API request, the UI should be rendered within seconds.

For bonus points, you could detect scroll position and automatically "show more" when the user reaches the end of the list, but I don't think that fundamentally changes how this infinite-scroll technique works so it doesn't get its own place.

This method works particularly well with APIs that only dump a full set of data. This can be a bit frustrating as the network time on a huge JSON package can be multiple seconds, so make sure to give your user a loading animation as the data is retrieved. Once the data is loaded, you don't want to then exacerbate the problem by taking multiple seconds to render so slice out the first small chunk of data and get it on the screen.

### Pagination

Pagination displays X number of elements at a time, often giving the user a choice of [10, 25, 50]. In our code we either select a portion of our data `collection.slice(page * count - count, page * count)` or make an API request with pagination params `?offset=${page-1}&count=${count}`.

You could argue that pagination and progressive "show more" loading are the same, and they almost are. The main difference is pagination wipes out the existing items and starts fresh with a new set.

Because you have a short, fixed list length, I think this method works better in many cases, especially if your data is fetched from an API that supports pagination. React only has to manage a set number of elements, not a growing list which consumes memory. Your URL can even reflect which page of data you are looking at, allowing users to share links to specific pages.

### Virtualized List

With over 1 million weekly downloads on npm, the `react-window` library provides tools for optimizing list display. It is a new, lighter-weight version of `react-virtualized`, which has been around a few years and also has about 1 million weekly downloads. Both are from the same developer.

Both tools work in a similar way. The magic is in their ability to only render the components in the viewport. Because only a few elements are rendered at a time, the initial load time is as fast and the UI continues to be responsive while in use.
