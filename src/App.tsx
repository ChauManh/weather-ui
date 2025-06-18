import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoute, privateRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="text-center p-10">Đang kiểm tra đăng nhập...</div>;
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component;

            const Layout =
              route.Layout === null
                ? ({ children }: { children: React.ReactNode }) => <>{children}</>
                : route.Layout || DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoute.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.Layout === null
                ? ({ children }: { children: React.ReactNode }) => <>{children}</>
                : route.Layout || DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAuthenticated ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to="/sign-in" replace />
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
