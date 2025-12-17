import React, {
  useState,
  useEffect,
  useRef,
  Fragment
} from "react";
import Yreact from "./Yreact";

// ===============================
// FUNCTIONAL COMPONENT (Preferred in Modern React)
// ===============================
function App() {

  // ===============================
  // STATE using useState Hook
  // ===============================
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ===============================
  // REF using useRef Hook
  // ===============================
  const inputRef = useRef(null);

  // ===============================
  // useEffect Hook (Lifecycle methods replacement)
  // ===============================
  useEffect(() => {
    console.log("Component Mounted");

    // Cleanup → componentWillUnmount
    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  // ===============================
  // EVENT HANDLERS
  // ===============================
  const increment = () => {
    // Updating state using callback (best practice)
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  // ===============================
  // LIST DATA
  // ===============================
  const skills = ["HTML", "CSS", "JavaScript", "React"];

  return (
    
    <Fragment>
       <Yreact title="React Concepts" />
      <h1>Practice File</h1>

      <Greeting title="Welcome to React Practice" />

      <h2>Counter Example</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>

      <h2>One Way Data Binding</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Typed Name: {name}</p>

      <h2>Conditional Rendering</h2>
      {isLoggedIn ? <p>User Logged In</p> : <p>Please Login</p>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle Login
      </button>

      <h2>Skill List</h2>
      <ul>
        {skills.map((skill, index) => (
          // key helps React track list items
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2>useRef Example</h2>
      <input ref={inputRef} placeholder="Click button to focus" />
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>

      <p style={{ color: "blue", fontWeight: "bold" }}>
        This text is styled using inline CSS
      </p>
      <>
        <p>Fragment Item 1</p>
        <p>Fragment Item 2</p>
      </>

      <Footer />

    </Fragment>
  );
}

function Greeting(props) {
  return <h2>{props.title}</h2>;
}

function Footer() {
  return <footer>React Practice Completed ✔</footer>;
}

export default App;
