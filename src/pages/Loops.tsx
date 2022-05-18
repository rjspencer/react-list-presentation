import { useEffect, useLayoutEffect, useState } from "react";
import { CookieWaitingGif } from "../components/Gif";
import { Loading } from "../components/Loading";
import { generatePerson, Person } from "../data/person";
import { useBenchmark } from "../hooks/useBenchmark";

export function createElementsBenchmark(count = 100000) {
  return new Array(count).fill('').map((_item) => generatePerson())
}

export const Loops = () => {
  useBenchmark('React Benchmark')
  const [start, setStart] = useState<number>();
  const [build, setBuild] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [count, setCount] = useState<number>();
  const [rendered, setRendered] = useState<number>();
  const [people, setPeople] = useState<Array<Person>>()
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    if (start) {
      setPeople(createElementsBenchmark(count))
      setBuild(Date.now())
    }
  }, [start])


  const run = (count?: number) => {
    setEnd(undefined);
    setRendered(undefined)
    setBuild(undefined)
    count && setCount(count)
    setStart(Date.now());
  };

  const loop = (callback: () => void) => {
    setEnd(undefined);
    setRendered(undefined)
    setBuild(undefined)
    setStart(Date.now());
    callback()
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
      <h2>Loops</h2>
      {start && !end && (
        <>
          <Loading />
          <CookieWaitingGif />
        </>
      )}
      <div style={{ display: 'flex', gap: '32px' }}>
        <div>
          <h3>Create Objects</h3>
          <div className="benchmarkButtonWrapper">
            <button onClick={() => {
              run(1000)
            }}>
              1,000 People
            </button>
            <button onClick={() => {
              run(10000)
            }}>
              10,000 People
            </button>
            <button onClick={() => {
              run(50000)
            }}>
              50,000 People
            </button>
          </div>
          <h3>Loop over People</h3>
          <div className="benchmarkButtonWrapper">
            <button onClick={() => {
              loop(() => {
                const carls = people?.filter(person => person.first === 'Carl')
                setMessage(`${people?.length.toLocaleString('US')} people: ${carls?.length ? `found ${carls.length} Carls.` : 'Sorry, no Carl found.'
                  }`)
              })
            }}>
              Filter for Carls
            </button>
            <button onClick={() => {
              loop(() => {
                const jean = people?.find(person => person.first === 'Jean')
                setMessage(jean ? 'Found a Jean.' : 'Sorry, no Jean found.')
                setMessage(`${people?.length.toLocaleString('US')} people: ${jean ? 'Found a Jean.' : 'Sorry, no Jean found.'
                  }`)
              })
            }}>
              Find Jean
            </button>
            <button onClick={() => {
              loop(() => {
                const sorted = people?.sort((a, b) => a.first > b.first ? 1 : -1)
                setMessage(`Sorted ${sorted?.length.toLocaleString('US')} people records`)
              })
            }}>
              Sort by Name
            </button>
          </div>
          <div style={{ margin: '16px 0' }}>
            {message && (
              <div>
                {message}
              </div>
            )}
            {start && build && (
              <div>
                Building: {(build - start).toLocaleString('US')}ms
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
        </div>
        <div>
          <code>
            <pre>
              {`interface Person {
  id: string;
  first: string;
  last: string;
  age: number;
  email: string;
  city: string;
  zip: string;
  address: string;
  state: string;
  favoriteColor: string;
}`}
            </pre>
          </code>
        </div>
      </div>
    </div>
  )
};
