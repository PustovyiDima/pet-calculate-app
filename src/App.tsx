import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/main";
import Calculator from "./page/calc";

// =========================================================================
function App() {
   // console.log("render");
   // const session = getSession();

   return (
      // <ThemeContext.Provider value={themeContextData}>
      <BrowserRouter>
         <Routes>
            <Route index path="/" element={<MainPage />} />
            <Route index path="/calc" element={<Calculator />} />
         </Routes>
      </BrowserRouter>
      // </ThemeContext.Provider>
   );
}

export default App;
