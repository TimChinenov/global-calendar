import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CalendarCompare } from './calendar-compare/calendar-compare';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <CalendarCompare /> }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
