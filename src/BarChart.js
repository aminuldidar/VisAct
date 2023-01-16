import ReactEcharts from 'echarts-for-react';
function BarChart(Props) {

    var chartData=Props.chartData.parsedData;
    
    var legendData=[];
    var dataDisplay=[];
    chartData.forEach(element => {
        //let elm={};
        for (const key in element) {

            if(key===Props.chartData.y_axis){
                console.log(`${key}: ${element[Props.chartData.y_axis]}`);
                //legendData.push(`${element[key]}`);
                dataDisplay.push(element[Props.chartData.y_axis]);
            }
            
            if(key===Props.chartData.x_axis){
                console.log(`${key}: ${element[Props.chartData.x_axis]}`);
                legendData.push(element[key]);
                //elm['name']= element[Props.chartData.x_axis];
            }

           
        }
        
        
    });

    console.log(legendData);
    console.log(dataDisplay);

  return(<ReactEcharts
    option={{
      xAxis: {
        type: 'category',
        data: legendData
      },
      yAxis: {
        type: 'value'
      },
      series: [{ 
        data: dataDisplay,
        type: 'bar'
      }]
    }}
  />);

}

  export default BarChart;

  //['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //[820, 932, 901, 934, 1290, 1330, 1320]