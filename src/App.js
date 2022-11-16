import "/";
import "./App.css";
import Title from "./components/Title/Title";
import Form from "./components/Form/Form";
import Tasks from "./components/Tasks/Tasks";
import All from "./components/All/All";
import Done from "./components/Done/Done";
import Undone from "./components/Undone/Undone";
import SortByDate from "./components/SortByDate/SortByDate";
import ArrowUp from "./components/ArrowUp/ArrowUp";
import ArrowDown from "./components/ArrowDown/ArrowDown";
import Pages from "./components/Pages/Pages";

function App() {
  return (
    <div className='App'>
      <div className='main'>
        <Title />
        <Form />
        <div className='tasks-buttons'>
          <All />
          <Done />
          <Undone />
          <SortByDate />
          <ArrowUp />
          <ArrowDown />
        </div>
        <div className='tasks-task'>
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
          <Tasks />
        </div>
        <Pages />
      </div>
    </div>
  );
}

export default App;
