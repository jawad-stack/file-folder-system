 // App.js
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Suspense } from 'react';
import Routers from './Navigation/Routers.jsx';



function App() {
  return (
    <AuthProvider>
      <Suspense fallback={"Loading"}>
        <Routers />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
