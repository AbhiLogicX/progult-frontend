import PropTypes from 'prop-types';
import React, { useMemo, useState, createContext } from 'react';

export const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState('');

  const contextValue = useMemo(() => ({ title, setTitle }), [title, setTitle]);

  return <TitleContext.Provider value={contextValue}>{children}</TitleContext.Provider>;
};

// export { TitleContext, TitleProvider };

TitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
