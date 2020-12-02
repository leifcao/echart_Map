
let pieData = [
  {value: 335, name: '租金'},
  {value: 310, name: '物业费'},
  {value: 234, name: '其他费用'},
];

// let colorList = ['#87bdfa','#d4d1fb','#63c8c6'];
// let colorList = ['#4956ff', '#2d82ff', '#2dc6ff'];
let colorList = ['#3685F2','#007ed3','#20ade5'];

let pieOption = {
  color:colorList,
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    right: '10%',
    top:'center',
    data: ['租金', '物业费', '其他费用'],
    textStyle: {
      fontWeight: 'normal',
      // fontSize: 14,
      color: function(index){
        var num = colorList.length;
        return myColor[index % num];
      }
    },
    icon:'diamond', //  字段控制形状  类型包括 circle，rect,line，roundRect，triangle，diamond，pin，arrow，none
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['35%', '40%'],
      label: {
        normal: {
          position: 'inner'
        }
      },
      // itemStyle: {
      //   normal: {
      //     borderColor: '#fff',
      //     borderWidth: 2
      //   }
      // },
      data: pieData,
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

let pie = document.getElementById('pieChart');
var pieChart = echarts.init(pie);
pieChart.setOption(pieOption);
