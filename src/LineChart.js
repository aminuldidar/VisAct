import ReactEcharts from 'echarts-for-react';
function LineChart(Props){

    var parsedData;
    var data_ver_x;
    var data_ver_y;
    //console.log(Props.data.fileType);
    
    if(Props.data.fileType==='csv'){
        //console.log(Props.data.parsedData);
        parsedData=Props.data.parsedData;
        data_ver_x = parsedData.map(parsedData =>  parsedData[Props.data.x_axis]);
        data_ver_y = parsedData.map(parsedData =>  parsedData[Props.data.y_axis]);
        //data_ver_x = data_ver_x
        //data_ver_y = 
    }
    else if(Props.data.fileType==='json'){
        console.log(Props.data.parsedData.AvgTemperature);
        console.log(Props.data.y_axis);
        let AvgTemperature=Props.data.y_axis;
        data_ver_y = Object.values(Props.data.parsedData[AvgTemperature]);
        //data_ver_y = Object.values(Props.data.parsedDdata[Props.data.y_axis.trim()]);
        data_ver_x = Object.values(Props.data.parsedData[Props.data.x_axis]);

    }
  
    return (<ReactEcharts
    
                option={{
                xAxis: {
                    type: 'category',
                    data: data_ver_x
                },
                yAxis: {
                    type: 'value'
                },
                series: [{ 
                    data: data_ver_y,
                    type: 'line',
                    lineStyle: {
                        color: "#25f1f52",
                        width: 2
                    },
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: "#a5b0af"
                    }
                }]
            }}
        />);
        }
export default LineChart;
