import React, { createContext, useState, useContext } from 'react'


export const ModalContext = createContext();

export const ModalProvider = (props) => {

    const [modal, setModal] = useState(false);


    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {props.children}
        </ModalContext.Provider>
    )
}

