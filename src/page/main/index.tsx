import { Link } from "react-router-dom";
import "./index.css";

export default function Container() {
   return (
      <section className="welcome-page">
         <div className="grid main--links">
            <Link to={"/calc"}>Калькулятор</Link>
            <Link to={"/calc"}>Маса</Link>
            <Link to={"/calc"}>Температура</Link>
            <Link to={"/calc"}>Відстань</Link>
         </div>
      </section>
   );
}
