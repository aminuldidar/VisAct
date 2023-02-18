import { useState } from "react";


function ShowData(Props) {
  
  const [rowNumStart, setRowNumStart] = useState([0]);
  const [rowNumEnd, setRowNumEnd] = useState([10]);

  const displayRows = (event) => {
    event.preventDefault();
    //let message="";
    
  };

  const changeHandler = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    if(event.target.name==="rowNumStart") 
      setRowNumStart(event.target.value)
    else
      setRowNumEnd(event.target.value)
    
  
    //if (event.target.files[0] === undefined) return;
  }


  return (
    <>
      {/*<h4 className="text-lg text-[#1e2a3c] font-bold">Display Rows</h4>*/}
      <h3 className="text-lg text-[#1e2a3c] font-bold">Display Rows {rowNumStart} to  {rowNumEnd}</h3>
      
      <form onSubmit={displayRows} className="flex flex-col">
          <input
            type="number"
            name="rowNumStart"
            onChange={changeHandler}
            
            className="px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded-lg transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-4"
          />
          <input
            type="number"
            name="rowNumEnd"
            onChange={changeHandler}
            
            className="px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded-lg transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-4"
          />
          {/*
          <button type="submit" className="btn">
            Display
          </button>
          */
          }
      </form>


      <table className="table leading-[.08]">
        <thead>
          <tr>
            {Props.tableData.tableRows.map((rows, index) => {
              return (
                <th className="capitalize text-lg font-bold text-center" key={index}>
                  {rows}
                </th>
              );
            })}
          </tr>
        </thead>
        {
          <tbody>
            {Props.tableData.rowValues.slice(rowNumStart, rowNumEnd).map((value, index) => {
              //console.log(index);
              //if(index<10)
              return (
                <tr key={index}>
                  {value.map((val, i) => {
                    return (
                      <td className="text-center" key={i}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        }
      </table>
    </>
  );
}

export default ShowData;
