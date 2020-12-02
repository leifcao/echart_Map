let barData = [ {value: 60, name: '前期欠款'},
  {value: 50, name: '当月实收'},
  {value: 100, name: '预收金额'}];
let barOption = {
  color: ['#87bdfa','#d4d1fb','#63c8c6'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    top:'5%',
    right: '2%',
    bottom: '15%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['前期欠款', '物业费', '预收金额'],
      axisTick: {
        alignWithLabel: true
      },
      show:false,
    }
  ],
  yAxis: [
    {
      type: 'value',
      //轴线上的字
      axisLabel: {
        textStyle: {
          fontSize: '12',
          color: '#ffffff'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#d2d2d2'
        }
      },
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: '20%',
      itemStyle: {
        normal: {
          color: function(params) { //展示正值的柱子，负数设为透明
            let colorArr = params.value > 0 ? ['#3685F2','#007ed3'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: colorArr[0] // 0% 处的颜色
            }, {
              offset: 1,
              color: colorArr[1] // 100% 处的颜色
            }], false)
          },
          barBorderRadius: [30, 30, 0, 0] //圆角大小
        },
      },
      data: barData,
    },
  ]
};

let bar = document.getElementById('barChart');
let barChart = echarts.init(bar)
barChart.setOption(barOption);

