import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions)
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const savings = parseFloat(name.split(' ')[0]);

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        savings,
        name: name.substring(savings.toString().length + 1),
        description,
        datetime
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newTransaction => {
        toast.success('Transaction added!');
        setName('');
        setDatetime('');
        setDescription('');
        setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        toast.error('Failed to create transaction. Check all the (*required) input fields and try again.');
      });
  }

  function deleteTransaction(id) {
    const url = `${process.env.REACT_APP_API_URL}/transaction/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        toast.success('Transaction deleted!');
        setTransactions(transactions.filter(transaction => transaction._id !== id));
      })
      .catch(error => {
        console.error('There was a problem with the delete operation:', error);
      });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.savings;
  }

  balance = balance.toFixed(2);
  const rupees = balance.split('.')[0];
  const paise = balance.split('.')[1];

  function formatDate(datetime) {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return (
    <main>
      <div className="card">
        <h1>₹{rupees}<span>.{paise}</span></h1>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <div className="textInputWrapper">
              <input type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder={'Ex: -200 new LG TV'} className="textInput" />
            </div>
            <div className="textInputWrapper">
              <input type="datetime-local"
                value={datetime}
                onChange={ev => setDatetime(ev.target.value)} className="textInput" />
            </div>
          </div>
          <div className="description">
            <div className="textInputWrapper">
              <input type="text"
                value={description}
                onChange={ev => setDescription(ev.target.value)}
                placeholder={'Description'} className="textInput" />
            </div>
          </div>
          <button type="submit" className="continue-application">
            <div>
              <div className="pencil"></div>
              <div className="folder">
                <div className="top">
                  <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                  </svg>
                </div>
                <div className="paper"></div>
              </div>
            </div>
            Add new transaction
          </button>
        </form>
        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction => (
            <div className="transaction" key={`${transaction.name}-${transaction.description}-${transaction.datetime}`}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={"savings " + (transaction.savings < 0 ? "red" : "green")}>{(transaction.savings > 0 ? "+ ₹" : "- ₹")}{Math.abs(transaction.savings)}</div>
                <div className="datetime">{formatDate(transaction.datetime)}</div>
                <button onClick={() => deleteTransaction(transaction._id)} className="delete">
                  <svg viewBox="0 0 448 512" className="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </main >
  );
}

export default App;
