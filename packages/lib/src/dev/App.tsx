import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestAppbar } from "./components/TestAppbar";
import { TestHomePage } from "./components/TestHomePage";
import { TestDataGrid } from "./components/TestDataGrid";
import { TestForm } from "./components/TestForm";

import { useTheme } from "library";

import styles from "./App.css";
import "./Global.css";

export const App = () => {
  const theme = useTheme();

  return (
    <div
      className={styles.App}
      style={{
        backgroundColor: theme.palette.darkMode
          ? "rgba(0, 0, 128, 0.5)"
          : "rgba(255, 127, 80, 0.7)",
      }}
    >
      <BrowserRouter>
        <TestAppbar />
        <Routes>
          <Route path="/" element={<TestHomePage />} />
          <Route path="/dataGrid" element={<TestDataGrid />} />
          <Route path="/form" element={<TestForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
