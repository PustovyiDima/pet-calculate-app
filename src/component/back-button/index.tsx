import "./index.css";
import { useNavigate } from "react-router-dom";

type ComponentProps = {
   title?: string;
};
const BackBtn: React.FC<ComponentProps> = ({ title }) => {
   const navigate = useNavigate();
   const handleClick = () => navigate(-1);

   return (
      <div
         style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px 20px ",
         }}
      >
         <div
            onClick={handleClick}
            className="backBtn"
            style={{ cursor: "pointer", width: "30px" }}
         >
            <img
               src="/svg/arrow-back-outline 1.svg"
               alt="<"
               width="24"
               height="24"
            />
         </div>
         {title && <div className="backBtn-title">{title}</div>}
      </div>
   );
};

export default BackBtn;
