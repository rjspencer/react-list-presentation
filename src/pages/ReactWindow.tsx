import React, { useLayoutEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useBenchmark } from "../hooks/useBenchmark";
import { FixedSizeList } from 'react-window';
import { generatePerson, Person } from "../data/person";

export const ReactWindow = () => {
  useBenchmark('React Benchmark')
  const [start, setStart] = useState<number>();
  const [build, setBuild] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [rendered, setRendered] = useState<number>();
  const [testElements, setTestElements] = useState<Array<Person>>();

  const reset = () => setTestElements([])

  const run = (count?: number) => {
    setTestElements(undefined)
    setRendered(undefined)
    setEnd(undefined)
    setBuild(undefined)
    setStart(Date.now())
    const testElements = Array(count).fill('').map((_item, index) => generatePerson())
    setBuild(Date.now())
    setTestElements(testElements)
  };

  useLayoutEffect(() => {
    if (start && build && !end) {
      setEnd(Date.now())
    }
  }, [build, end, start])

  useLayoutEffect(() => {
    if (start && end && !rendered) {
      setRendered(Date.now())
      console.log(`Total Render Time: ${((Date.now() - start) / 1000).toLocaleString('US')} seconds`)
    }
  }, [end, start, rendered])

  const ListItem = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    const person = testElements?.[index]

    if (!person) return <div>{index}</div>

    return (
      <div style={{
        ...style,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '60px repeat(4, 1fr)',
      }}>
        <div style={{ padding: '14px 16px', borderLeft: `5px solid ${person.favoriteColor}` }}>{index}</div>
        <div>{person.first} {person.last}</div>
        <div>{person.email}</div>
        <div>{person.age}</div>
        <div>{person.state}</div>
      </div>
    )
  }

  return (
    <div>
      <h2>React Window - Virtualized List</h2>
      {start && !end ? (
        <>
          <Loading />
        </>
      ) : (
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
            run(100000)
          }}>
            100,000 Elements
          </button>
        </div>
      )}
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
      {testElements && (
        <FixedSizeList
          height={300}
          width={1000}
          itemSize={50}
          itemCount={testElements.length}
        >
          {ListItem}
        </FixedSizeList>
      )}
    </div>
  )
};
