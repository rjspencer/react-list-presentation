import React, { useEffect, useState } from 'react';
import './App.css';
import { Loading } from './components/Loading';
import { useBenchmark } from './hooks/useBenchmark';
import { resetBenchmarkContainer } from './hooks/useRawDomBenchmark';
import { Loops } from './pages/Loops';
import { Presentation } from './pages/Presentation';
import { RawDomUpdate } from './pages/RawDomUpdate';
import { ReactDomUpdate } from './pages/ReactDomUpdate';
import { ReactWindow } from './pages/ReactWindow';

type Tab = 'js' | 'react' | 'react-window' | 'loops' | 'presentation'
function App() {
  useBenchmark('App')

  const [slide, setSlide] = useState<number>(0)
  const [tab, _setTab] = useState<Tab | null>(null)
  const setTab = (newTab: Tab) => {
    if (tab === 'js') {
      resetBenchmarkContainer()
    }
    _setTab(null)
    setTimeout(() => _setTab(newTab), 1)
  }

  useEffect(() => {
    setTimeout(() => !tab && _setTab('js'), 3000)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Messing with Lists</h1>
        <img alt="logo" src="smoreFire.png" height="100" width="100" style={{ borderRadius: '50%', border: '3px solid white' }} />
      </header>
      <nav className="navigation">
        <button onClick={() => setTab('presentation')}>Presentation</button>
        <button onClick={() => setTab('loops')}>Loops</button>
        <button onClick={() => setTab('js')}>JavaScript</button>
        <button onClick={() => setTab('react')}>React</button>
        <button onClick={() => setTab('react-window')}>React Window</button>
      </nav>
      <div className="main">
        {!tab && <Loading />}
        {tab === 'presentation' && <Presentation slide={slide} onChangeSlide={setSlide} />}
        {tab === 'loops' && <Loops />}
        {tab === 'react-window' && <ReactWindow />}
        {tab === 'react' && <ReactDomUpdate />}
        {tab === 'js' && <RawDomUpdate />}
      </div>
    </div>
  );
}

export default App;
