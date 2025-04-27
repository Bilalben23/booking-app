import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./router/routes";
import Callback from "./features/auth/pages/Callback";
import HomePage from "./features/home/pages/HomePage";
import PersistLogin from "./components/PersistLogin";
import NotFound from "./features/not-found/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./features/account/pages/ProfilePage";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Other routes */}
          </Route>
        </Route>

        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter >
  );
}

export default App;
