import { useState } from 'react';
import { Slides } from './pages/Slides';
import { Console } from './pages/Console';
import './App.css';

type Tab = 'js' | 'react' | 'react-window' | 'showMore' | 'loops' | 'presentation' | 'pagination' | 'console' | 'consoleReact' | 'slides'
function App() {
  const [tab, setTab] = useState<Tab>('slides')

  return (
    <div className="app">
      <header className="header"></header>
      <nav className="navigation">
        <button onClick={() => setTab('slides')}>Slides</button>
        <button onClick={() => setTab('console')}>JavaScript</button>
        <button onClick={() => setTab('consoleReact')}>React</button>
      </nav>
      <div className="main">
        <Slides active={tab === 'slides'} />
        <Console
          active={tab === 'console'}
          preset="javascript"
        />
        <Console
          active={tab === 'consoleReact'}
          preset="react"
        />
      </div>
    </div>
  );
}

export default App;
