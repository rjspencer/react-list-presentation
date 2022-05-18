import ReactMarkdown from "react-markdown"

const markdown = [`
### Dear React, 
#  Please Render Faster

How can we render lists as fast as our users expect?

`, `
# Ryan Spencer

- Developer since 2014
  - PHP, Angular, Other Angular, Rails, React, Typescript
- React since 2017
- Hooks before it was cool
- Lots of insurance

`, `
# Making Lists

\`\`\`js
<ul>
  {collection.map((data) => (
    <Item data={data} />
  ))}
</ul>
\`\`\`

`, `

![](https://media.giphy.com/media/LdOyjZ7io5Msw/giphy.gif)

`, `

# What is slow?

- **< 0.1 seconds:** Feels instant to the user
- **< 1 second:** Noticeable, but doesn't break the user's flow.
- **< 10 seconds:** Roughly the limit for keeping a user's attention.

https://www.nngroup.com/articles/response-times-3-important-limits/

`, `

# Why are lists slow?

It's probably that \`map\` function, right?

\`\`\`
function createElementsBenchmark(count) {
  return new Array(count).fill('').map(generatePerson)
}
\`\`\`

`, `

Looping isn't the problem, what next?

# React

- Declarative code to make it easier to code large SPAs
- Efficient DOM updates for a snappy UI

`, `

\`\`\`
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
\`\`\`

`, `

# Efficient DOM updates for a snappy UI

- Internal DOM representation
- Selective and target DOM updates
  - Don't forget your keys

`, `

# How do we fix it?

- Progressively load additional items with a "Show more" button
- Pagination to display a limited set of data
- Virtualized lists

All 3 of these do essentially the same thing: 

> _give React fewer elements to render_.
`, `

`]

export const Presentation = ({
  slide,
  onChangeSlide
}: {
  slide: number,
  onChangeSlide(slide: number): void
}) => {

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: '1 1', fontSize: '24px' }}>
        <ReactMarkdown>
          {markdown[slide]}
        </ReactMarkdown>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <button onClick={() => onChangeSlide(slide - 1)} disabled={slide === 0}>
          Prev
        </button>
        <button onClick={() => onChangeSlide(slide + 1)} disabled={slide === markdown.length - 1}>
          Next
        </button>
      </div>
    </div>
  )
}