import PropTypes from 'prop-types';
import React, { useMemo, useState, createContext } from 'react';

export const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState('');

  const contextValue = useMemo(() => ({ title, setTitle }), [title, setTitle]);

  return <TitleContext.Provider value={contextValue}>{children}</TitleContext.Provider>;
};

// export { TitleContext, TitleProvider };

export const EditSlotContext = createContext();

export const EditSlotProvider = ({ children }) => {
  const [slotData, setSlotData] = useState({});

  const contextValue = useMemo(() => ({ slotData, setSlotData }), [slotData, setSlotData]);

  return <EditSlotContext.Provider value={contextValue}>{children}</EditSlotContext.Provider>;
};

// export { TitleContext, TitleProvider };

EditSlotProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

TitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
