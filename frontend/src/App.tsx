import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./router/routes";
import Callback from "./features/auth/pages/Callback";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<div> Home page </div>} />


          {/* Other routes */}
        </Route>
        <Route path="/callback" element={<Callback />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
