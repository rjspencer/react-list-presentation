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

# Why are lists slow?

It's probably that \`map\` function, right?

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