import axios from 'axios';
import { FC, useCallback, useEffect, useState } from 'react';
import './App.css';

const App: FC = () => {
  const [rows, setRows] = useState<string[]>([]);

  const getRows = useCallback(async () => {
    try {
      const { data } = await axios({
        baseURL: 'http://localhost:3001',
        method: 'GET',
        url: '/data',
      });

      setRows(data);
    } catch (e) {
      console.log(e);
    }
  }, [setRows]);

  useEffect(() => {
    getRows();
  }, [getRows]);

  return (
    <div>
      {rows.map((row, i) => (
        <div key={`row-${row}-${i}`}>{row}</div>
      ))}
    </div>
  );
};

export default App;
