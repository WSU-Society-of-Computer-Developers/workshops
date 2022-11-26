import React from 'react';
import emojiBank from "emoji.json"
import './App.css';
import Emoji from './components/Emoji';
import { emojiBankType } from './types';


function App() {
  const [emojis, setEmojis] = React.useState<emojiBankType[]>(emojiBank);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newEmojis: emojiBankType[] = []
    let searchInput: string = e.target.value.toLowerCase();
    if (!searchInput) {
      setEmojis(emojiBank) // if nothing inputted, just give them all of them
    }
    emojiBank.map((emojiObj) => {
      if (emojiObj.name.toLowerCase().includes(searchInput) || emojiObj.category.toLowerCase().includes(searchInput)) {
        newEmojis.push(emojiObj)
      }
    })
    setEmojis(newEmojis)
  }
  return (
    <div className='App'>
      <h1>Emoji Searcher</h1>
      <p>{emojis.length} result(s)</p>
      <input type="text"
        placeholder='Enter keywords here'
        onChange={handleSearch} />
      {emojis.map((emojiObj) => {
        return <Emoji {...emojiObj}
          myFunction={() => { navigator.clipboard.writeText(emojiObj.char); alert("Copied " + emojiObj.char) }} />
      })}
    </div>
  );
}

export default App;
