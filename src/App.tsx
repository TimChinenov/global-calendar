import './App.css';
import { CalendarCompare } from './calendar-compare/calendar-compare';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h2 className="pl-4 pt-2">Zone Plan</h2>
          <CalendarCompare />
      </header>
    </div>
  );
}

export default App;
