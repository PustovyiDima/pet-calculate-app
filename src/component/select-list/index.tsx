import "./index.css";
import { useNavigate } from "react-router-dom";

type ComponentProps = {
   title: string;
   values: string[];
};

const SelectList: React.FC<ComponentProps> = ({ title, values }) => {
   return <div className="select"></div>;
};

export default SelectList;
