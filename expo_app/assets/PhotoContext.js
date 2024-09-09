import React, { createContext, useContext, useState } from 'react';

const PhotoContext = createContext();

export function PhotoProvider({ children }) {
    const [photoSet, setPhotoSet] = useState([]);

    return (
        <PhotoContext.Provider value={{ photoSet, setPhotoSet}}>
            {children}
        </PhotoContext.Provider>
    );
}

export function usePhotoContext() {
    return useContext(PhotoContext);
}