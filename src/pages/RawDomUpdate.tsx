import { useLayoutEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { useBenchmark } from "../hooks/useBenchmark";
import { useRawDomBenchmark } from "../hooks/useRawDomBenchmark";

export const RawDomUpdate = () => {
  useBenchmark('Javascript Benchmark')
  const benchmark = useRawDomBenchmark()
  const [timer, changeTimer] = useState<number>()

  useLayoutEffect(() => {
    if (!benchmark.running && timer) {
      console.log(`Render Time: ${((Date.now() - timer) / 1000).toLocaleString('US')} seconds`)
    }
  }, [benchmark.running, timer])

  return (
    <div>
      <h2>Plain Javascript</h2>
      {benchmark.running ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="benchmarkButtonWrapper">
          <button onClick={() => {
            changeTimer(Date.now())
            benchmark.reset()
          }}>
            Clear Elements
          </button>
          <button onClick={() => {
            changeTimer(Date.now())
            benchmark.run(1000)
          }}>
            1,000 Elements
          </button>
          <button onClick={() => {
            changeTimer(Date.now())
            benchmark.run(10000)
          }}>
            10,000 Elements
          </button>
          <button onClick={() => {
            changeTimer(Date.now())
            benchmark.run(50000)
          }}>
            50,000 Elements
          </button>
        </div>
      )}
      <div style={{ margin: '16px 0' }}>
        {benchmark.count && (
          <div>
            Element Count: {benchmark.count.toLocaleString('US')}
          </div>
        )}
        {benchmark.clear && (
          <div>
            Clear Previous Elements: {benchmark.clear.toLocaleString('US')}ms
          </div>
        )}
        {benchmark.build && (
          <div>
            Build Elements: {benchmark.build.toLocaleString('US')}ms
          </div>
        )}
        {benchmark.append && (
          <div>
            Append to DOM: {benchmark.append.toLocaleString('US')}ms
          </div>
        )}
      </div>
    </div>
  )
}