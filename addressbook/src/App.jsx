import "./App.scss";
import { AddressBook } from "./components/AddressBook";
import { AddressBookProvider } from "./components/AddressBookProvider";

function App() {
  return (
   <AddressBookProvider>
    <AddressBook/>
   </AddressBookProvider>
  );
}

export default App;
