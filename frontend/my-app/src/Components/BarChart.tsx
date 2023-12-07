import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';

import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';

import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

function getDifferenceInDays(date1: Date, date2: Date) {
    const d = Math.abs(date1.getTime() - date2.getTime());
    const m = 1000 * 60 * 60 * 24;
    return Math.floor(d / m);
}

const BarCharts: React.FC = () => {
    useEffect(() => {
        var myChart = echarts.init(document.getElementById('chart') as HTMLDivElement);

        let chartData=[0, 0, 0, 0, 0, 0, 0];
        const today=new Date();
        for (const item of globalThis.urlList){
            if (new Date(item.expired)>today){
                let diff=getDifferenceInDays(today,new Date(item.created));
                chartData[6-diff]+=item.clicks;
            }
        }

        const options = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                //orient: 'vertical',
                left: 'left',
                top: 'top',
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: chartData,
                    type: 'bar'
                }
            ]
        };

        // Set the options and render the chart
        myChart.setOption(options);

        return () => {
            myChart.dispose();
        };
    },[]);

    return <div id="chart" style={{width: '100%', height: '500px'}}/>;
};

export default BarCharts;
