function ShowData(Props){


    return(<>
            <h3>Top 10 Rows</h3>
            <table>
                <thead>
                <tr>
                    {Props.tableData.tableRows.map((rows, index) => {
                    return <th key={index}>{rows}</th>;
                    })}
                </tr>
                </thead>
                {
                <tbody>
                    {Props.tableData.rowValues.slice(0, 10).map((value, index) => {
                    //console.log(index);
                    //if(index<10)
                        return (<tr key={index}>
                            {value.map((val, i) => {
                            return <td key={i}>{val}</td>;
                            })}
                        </tr>
                        
                        )
                    
                    ;
                    })}
                </tbody>
                
                }
            </table>
    </>);
}

export default ShowData;