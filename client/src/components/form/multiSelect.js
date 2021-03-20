import { useState } from 'react';

export default function MultiSelect(props) {
  const { value, onChange, onBlur } = props;
  const [search, setSearch] = useState('');

  const addElement = () => {
    if (value.indexOf(search) === -1) {
      value.push(search);
      onChange(value);
    }
    setSearch('');
    onBlur && onBlur();
  };

  const removeElement = (index) => {
    const newValue = value;
    newValue.splice(index, 1);
    onChange(newValue);
    onBlur && onBlur();
  };

  return (
    <div>
      <div className="row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={addElement}>
          Ajouter
        </button>
      </div>

      <>
        {value.map((el, index) => (
          <div onClick={() => removeElement(index)} key={el}>
            {el}
          </div>
        ))}
      </>
    </div>
  );
}
