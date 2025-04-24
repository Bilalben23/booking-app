import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ROUTES } from "./router/routes";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainLayout />}>
          <Route index element={<h1 className="py-[500px]">Home page</h1>} />

          {/* Other routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
