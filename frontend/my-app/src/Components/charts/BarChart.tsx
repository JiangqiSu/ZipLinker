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

const BarCharts: React.FC = () => {
    useEffect(() => {
        var myChart = echarts.init(document.getElementById('chart') as HTMLDivElement);

        const options = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
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

    return <div id="chart" style={{ width: '100%', height: '700px' }}></div>;
};

export default BarCharts;
