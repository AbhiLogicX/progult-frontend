import PropTypes from 'prop-types';
import React, { useMemo, useState, createContext } from 'react';

export const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState('');

  const contextValue = useMemo(() => ({ title, setTitle }), [title, setTitle]);

  return <TitleContext.Provider value={contextValue}>{children}</TitleContext.Provider>;
};

// export { TitleContext, TitleProvider };

export const BussinessDetailsContext = createContext();

export const BussinessDetailProvider = ({ children }) => {
  const [bussinessDetails, setBussinessDetails] = useState({});

  const contextValue = useMemo(
    () => ({ bussinessDetails, setBussinessDetails }),
    [bussinessDetails, setBussinessDetails]
  );

  return (
    <BussinessDetailsContext.Provider value={contextValue}>
      {children}
    </BussinessDetailsContext.Provider>
  );
};

// export { TitleContext, TitleProvider };

BussinessDetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

TitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
