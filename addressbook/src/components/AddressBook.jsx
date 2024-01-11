/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { AddressBookBar } from "./AddressBookBar"
import { AddressBookTable } from "./AddressBookTable"
import { useApi } from '../hooks/useApi.js'
import { ACTION_SET_ENTRIES, ACTION_CHANGE_QUERY, ACTION_DELETE, useAddressBookContext } from "./AddressBookProvider";
import { comparePrim } from "../utils/utils";


import { ConfirmationModal } from "./shared/ConfirmationModal.jsx";
import { AddressBookViewEntryModal } from "./AddressBookViewEntryModal.jsx";

import { useModal } from '../hooks/useModal.js'
import { Modal } from './shared/Modal.jsx';


export const AddressBook = () => {
    const {state, dispatch} = useAddressBookContext();
    const {getEntries, deleteEntry} = useApi();

    const deleteModal = useModal((shouldDelete, entry) => {
      if(shouldDelete === true) {
        handleConfirmDelete(entry)
      }
    })

    const viewModal = useModal((response, context) => {

    });

    //GET ENTRIES
    async function fetchEntries () {
        const entries = await getEntries(`http://localhost:5000/api/entries`);
        dispatch({type: ACTION_SET_ENTRIES, payload: entries})
    }
    
    useEffect(() => {
        fetchEntries();
    }, [])

    function changeQuery(query) {
        dispatch({type:ACTION_CHANGE_QUERY, payload: query})
    }

    //DELETE ENTRY FROM TABLE
    async function handleConfirmDelete (entry) {
        const result = await deleteEntry(`http://localhost:5000/api/entries/${entry.uuid}`)
        if(result) {
            dispatch({type: ACTION_DELETE, payload: entry.uuid})
        }        
    }

    //Updates on query change
    const filteredEntries = useMemo(() => {
        const query = state.query;
        return state.entries.filter(
            ({firstName, lastName, country, state}) => 
            comparePrim(firstName, query) || 
            comparePrim(lastName, query) || 
            comparePrim(country, query) || 
            comparePrim(state, query))
    },[state])

    return <div>
        <AddressBookBar changeQuery={changeQuery}/>
        <AddressBookTable 
          filteredEntries={filteredEntries}
          onDelete={(entry) => deleteModal.show(entry)}
          onViewEntry={(entry) => viewModal.show(entry)}
        />
        <Modal isOpen={viewModal.isOpen}>
          <AddressBookViewEntryModal 
            entry={viewModal.context}
            onClose={() => viewModal.close(true)}
            onSave={() => viewModal.close(true)}/>
        </Modal>

        <Modal isOpen={deleteModal.isOpen}>
          <ConfirmationModal 
            title={`Are you sure you want to delete '${deleteModal.context?.firstName} ${deleteModal.context?.lastName}'`} 
            onYes={() => deleteModal.close(true)} 
            onNo={() => deleteModal.close(false)}/>
        </Modal>
    </div>
}