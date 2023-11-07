import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';

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
    LineChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

const LineCharts: React.FC = () => {
    useEffect(() => {
        var myChart = echarts.init(document.getElementById('chart') as HTMLDivElement);

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
                    data: [130, 120, 160, 118, 140, 270, 290],
                    type: 'line'
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

export default LineCharts;
