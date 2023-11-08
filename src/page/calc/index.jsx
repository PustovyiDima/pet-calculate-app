import "./index.css";
import { useCallback, useEffect, useReducer, useState } from "react";

const ACTION_TYPE = {
   ADD: "add",
   CALC: "calc",
   RESET: "reset",
   DOT: "dot",
   OP: "op",
};

const stateCalcReduser = (state, action) => {
   let sumvalue = state.value + action.payload;
   switch (action.type) {
      case ACTION_TYPE.ADD:
         return { ...state, value: sumvalue };
      case ACTION_TYPE.RESET:
         console.log("reset");
         return { ...state, value: "", result: "0" };
      case ACTION_TYPE.CALC:
         // eslint-disable-next-line no-eval
         const result = String(eval(state.value));
         console.log(result, "result");
         return { ...state, value: "", result: result, isDot: false };
      case ACTION_TYPE.DOT:
         return { ...state, value: sumvalue, isDot: true };

      case ACTION_TYPE.OP:
         return { ...state, value: sumvalue, isDot: false };

      default:
         return state;
   }
};

export default function Calculator() {
   const [stateLine, dispachValues] = useReducer(stateCalcReduser, {
      value: "",
      result: "0",
      isDot: false,
   });

   const handleAdd = (val) => () => {
      dispachValues({ type: ACTION_TYPE.ADD, payload: val });
   };

   const handleOp = (val) => () => {
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
         dispachValues({ type: ACTION_TYPE.DOT, payload: "0." });
      } else {
         dispachValues({ type: ACTION_TYPE.DOT, payload: "." });
      }
   };

   useEffect(() => {}, []); //load

   return (
      <section className="calc_page" id="calc_page">
         <div className="calculator">
            <div className="calculator__result">{stateLine.result}</div>
            <div className="calculator__output">
               <span id="calc">{stateLine.value}</span>
            </div>
            <div className="calculator__keys">
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp("+")}
               >
                  +
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp("-")}
               >
                  -
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp("*")}
               >
                  x
               </button>
               <button
                  className="calculator__key calculator__key--operator"
                  onClick={handleOp("/")}
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
                  className="calculator__key calculator__key--enter"
                  onClick={() => dispachValues({ type: ACTION_TYPE.CALC })}
               >
                  =
               </button>
            </div>
         </div>
      </section>
   );
}
