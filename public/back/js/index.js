$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".pic_left"));
    var myChart1 = echarts.init(document.querySelector(".pic_right"));
    // 左侧柱状图
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [500, 2220, 3526, 1140, 1056, 920]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 右侧饼状图
    myChart1.setOption({
        series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: [{
                        value: 235,
                        name: '匹克'
                    },
                    {
                        value: 274,
                        name: '乔丹'
                    },
                    {
                        value: 310,
                        name: '李宁'
                    },
                    {
                        value: 335,
                        name: '阿迪'
                    },
                    {
                        value: 1020,
                        name: '耐克'
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }

        ]
    })

})