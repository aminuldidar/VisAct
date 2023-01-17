function ShowData(Props) {
  return (
    <>
      <h3 className="text-lg text-[#1e2a3c] font-bold">Top 10 Rows</h3>
      <table className="table leading-[.08]">
        <thead>
          <tr>
            {Props.tableData.tableRows.map((rows, index) => {
              return (
                <th className="capitalize text-md font-bold" key={index}>
                  {rows}
                </th>
              );
            })}
          </tr>
        </thead>
        {
          <tbody>
            {Props.tableData.rowValues.slice(0, 10).map((value, index) => {
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
