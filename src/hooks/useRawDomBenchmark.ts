import { useState } from "react";

export type Benchmark = {
  append: number;
  build: number;
  clear: number;
  count: number;
};

export function resetBenchmarkContainer() {
  let wrapperDiv = document.getElementById("domAddBenchmark-container");
  wrapperDiv?.remove();
}

export function domAddBenchmark(count = 100000): Benchmark {
  let start = Date.now();
  let wrapperDiv = document.getElementById("domAddBenchmark-container");
  if (wrapperDiv) {
    wrapperDiv.innerHTML = "";
  } else {
    wrapperDiv = document.createElement("div");
    wrapperDiv.id = "domAddBenchmark-container";
    wrapperDiv.className = "testElementWrapper";
  }
  const clear = Date.now() - start;

  start = Date.now();
  let i = 0;
  for (i; i < count; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = "listItem";
    const newContent = document.createTextNode(`Element ${i}`);
    newDiv.appendChild(newContent);
    wrapperDiv.appendChild(newDiv);
  }
  const build = Date.now() - start;

  start = Date.now();
  document.body.appendChild(wrapperDiv);
  const append = Date.now() - start;

  return {
    append,
    build,
    clear,
    count,
  };
}

export const useRawDomBenchmark = () => {
  const [running, setRunning] = useState(false);
  const [benchmark, setBenchmark] = useState<Benchmark>();

  const reset = () => resetBenchmarkContainer();

  const run = (count?: number) => {
    setRunning(true);
    setBenchmark(undefined);
    const benchmark = domAddBenchmark(count);
    setTimeout(() => {
      setBenchmark(benchmark);
      setRunning(false);
    }, 0);
  };

  return {
    ...benchmark,
    reset,
    run,
    running,
  };
};
