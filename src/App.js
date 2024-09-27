
import AdminRoutes from './Routes/AdminRoutes';
import NonAdminRoutes from './Routes/NonAdminRoutes';
import { useAuth } from './context/AuthContext';
import NonUserRoutes from './Routes/NonUserRoutes';



function App() {

  const {isLoggedIn, role} = useAuth();

  return (
    
    <div className="App">
      {role === 'admin' ? <AdminRoutes /> : isLoggedIn ? <NonAdminRoutes /> : <NonUserRoutes />}
    </div>
  );
}

export default App;
