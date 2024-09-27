import logo from './logo.svg';
import AdminRoutes from './Routes/AdminRoutes';
import NonAdminRoutes from './Routes/NonAdminRoutes';
import { UserAdmin } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import NonUserRoutes from './Routes/NonUserRoutes';
import { useEffect } from 'react';


function App() {

  const {isLoggedIn, role} = useAuth();

  return (
    
    <div className="App">
      {role === 'admin' ? <AdminRoutes /> : isLoggedIn ? <NonAdminRoutes /> : <NonUserRoutes />}
    </div>
  );
}

export default App;
