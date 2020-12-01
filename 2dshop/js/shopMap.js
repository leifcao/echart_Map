let containers = document.getElementById('container');
let myChart = echarts.init(containers);
myChart.showLoading();

$.get('data/shop.json', function (usaJson) {
// $.get('data/map2.geojson', function(usaJson) {

  myChart.hideLoading();
  console.log(usaJson)

  echarts.registerMap('SHOP', usaJson, {});
  option = {
    // title: {
    //     text: 'USA Population Estimates (2012)',
    //     subtext: 'Data from www.census.gov',
    //     sublink: 'http://www.census.gov/popest/data/datasets.html',
    //     left: 'right'
    // },

    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: function (params) {
        var value = (params.value + '').split('.');
        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
        return params.name + '<br/>' + params.seriesName + ': ' + value;
      }
    },
    visualMap: {
      left: 'right',
      min: 0,
      max: 150,
      inRange: {
        color: ['#d7efff', '#a7dcff', '#7ccaff', '#50b9ff', '#24a7ff',]
        // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027']
      },
      text: ['High', 'Low'], // 文本，默认为数值文本
      calculable: true,
      // show: false
    },

    series: [{
      name: '柜台面积',
      type: 'map',
      roam: true,
      map: 'SHOP',
      emphasis: {
        label: {
          show: true
        }
      },
      // 文本位置修正
      textFixed: {
        Alaska: [20, -20]
      },
      data: [
        {name: 'B101', value: 77},
        {name: 'B102', value: 87},
        {name: 'B103', value: 132},
        {name: 'B104', value: 111},
        {name: 'B105', value: 66},
        {name: 'B106', value: 67},
        {name: 'B107', value: 43},
        {name: 'B108', value: 52},
        {name: 'B109', value: 65},
        {name: 'B110', value: 41},
        {name: 'B111', value: 62},
        {name: 'B112', value: 51},
        {name: 'B113', value: 98},
        {name: 'B114', value: 51},
        {name: 'B115', value: 39},
        {name: 'B116', value: 12},
      ],
      markPoint: {
        // symbol: 'image://' + require('../../../assets/newui/leaf-blue.png'),// 自定义图片路径
        symbol: 'circle',// 自定义图片路径
        symbolSize: [15, 20], // 图片大小
        label: {
          position: 'top',
          color: '#fff'
        },
        // coord数组存放地址坐标
        data: [
          {name: 'B101', coord: [60, 284], value: 65},
          {name: 'B108', coord: [329, 357], value: 52},
        ]
      }
    }]
  };


  myChart.setOption(option);

});

var tag = true;
myChart.on('click', function (params) {
  if (tag) {
    tag = false;
    document.getElementById('shop_main').style.display = 'none';
    document.getElementById('shop_details').style.display = 'block';
  }
  // alert(params.name)
  // console.log(params);

  showMessage(params.name);

});

window.onresize = function () {
  myChart.resize();
}

