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
      <footer className='md:mt-12 text-right'>
        <p className='text-sm pr-12 md:pr-24 text-primary'>App made by <a href="https://technically-writing.io">Tim Chinenov</a></p>
      </footer>
    </div>
  );
}

export default App;
