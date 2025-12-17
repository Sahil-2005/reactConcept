// ==============================
// React Core Imports
// ==============================
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  memo
} from "react";

import axios from "axios";

// ==============================
// Context API
// ==============================
const ThemeContext = createContext();

// ==============================
// Custom Hook
// ==============================
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return { count, increment, decrement };
}

// ==============================
// Higher Order Component (HOC)
// ==============================
const withLogger = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log("Component mounted:", WrappedComponent.name);
    }, []);
    return <WrappedComponent {...props} />;
  };
};

// ==============================
// Memoized Component (Optimization)
// ==============================
const Child = memo(({ value }) => {
  console.log("Child rendered");
  return <h4>Child Value: {value}</h4>;
});

// ==============================
// Main App Component
// ==============================
function App() {
  // ------------------------------
  // State (useState Hook)
  // ------------------------------
  const [name, setName] = useState("React");
  const [show, setShow] = useState(true);
  const [list, setList] = useState(["JS", "React", "Redux"]);

  // ------------------------------
  // Ref (useRef)
  // ------------------------------
  const inputRef = useRef(null);

  // ------------------------------
  // Custom Hook usage
  // ------------------------------
  const { count, increment, decrement } = useCounter(0);

  // ------------------------------
  // Effect Hook (Lifecycle)
  // ------------------------------
  useEffect(() => {
    console.log("Component Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  // ------------------------------
  // Axios API Call
  // ------------------------------
  const fetchData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log(res.data);
  };

  return (
    <ThemeContext.Provider value="dark">
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        {/* JSX */}
        <h1>Hello {name}</h1>

        {/* Comment in JSX */}
        {/* This is a JSX comment */}

        {/* Event Handling */}
        <button onClick={() => setName("ReactJS")}>Change Name</button>

        {/* One-way Data Binding */}
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Conditional Rendering */}
        {show && <p>This is conditionally rendered</p>}
        <button onClick={() => setShow(!show)}>Toggle</button>

        {/* List Rendering + Key */}
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Counter Program */}
        <h2>Counter: {count}</h2>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>

        {/* Ref Usage */}
        <button onClick={() => inputRef.current.focus()}>
          Focus Input
        </button>

        {/* Memoized Child */}
        <Child value={count} />

        {/* API Call */}
        <button onClick={fetchData}>Fetch API</button>

        {/* Context Consumer */}
        <ThemeDisplay />
      </div>
    </ThemeContext.Provider>
  );
}

// ==============================
// Context Consumer Component
// ==============================
function ThemeDisplay() {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
}

// ==============================
// HOC Usage
// ==============================
export default withLogger(App);
