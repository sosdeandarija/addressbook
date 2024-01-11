/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export const AddressBookTable = ({filteredEntries, onDelete, onViewEntry}) => {
    
    return <table className={"address-book--table"}>
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>                
                <th>Address</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredEntries.map((entry) => {
                return <tr key={entry.uuid}>
                    <td><img className={"address-book--table--avatar"} src={entry.avatarUrl} alt="Avatar"/></td>
                    <td>{entry.firstName} {entry.lastName}</td>
                    <td>{entry.city}, {entry.country}</td>
                    <td>
                        <button style={{marginRight:"5px"}} onClick={() => onViewEntry(entry)}>👁️</button>
                        <button onClick={() => onDelete(entry)}>🗑️</button>
                    </td>
                </tr>
            })}
        </tbody>
    </table>
}