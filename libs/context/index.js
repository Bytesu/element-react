
import { createContext } from 'react';

const ParentContext = createContext({});
ParentContext.displayName = 'ParentContext';

const RowContext = createContext({});
RowContext.displayName = 'RowContext';
ParentContext.RowContext = RowContext;

export default ParentContext;
