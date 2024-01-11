import { useAddressBookContext } from "./AddressBookProvider"

/* eslint-disable react/prop-types */
export const AddressBookBar = ({changeQuery}) => {
    const {state} = useAddressBookContext();

return <div className={"address-book--bar"}>
        <button>➕ Add</button>
        <input value={state.query} onChange={(e) => changeQuery(e.target.value)}/>
        <button>⚙️ Settings</button>
    </div>
}