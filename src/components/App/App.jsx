import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import s from "./App.module.css";

const Header = lazy(() => import("../Header/Header"));
const DashboardPage = lazy(() =>
  import("../../pages/DashboardPage/DashboardPage")
);
const CallbackPage = lazy(() =>
  import("../../pages/CallbackPage/CallbackPage")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPag/NotFoundPage")); // ← typo?

const App = () => {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <div className={s.wrapper}>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
