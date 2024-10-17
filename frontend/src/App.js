import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const[get_sth] = useState()

  useEffect(() =>{
    fetch('http://127.0.0.1:5000/get', {
      'method': 'GET',
      headers: {
        'Content-Type':'applications/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
  })

  return (
    <div className="App">
      <h1>Testing</h1>
    </div>
  );
}

export default App;
