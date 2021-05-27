import { useTypedSelector } from "./use-typed-selector";

export const useCummulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const displayFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        
        var display = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object') {
            if(value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
             root.innerHTML = value;
          }
         };
        `;

    const displayFuncNoop = `var display = () => {
    
        }`;
    const cummulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cummulativeCode.push(displayFunc);
        } else {
          cummulativeCode.push(displayFuncNoop);
        }
        cummulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cummulativeCode;
  }).join("\n");
};
