/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export const ConfirmationModal = ({title, onYes, onNo}) => {
    return <div className="modal">
        <span>{title}</span>
        <div>
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
        </div>
    </div>  
}