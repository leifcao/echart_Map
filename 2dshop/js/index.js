

//点击显示table信息
function showMessage(id) {
  if (!list[id]) return;
  var html0 = `
        <tr>
        <td>柜台号</td>
        <td>${list[id]['柜台号']}</td>
        <td>柜组编号</td>
        <td>${list[id]['柜组编码']}</td>
        </tr>
        <tr>
        <td>品牌编码</td>
        <td>${list[id]['品牌编码']}</td>
        <td>品牌名称</td>
        <td>${list[id]['品牌名称']}</td>
        </tr>
        <tr>
        <td>所属业种</td>
        <td>${list[id]['所属业种']}</td>
        <td>经营方式</td>
        <td>${list[id]['经营方式']}</td>
        </tr>
        <tr>
        <td>柜台面积</td>
        <td>${list[id]['柜台面积']}</td>
        <td>合同号</td>
        <td>${list[id]['合同号']}</td>
        </tr>
        <tr>
        <td>扣率</td>
        <td>${list[id]['扣率']}</td>
        <td>供货商</td>
        <td>${list[id]['供货商']}</td>
        </tr>`

  var html1 = list[id].project.map(function (item) {
    return `
      <tr>
      <td class="grayLight">${item['项目']}</td>
      <td>${item['一季度']}</td>
      <td>${item['同期1']}</td>
      <td>${item['扣拿1']}</td>
      <td>${item['二季度']}</td>
      <td>${item['同期2']}</td>
      <td>${item['扣拿2']}</td>
      </tr>`
  }).join('');

  var html2 = list[id].project.map(function (item) {
    return `
      <tr>
      <td class="grayLight">${item['项目']}</td>
      <td>${item['三季度']}</td>
      <td>${item['同期3']}</td>
      <td>${item['扣拿3']}</td>
      <td>${item['四季度']}</td>
      <td>${item['同期4']}</td>
      <td>${item['扣拿4']}</td>
      </tr>`
  }).join('');

  document.querySelector('.shop_detail0').innerHTML = html0;
  document.querySelector('.shop_detail1').innerHTML = html1;
  document.querySelector('.shop_detail2').innerHTML = html2;
}


