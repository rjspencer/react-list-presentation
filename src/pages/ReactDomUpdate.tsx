import { useEffect, useLayoutEffect, useState } from "react";
import { CookieWaitingGif } from "../components/Gif";
import { Loading } from "../components/Loading";
import { useBenchmark } from "../hooks/useBenchmark";

export function createElementsBenchmark(count = 100000) {
  return new Array(count).fill('').map((_item, index) => (
    <div className="listItem" key={index}>Element {index}</div>
  ))
}

export const ReactDomUpdate = () => {
  useBenchmark('React Benchmark')
  const [start, setStart] = useState<number>();
  const [build, setBuild] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [count, setCount] = useState<number>();
  const [rendered, setRendered] = useState<number>();
  const [testElements, setTestElements] = useState<Array<JSX.Element>>();

  useEffect(() => {
    if (start) {
      const elements = createElementsBenchmark(count)
      setBuild(Date.now())
      setTestElements(elements)
    }
  }, [start])

  const reset = () => setTestElements([])

  const run = (count?: number) => {
    setEnd(undefined);
    setTestElements(undefined)
    setRendered(undefined)
    setBuild(undefined)
    count && setCount(count)
    setStart(Date.now());
  };

  useLayoutEffect(() => {
    if (start && build && !end) {
      setEnd(Date.now())
    }
  }, [build, end, start])

  useLayoutEffect(() => {
    if (start && end && !rendered) {
      setRendered(Date.now())
      // console.log(`Total Render Time: ${((Date.now() - start) / 1000).toLocaleString('US')} seconds`)
    }
  }, [end, start, rendered])

  return (
    <div>
      <h2>React</h2>
      {start && !end && (
        <>
          <Loading />
          <CookieWaitingGif />
        </>
      )}
      <div className="benchmarkButtonWrapper">
        <button onClick={() => {
          reset()
        }}>
          Clear Elements
        </button>
        <button onClick={() => {
          run(1000)
        }}>
          1,000 Elements
        </button>
        <button onClick={() => {
          run(10000)
        }}>
          10,000 Elements
        </button>
        <button onClick={() => {
          run(50000)
        }}>
          50,000 Elements
        </button>
      </div>
      <div style={{ margin: '16px 0' }}>
        {start && build && (
          <div>
            Build Elements: {(build - start).toLocaleString('US')}ms
          </div>
        )}
        {build && end && (
          <div>
            Ready for DOM: {(end - build).toLocaleString('US')}ms
          </div>
        )}
        {end && rendered && (
          <div>
            Final Render: {(rendered - end).toLocaleString('US')}ms
          </div>
        )}
        {start && rendered && (
          <div>
            Total: {(rendered - start).toLocaleString('US')}ms
          </div>
        )}
      </div>
      <div className="testElementWrapper">
        {testElements}
      </div>
    </div>
  )
};
