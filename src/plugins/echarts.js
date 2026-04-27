import * as echarts from 'echarts'
import api from '@/api/index.js'

export default {
    install: (app) => {
        app.config.globalProperties.$line = (element, data) => {
            var myChart = echarts.init(document.getElementById(element))
            const option = {

                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['隧道增加数量', '地质预测数量'],
                    top: 0,
                    left: 'center',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: 48,
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: data
            };
            myChart.setOption(option)
        },

            app.config.globalProperties.$radar = (element, data) => {
                var myChart = echarts.init(document.getElementById(element))
                const option = {
                    title: {
                        text: 'Basic Radar Chart'
                    },
                    legend: {
                        data: ['Allocated Budget', 'Actual Spending']
                    },
                    radar: {
                        // shape: 'circle',
                        indicator: [
                            { name: 'Sales', max: 6500 },
                            { name: 'Administration', max: 16000 },
                            { name: 'Information Technology', max: 30000 },
                            { name: 'Customer Support', max: 38000 },
                            { name: 'Development', max: 52000 },
                            { name: 'Marketing', max: 25000 }
                        ]
                    },
                    series: [
                        {
                            name: 'Budget vs spending',
                            type: 'radar',
                            data: [
                                {
                                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                                    name: 'Allocated Budget'
                                },
                                {
                                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                                    name: 'Actual Spending'
                                }
                            ]
                        }
                    ]
                };
                myChart.setOption(option)
            },

            app.config.globalProperties.$pie = (element, data) => {
                var myChart = echarts.init(document.getElementById(element))
                const option = {
                    title: {
                        text: 'Referer of a Website',
                        subtext: 'Fake Data',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' }
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option)
            },

            app.config.globalProperties.$bar = (element, data) => {
                var myChart = echarts.init(document.getElementById(element))
                const option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [
                                120,
                                {
                                    value: 200,
                                    itemStyle: {
                                        color: '#505372'
                                    }
                                },
                                150,
                                80,
                                70,
                                110,
                                130
                            ],
                            type: 'bar'
                        }
                    ]
                };
                myChart.setOption(option)
            },

            app.config.globalProperties.$china = async (element) => {
                var myChart = echarts.init(document.getElementById(element))
                const { data: geoJson } = await api.getMap()
                echarts.registerMap('china', geoJson)
                myChart.setOption({
                    tooltip: {
                        trigger: 'item',
                    },
                    visualMap: {
                        show: true,
                        min: 0,
                        max: 100,
                        left: 'left',
                        bottom: 30,
                        orient: 'vertical',
                        text: ['高', '低'],
                        calculable: true,
                        inRange: {
                            color: ['#e0f3f8', '#43a2ca', '#0868ac'],
                        },
                    },
                    series: [
                        {
                            name: '数据',
                            type: 'map',
                            map: 'china',
                            nameProperty: 'fullname',
                            roam: true,
                            label: { show: true },
                            data: [
                                { name: '北京市', value: 80 },
                                { name: '广东省', value: 60 },
                                { name: '新疆维吾尔自治区', value: 30 },
                            ],
                        },
                    ],
                })
            }
    }
}