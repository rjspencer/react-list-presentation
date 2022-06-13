import Playground from "javascript-playgrounds"

type Props = {
  active?: boolean
  preset: 'javascript' | 'react'
}
export const Console = (props: Props) => {

  return (
    <div style={{ height: 'calc(100% - 32px)', marginTop: '16px', display: props.active ? 'block' : 'none' }}>
      <Playground
        preset={props.preset}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  )
}