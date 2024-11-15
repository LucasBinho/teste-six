import { Routes, Route } from "react-router-dom";
import App from "../App"; 
import ThankYou from "../ThankYou"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}