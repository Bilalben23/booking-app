import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./constants/routes";
import Callback from "./features/auth/pages/Callback";
import HomePage from "./features/home/pages/HomePage";
import PersistLogin from "./components/PersistLogin";
import NotFound from "./features/not-found/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountLayout from "./features/account/layouts/AccountLayout";
import ProfilePage from "./features/account/pages/ProfilePage";
import BookingsPage from "./features/account/pages/BookingsPage";
import PlacesPage from "./features/account/pages/PlacesPage";
import CreatePlacePage from "./features/account/pages/CreatePlacePage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />

            <Route element={<ProtectedRoute />}>

              <Route path={ROUTES.ACCOUNT.ROOT} element={<AccountLayout />} >
                <Route index element={<ProfilePage />} />
                <Route path={ROUTES.ACCOUNT.BOOKINGS} element={<BookingsPage />} />
                <Route path={ROUTES.ACCOUNT.PLACES} element={<PlacesPage />} />
                <Route path={ROUTES.ACCOUNT.NEW_PLACE} element={<CreatePlacePage />} />
              </Route>

            </Route>

            {/* Other routes */}
          </Route>
        </Route>

        <Route path={ROUTES.CALLBACK} element={<Callback />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter >
  );
}

export default App;
