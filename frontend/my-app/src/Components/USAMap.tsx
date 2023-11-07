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
                max: 75000,
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
                        { name: 'Alabama', value: 483 },
                        { name: 'Alaska', value: 7 },
                        { name: 'Arizona', value: 255 },
                        { name: 'Arkansas', value: 294 },
                        { name: 'California', value: 61430 },
                        { name: 'Colorado', value: 5182 },
                        { name: 'Connecticut', value: 347 },
                        { name: 'Delaware', value: 92 },
                        { name: 'District of Columbia', value: 23 },
                        { name: 'Florida', value: 17568 },
                        { name: 'Georgia', value: 9945 },
                        { name: 'Hawaii', value: 13 },
                        { name: 'Idaho', value: 128 },
                        { name: 'Illinois', value: 2255 },
                        { name: 'Indiana', value: 334 },
                        { name: 'Iowa', value: 186 },
                        { name: 'Kansas', value: 288 },
                        { name: 'Kentucky', value: 415 },
                        { name: 'Louisiana', value: 460 },
                        { name: 'Maine', value: 132 },
                        { name: 'Maryland', value: 5883 },
                        { name: 'Massachusetts', value: 6144 },
                        { name: 'Michigan', value: 988 },
                        { name: 'Minnesota', value: 9139 },
                        { name: 'Mississippi', value: 29849 },
                        { name: 'Missouri', value: 980 },
                        { name: 'Montana', value: 105 },
                        { name: 'Nebraska', value: 1825 },
                        { name: 'Nevada', value: 2731 },
                        { name: 'New Hampshire', value: 118 },
                        { name: 'New Jersey', value: 48640 },
                        { name: 'New Mexico', value: 2085 },
                        { name: 'New York', value: 70261 },
                        { name: 'North Carolina', value: 12073 },
                        { name: 'North Dakota', value: 628 },
                        { name: 'Ohio', value: 1154 },
                        { name: 'Oklahoma', value: 3814 },
                        { name: 'Oregon', value: 14389 },
                        { name: 'Pennsylvania', value: 12763 },
                        { name: 'Rhode Island', value: 15 },
                        { name: 'South Carolina', value: 472 },
                        { name: 'South Dakota', value: 83 },
                        { name: 'Tennessee', value: 6456 },
                        { name: 'Texas', value: 26059 },
                        { name: 'Utah', value: 255 },
                        { name: 'Vermont', value: 601 },
                        { name: 'Virginia', value: 8185 },
                        { name: 'Washington', value: 68970 },
                        { name: 'West Virginia', value: 1855 },
                        { name: 'Wisconsin', value: 26398 },
                        { name: 'Wyoming', value: 412 },
                        { name: 'Puerto Rico', value: 84 }
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
