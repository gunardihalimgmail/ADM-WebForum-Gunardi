import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MyContextType {
  // Define the structure of your context
  // For example, you might have properties like value1, value2, etc.
  value1: string;
  value2: number;
}

const MyContext = createContext<any>(null);

const MyContextProvider = ({ children }) => {
    const [contextValue, setContextValue] = useState(/* initial context value */);
  
    return (
      <MyContext.Provider value={{ contextValue, setContextValue }}>
        {children}
      </MyContext.Provider>
    );
  };

  const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
  };

// const { Provider, Consumer } = MyContext;

// const { Provider, Consumer } = MyContext;

// interface MyContextProviderProps {
//   children: ReactNode;
//   // You can include other props if needed
// }

// const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
//   // Provide a meaningful default value for your context
//   const defaultValue: MyContextType = {
//     value1: 'default value',
//     value2: 42,
//   };

//   return <MyContext.Provider value={defaultValue}>{children}</MyContext.Provider>;
// };

// export { Provider, Consumer, MyContext };

export { MyContextProvider, useMyContext };

