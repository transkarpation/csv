import { useState } from 'react';
import "./App.css";

import CsvInput from './components/CsvInput'
import UsersTable from './components/UsersTable'

function App() {
  const [records, setRecords] = useState([])

  return (
    <div className="App container">
      <CsvInput setRecords={setRecords} />
      {
        records.length ? <UsersTable records={records} /> : null
      }
    </div>
  );
}

export default App;
