import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import {geoJson} from './USAJson';

import {
    TitleComponent,
    TitleComponentOption,
    ToolboxComponent,
    ToolboxComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    VisualMapComponent,
    VisualMapComponentOption,
    GeoComponent,
    GeoComponentOption
} from 'echarts/components';

import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { MapChart, MapSeriesOption } from 'echarts/charts';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | ToolboxComponentOption
    | TooltipComponentOption
    | VisualMapComponentOption
    | GeoComponentOption
    | MapSeriesOption
    >;

const USAMap: React.FC = () => {
    useEffect(() => {
        // var chartDom = document.getElementById('chart')!;
        // var myChart = echarts.init(chartDom);
        var myChart = echarts.init(document.getElementById('chart') as HTMLDivElement);

        var options: EChartsOption;

        echarts.registerMap('USA', geoJson, {
            Alaska: {
                left: -135,
                top: 20,
                width: 25
            },
            Hawaii: {
                left: -105,
                top: 22,
                width: 5
            },
            'Puerto Rico': {
                left: -76,
                top: 26,
                width: 2
            }
        });
        options = {
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
            },
            visualMap: {
                left: 'right',
                min: 0,
                max: 5000,
                inRange: {
                    color: [
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                    ]
                },
                text: ['High', 'Low'],
                calculable: true
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
            series: [
                {
                    name: 'Number of Clicks',
                    type: 'map',
                    roam: true,
                    map: 'USA',
                    emphasis: {
                        label: {
                            show: true
                        }
                    },
                    data: [
                        { name: 'Alabama', value: 0 },
                        { name: 'Alaska', value: 0 },
                        { name: 'Arizona', value: 0 },
                        { name: 'Arkansas', value: 0 },
                        { name: 'California', value: 0 },
                        { name: 'Colorado', value: 0 },
                        { name: 'Connecticut', value: 0 },
                        { name: 'Delaware', value: 0 },
                        { name: 'District of Columbia', value: 0 },
                        { name: 'Florida', value: 0 },
                        { name: 'Georgia', value: 0 },
                        { name: 'Hawaii', value: 0 },
                        { name: 'Idaho', value: 0 },
                        { name: 'Illinois', value: 0 },
                        { name: 'Indiana', value: 0 },
                        { name: 'Iowa', value: 0 },
                        { name: 'Kansas', value: 0 },
                        { name: 'Kentucky', value: 0 },
                        { name: 'Louisiana', value: 0 },
                        { name: 'Maine', value: 0 },
                        { name: 'Maryland', value: 0 },
                        { name: 'Massachusetts', value: 0 },
                        { name: 'Michigan', value: 0 },
                        { name: 'Minnesota', value: 0 },
                        { name: 'Mississippi', value: 0 },
                        { name: 'Missouri', value: 0 },
                        { name: 'Montana', value: 0 },
                        { name: 'Nebraska', value: 0 },
                        { name: 'Nevada', value: 0 },
                        { name: 'New Hampshire', value: 0 },
                        { name: 'New Jersey', value: 0 },
                        { name: 'New Mexico', value: 0 },
                        { name: 'New York', value: 0 },
                        { name: 'North Carolina', value: 0 },
                        { name: 'North Dakota', value: 0 },
                        { name: 'Ohio', value: 0 },
                        { name: 'Oklahoma', value: 0 },
                        { name: 'Oregon', value: 0 },
                        { name: 'Pennsylvania', value: 0 },
                        { name: 'Rhode Island', value: 0 },
                        { name: 'South Carolina', value: 0 },
                        { name: 'South Dakota', value: 0 },
                        { name: 'Tennessee', value: 0 },
                        { name: 'Texas', value: 0 },
                        { name: 'Utah', value: 0 },
                        { name: 'Vermont', value: 0 },
                        { name: 'Virginia', value: 0 },
                        { name: 'Washington', value: 0 },
                        { name: 'West Virginia', value: 0 },
                        { name: 'Wisconsin', value: 0 },
                        { name: 'Wyoming', value: 0 },
                        { name: 'Puerto Rico', value: 0 }
                    ]
                }
            ]
        };

        myChart.setOption(options);

        return () => {
            myChart.dispose();
        };
    },[]);

    return <div id="chart" style={{width: '1000px', height: '500px'}}/>;
};


export default USAMap;
