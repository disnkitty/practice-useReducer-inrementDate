import { useReducer } from 'react';
import './index.css';


function reducer(state, action) {
  switch (action.type) {
    case 'changeInput':
      return { ...state, inputValue: action.payload };
    case 'incrementDays': {
      const newDate = new Date(state.day);
      newDate.setDate(newDate.getDate() + action.payload);
      return { ...state, day: newDate };
    }

    case 'cleanInput':
      return { ...state, inputValue: action.payload };

    case 'resetDate':
      return { ...state, day: action.payload };
    default:
      return state;
  }
}

function App() {
  const initialState = { day: new Date(), inputValue: '' };
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleChange(e) {
    const count = e.target.value;
    if (!isNaN(count)) {
      dispatch({ type: 'changeInput', payload: count });
    }
  }

  function incrementDays() {
    const days = Number(state.inputValue);
    dispatch({ type: 'incrementDays', payload: days });
    dispatch({ type: 'cleanInput', payload: '' });
  }
  const formattedDate = new Date(state.day).toDateString();

  return (
    <div className="app-container">
      <p className="date-text">{formattedDate}</p>

      <button
        className="btn"
        onClick={() => {
          dispatch({ type: 'resetDate', payload: new Date() });
        }}
      >
        Reset
      </button>

      <div className="input-group">
        <input
          value={state.inputValue}
          onChange={handleChange}
          className="input"
          type="number"
          placeholder="Days after today"
        />
        <button onClick={incrementDays} className="btn primary-btn">
          Show result
        </button>
      </div>
    </div>
  );
}

export default App;
