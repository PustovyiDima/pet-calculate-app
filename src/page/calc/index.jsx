import BackBtn from "../../component/back-button";
import "./index.css";
import { useEffect, useReducer, useCallback } from "react";

const load = () => {
   return window.localStorage.getItem("calc");
};

const save = (list) => {
   window.localStorage.setItem("calc", list);
};

const ACTION_TYPE = {
   ADD: "add",
   CALC: "calc",
   RESET: "reset",
   DOT: "dot",
   OP: "op",
   REMOVE: "remove",
};

const OP_VALUE = {
   MINUS: "-",
   PLUS: "+",
   MULTIPLY: "*",
   DIVIDE: "/",
};

const stateCalcReduser = (state, action) => {
   let sumvalue = state.value + action.payload;
   switch (action.type) {
      case ACTION_TYPE.ADD:
         return { ...state, value: sumvalue, canCalc: true };

      case ACTION_TYPE.RESET:
         // console.log("reset");
         return {
            ...state,
            value: "",
            result: "0",
            isDot: false,
            canCalc: false,
         };

      case ACTION_TYPE.DOT:
         return { ...state, value: sumvalue, isDot: true, canCalc: false };

      case ACTION_TYPE.OP:
         return {
            ...state,
            value: state.value + action.payload,
            isDot: false,
            canCalc: false,
         };

      case ACTION_TYPE.REMOVE:
         let remvalue = state.value[state.value.length - 1];
         // console.log(remvalue);
         let isDot = state.isDot;
         if (remvalue === "." && isDot) {
            isDot = false;
         }
         let canCalc = state.canCalc;
         if (Object.values(OP_VALUE).includes(remvalue) || remvalue === ".") {
            canCalc = true;
         }
         let vale = state.value.slice(0, -1);
         return { ...state, value: vale, isDot: isDot, canCalc: canCalc };

      case ACTION_TYPE.CALC:
         // eslint-disable-next-line no-eval
         let result = Number(eval(state.value));

         result = String(result.toFixed(2));
         result = result === "Infinity" ? "Ділення на нуль" : result;
         // console.log(result, "result");
         const time = new Date().getTime();
         const listItem = {
            date: time,
            value: state.value,
            result: result,
         };

         // console.log(listItem, typeof state.list);
         let list = [];
         list = list.concat(state.list, listItem);
         let time1 = new Date().getTime();
         list = list.filter((obj) => time1 - obj.date < 60000);
         list = list.sort((a, b) => Number(b.date) - Number(a.date));

         return {
            ...state,
            value: "",
            result: result,
            isDot: false,
            list: list,
         };

      default:
         return state;
   }
};

export default function Calculator() {
   const [stateLine, dispachValues] = useReducer(stateCalcReduser, {
      value: "",
      result: "0",
      isDot: false,
      list: JSON.parse(load()) || [],
      canCalc: false,
   });

   useEffect(() => {
      if (stateLine.list.length > 0) {
         save(JSON.stringify(stateLine.list));
      }
   }, [stateLine.list]);

   const handleAdd = (val) => () => {
      dispachValues({ type: ACTION_TYPE.ADD, payload: val });
   };

   const handleOp = (val) => () => {
      if (
         stateLine.result === "0" &&
         val === OP_VALUE.MINUS &&
         isNaN(stateLine.value[stateLine.value.length - 1]) &&
         stateLine.value.length === 0
      ) {
         dispachValues({
            type: ACTION_TYPE.OP,
            payload: OP_VALUE.MINUS,
         });
         return;
      }
      if (isNaN(stateLine.result)) {
         // console.log(isNaN(stateLine.result));
         dispachValues({
            type: ACTION_TYPE.OP,
            payload: "0" + val,
         });
         return;
      }

      if (
         stateLine.result !== 0 &&
         isNaN(stateLine.value[stateLine.value.length - 1]) &&
         stateLine.value.length < 2
      ) {
         dispachValues({
            type: ACTION_TYPE.OP,
            payload: stateLine.result + val,
         });
      }

      if (isNaN(stateLine.value[stateLine.value.length - 1])) {
         return null;
      }
      dispachValues({ type: ACTION_TYPE.OP, payload: val });
   };

   const handleDot = () => {
      if (stateLine.isDot) {
         return null;
      }
      if (
         stateLine.value === "" ||
         isNaN(stateLine.value[stateLine.value.length - 1])
      ) {
         dispachValues({
            type: ACTION_TYPE.DOT,
            payload: "0.",
         });
      } else {
         dispachValues({ type: ACTION_TYPE.DOT, payload: "." });
      }
   };

   const handleRemove = () => {
      if (stateLine.value === "") {
         return null;
      }
      dispachValues({ type: ACTION_TYPE.REMOVE });
   };

   return (
      <section className="calc_page" id="calc_page">
         <BackBtn />
         <div className="calculator">
            <div className="calculator__result">{stateLine.result}</div>
            <div className="calculator__output">
               <span id="calc">{stateLine.value}</span>
            </div>
            <div className="calculator__keys">
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp(OP_VALUE.PLUS)}
               >
                  +
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp(OP_VALUE.MINUS)}
               >
                  -
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp(OP_VALUE.MULTIPLY)}
               >
                  x
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp(OP_VALUE.DIVIDE)}
               >
                  ÷
               </button>
               <button className="calculator__key" onClick={handleAdd(7)}>
                  7
               </button>
               <button className="calculator__key" onClick={handleAdd(8)}>
                  8
               </button>
               <button className="calculator__key" onClick={handleAdd(9)}>
                  9
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleRemove}
               >
                  {"<"}
               </button>
               <button className="calculator__key" onClick={handleAdd(4)}>
                  4
               </button>
               <button className="calculator__key" onClick={handleAdd(5)}>
                  5
               </button>
               <button className="calculator__key" onClick={handleAdd(6)}>
                  6
               </button>
               <button className="calculator__key" onClick={handleAdd(1)}>
                  1
               </button>
               <button className="calculator__key" onClick={handleAdd(2)}>
                  2
               </button>
               <button className="calculator__key" onClick={handleAdd(3)}>
                  3
               </button>
               <button className="calculator__key" onClick={handleAdd(0)}>
                  0
               </button>
               <button className="calculator__key" onClick={handleDot}>
                  .
               </button>
               <button
                  className="calculator__key"
                  onClick={() => dispachValues({ type: ACTION_TYPE.RESET })}
               >
                  AC
               </button>
               <button
                  className={`calculator__key ${
                     stateLine.canCalc
                        ? "calculator__key--enter"
                        : "calculator__key--enter--def"
                  }`}
                  onClick={() => {
                     if (stateLine.value === "") {
                        return null;
                     }
                     if (stateLine.canCalc) {
                        dispachValues({ type: ACTION_TYPE.CALC });
                     }
                  }}
               >
                  =
               </button>
            </div>
         </div>
         <div className="calc__history">
            {stateLine.list.length > 0
               ? stateLine.list.map((obj) => (
                    <div key={obj.date} className="history-list__item">
                       {obj.value} = {obj.result}
                    </div>
                 ))
               : "Історія розрахунків порожня"}
         </div>
      </section>
   );
}
