'use client';
import { RootProvider } from './providers/index';
import { AppView } from './views/index';

export const App = () => {
  return (
    <RootProvider>
      <AppView />
    </RootProvider>
  );
};

export default App;
