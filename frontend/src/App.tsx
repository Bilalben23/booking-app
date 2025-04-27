import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./router/routes";
import Callback from "./features/auth/pages/Callback";
import HomePage from "./features/home/pages/HomePage";
import PersistLogin from "./components/PersistLogin";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.HOME} element={<MainLayout />}>
            <Route index element={<HomePage />} />


            {/* Other routes */}
          </Route>
        </Route>

        <Route path="/callback" element={<Callback />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
