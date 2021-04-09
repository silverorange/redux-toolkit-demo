import { Provider } from 'react-redux';
import { useState } from 'react';
import { Person as NewPerson } from './new/components/Person';
import { Counter as NewCounter } from './new/components/Counter';
import { store as newStore } from './new/store';
import { store as oldStore } from './old/store';
import { Person as OldPerson } from './old/components/Person';
import { Counter as OldCounter } from './old/components/Counter';

import './App.css';

function App() {
  const [mode, setMode] = useState<'old' | 'new'>('new');

  return (
    <div>
      <div className="switcher">
        <button
          onClick={() => {
            setMode('old');
          }}
        >
          Old
        </button>
        <button
          onClick={() => {
            setMode('new');
          }}
        >
          New
        </button>
      </div>
      <div>
        {mode === 'new' && (
          <Provider store={newStore}>
            <NewCounter />
            <NewPerson id={1} />
          </Provider>
        )}
        {mode === 'old' && (
          <Provider store={oldStore}>
            <OldCounter />
            <OldPerson id={1} />
          </Provider>
        )}
      </div>
    </div>
  );
}

export default App;
