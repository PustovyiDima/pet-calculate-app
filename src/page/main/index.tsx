import { Link } from "react-router-dom";
import "./index.css";

export default function Container() {
   return (
      <section className="welcome-page">
         <Link to={"/calc"}>Калькулятор</Link>
      </section>
   );
}
