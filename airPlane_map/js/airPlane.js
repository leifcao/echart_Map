// 飞机场
let mapChart = echarts.init(document.getElementById('airPlaneMap'));
mapChart.showLoading();

$.getJSON('data/map.geojson', (response) => {
  // console.log(response);
  let datalist = [];
  let features = response.features.some((item, index) => {
    // A登机口颜色
    if (item.properties.name.indexOf('A') !== -1)
      datalist.push({
        name: item.properties.name,
        value: 6
      })
    //  B登机口颜色
    else if (item.properties.name.indexOf('B') !== -1) {
      datalist.push({
        name: item.properties.name,
        value: 7
      })
    }
  });

  // console.log(features, 'features')

  mapChart.hideLoading();
  echarts.registerMap('airPlaneMap', response, {});
  let option = {
    tooltip: {
      formatter: (p) => {
        if (p.name.indexOf('A') !== -1 || p.name.indexOf('B') !== -1)
          return p.name + "登机口";
        else
          return p.name;
      }
    },
    visualMap: {
      right: '2%',
      bottom: '2%',
      // orient: 'horizontal',
      align: 'left',
      itemWidth: 15,
      itemHeight: 10,
      // 图例
      splitList: [{
        start: 0.5,
        end: 1,
        label: '厕所',
        color: '#E3E3E3'
      }, {
        start: 1.5,
        end: 2,
        label: '医疗急救',
        color: '#f44336'
      }, {
        start: 2.5,
        end: 3,
        label: '餐厅',
        color: '#f8bc02',
      }, {
        start: 3.5,
        end: 4,
        label: '安检',
        color: '#46a4a1',
      }, {
        start: 4.5,
        end: 5,
        label: '问讯处',
        color: '#64c0ca',
      }, {
        start: 5.5,
        end: 6,
        label: 'A登机口',
        color: '#c0e6ff',
      }, {
        start: 6.5,
        end: 7,
        label: 'B登机口',
        color: '#c0e6ff',
      }, {
        start: 7.5,
        end: 8,
        label: '自助值机',
        color: '#c8d4f1',
      }, {
        start: 8.5,
        end: 9,
        label: '吸烟室',
        color: '#f1d1ca',
      }, {
        start: 9.5,
        end: 10,
        label: '值机柜台',
        color: '#f2b3a5',
      }, {
        start: 10.5,
        end: 11,
        label: '售票处',
        color: '#989cf6',
      }
      ],
      inRange: {
        color: ['#ffffff']
        // color: ['#d7efff', '#a7dcff', '#7ccaff', '#50b9ff', '#24a7ff',]
      },
      outOfRange: {
        color: ['#ffffff']
      }
    },

    series: [
      {
        name: '机场',
        type: 'map',
        mapType: 'airPlaneMap',
        zoom: 1, // 地图初始大小
        roam: true, // 允许放大缩小
        geoIndex: 0,
        itemStyle: {
          normal: {
            areaColor: '#86ceff',
            // 文本自定义
            label: {
              show: true,
              fontSize: 15,
              formatter: params => {  // 显示图标
                // console.log(params);
                let name = params.name
                if (name === '安检')
                  return "🚹";   //☎ 💺 👣 🚬
                if (name === '厕所')
                  return "🚻";
                if (name === '医疗急救')
                  return "✚";
                if (name === '吸烟室')
                  return "🚬";
                if (name === '问询处')
                  return "❓";
                if (name === '餐厅')
                  return "🍴";
                if (name === '自助值机')
                  return "💻";
                if (name === '值机柜台')
                  return "💁";
                if (name === '售票处')
                  return "💴";
                if (name === '入口')
                  return "👮";
                if (name.indexOf('B') !== -1 || name.indexOf('A') !== -1) {
                  return name + "✈";
                }
              },
            },
          },
          // 高亮显示
          emphasis: {
            label: {
              show: true,
            },
          }
        },
        data: [
          {name: '厕所', value: 1,},
          {name: '医疗急救', value: 2,},
          {name: '餐厅', value: 3,},
          {name: '安检', value: 4,},
          {name: '问询处', value: 5,},
          {name: '自助值机', value: 8,},
          {name: '吸烟室', value: 9,},
          {name: '值机柜台', value: 10,},
          {name: '售票处', value: 11,},
          {name: '入口', value: 0,},
        ].concat(datalist)
      }]
  }
  mapChart.setOption(option);
})


// 将机场大框架高亮去除
mapChart.on("mouseover", (params) => {
    var name = params.name;
    if (name === '')
      mapChart.dispatchAction({type: "downplay", name: name});
  }
);


//数组切割-拼接字符串
function splitToHtml(params) {
  var params = params.split(',')
  var newValue = params.map(o => `<p>${o}</p>`).join('');
  return newValue
}

var tabTag = true;
//点击事件
mapChart.on('click', (params) => {
    var name = params.name;
    if (name.indexOf('A') !== -1 || name.indexOf('B') !== -1) {
      // 获取两个数字截取随机数组
      let num1 = Math.floor(Math.random() * 18);
      let num2 = Math.floor(Math.random() * 18);
      let newList = num1 < num2 ? airport_list.slice(num1, num2) : airport_list.slice(num2, num1);
      // 生成html代码插入树中
      var html = newList.map((item, i) => {
          var flightNum = splitToHtml(item.flightNum);
          var destination = splitToHtml(item.destination);
          var airline = splitToHtml(item.airline);
          return `<tr>
          <td>${flightNum}</td>
          <td>${destination}</td>
          <td>${airline}</td>
          <td>${item.start}</td>
          <td>${item.now}</td>
        </tr>`
        }
      ).join('');

      // 表格切换
      if (tabTag) {
        tabTag = false;
        document.getElementById('airport_main').style.display = 'none';
        document.getElementById('airport_main2').style.display = 'block';
      }
      document.querySelector('.airport_time').innerHTML = html;

    }
  }
)
// 机场图表的自适应
window.onresize = () => {
  mapChart.resize()
}