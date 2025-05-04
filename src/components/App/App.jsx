import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import s from './App.module.css'


const Header = lazy(() => import("../Header/Header"));
const DashboardPage = lazy(() =>
  import("../../pages/DashboardPage/DashboardPage")
);
const CallbackPage = lazy(() =>
  import("../../pages/CallbackPage/CallbackPage")
);
const NotFoundPage = lazy(() => import('../../pages/NotFoundPag/NotFoundPage'))

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />}></Route>
        <Route path="" element={<CallbackPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );   
    
}

export default App;