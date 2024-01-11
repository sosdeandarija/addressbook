/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export const AddressBookViewEntryModal = ({entry, onClose, onSave}) => {
    const [enableEdit, setEnableEdit] = useState(false);
    const [copyEntry, setCopyEntry] = useState(entry);
    
    useEffect(() => {
        setCopyEntry({...entry});
    }, [entry])

    function handleEntityFieldChange (e) {
        const name = e.target.name;
        const value = e.target.value;

        setCopyEntry((oldCopy) => ({...oldCopy, [name]:value}))
    }   

    return <div className={'modal grid grid-cols-2 bg-blue'}>
           
            <span>First name:</span>
            <input 
                disabled={!enableEdit}
                name="firstName"
                onChange={handleEntityFieldChange}
                value={copyEntry?.firstName}/>

            <span>Last name:</span>
            <input 
                disabled={!enableEdit}
                name="lastName" 
                onChange={handleEntityFieldChange} 
                value={copyEntry?.lastName}/>

            <span>City:</span>
            <input 
                disabled={!enableEdit}type="text" 
                name="city" 
                onChange={handleEntityFieldChange}
                value={copyEntry?.city}/>
            
            <span>Country: </span>
            <input 
                disabled={!enableEdit}
                name="country" 
                onChange={handleEntityFieldChange}
                value={copyEntry?.country}/>
            
        
        {!enableEdit && <button onClick={() => setEnableEdit(true)}>Edit</button>}
        {enableEdit && <button onClick={onSave}>Save</button>}
        <button onClick={onClose}>Close</button>
    </div>
}