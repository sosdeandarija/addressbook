import {useState} from 'react';

export const useModal = (callback) => {
    const [isOpen, setIsOpen] = useState(false);
    const [context, setContext] = useState(null);

    function show(context) {
        setContext(context);
        setIsOpen(true);
    }

    function close(response) {
        if(callback && typeof callback === 'function') callback(response, context);
        setContext(null);
        setIsOpen(false)
    }

    return {    
        isOpen,
        context,
        show,
        close
    }
}