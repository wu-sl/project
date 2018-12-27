// 百度地图API功能
var map = new BMap.Map('allmap'); // 创建Map实例
map.centerAndZoom(new BMap.Point(116.403901,39.914909), 5); // 初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
map.addControl(
  new BMap.MapTypeControl({
    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
  })
);
map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放


//始终中心点
var b = new BMap.Bounds(
  new BMap.Point(116.403901,39.914909)
  // new BMap.Point(116.832025, 40.126349)
);
try {
  BMapLib.AreaRestriction.setBounds(map, b);
} catch (e) {
  alert(e);
}

map.setCurrentCity('北京'); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

// var b = new BMap.Bounds(
//   new BMap.Point(105.0, 38.0)
//   // new BMap.Point(116.832025, 40.126349)
// );
// try {
//   BMapLib.AreaRestriction.setBounds(map, b);
// } catch (e) {
//   alert(e);
// }
$.ajax({
  type: "method",
  url: "url",
  data: "data",
  dataType: "dataType",
  success: function (response) {

  }
});
var data_info = [
  [116.490506, 39.950344, "地址：朝阳公园","电话：xxxxxxx"],
  [130.368929, 46.791973, "地址：佳木斯大学","电话：xxxxxxx"],
  [119.335133, 26.14092, "地址：福州","电话：xxxxxxx"],
  [100.231845, 26.862521, "地址：丽江","电话：xxxxxxx"],
  [118.35954, 35.107696, "地址：临沂市","电话：xxxxxxx"],
  [104.081565, 30.653854, "地址：成都","电话：xxxxxxx"],
  [108.95148, 34.348867, "地址：西安","电话：xxxxxxx"],
  [101.773921, 36.621623, "地址：西宁","电话：xxxxxxx"]
];
var opts = {
  width: 250, // 信息窗口宽度
  height: 80, // 信息窗口高度
  title: "广东九极生物科技有限公司", // 信息窗口标题
  enableMessage: true //设置允许信息窗发送短息
};
for (var i = 0; i < data_info.length; i++) {
  var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1])); // 创建标注
  var content = data_info[i][2] +'</br>'+ data_info[i][3];
  console.log(content);
  map.addOverlay(marker); // 将标注添加到地图中
  addClickHandler(content, marker);
}


function addClickHandler(content, marker) {
  marker.addEventListener("click", function (e) {
    openInfo(content, e)
  });
}

function openInfo(content, e) {
  var p = e.target;
  var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
  var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point); //开启信息窗口
}




//省份轮廓绘色
 function getBoundary(name, color) {
  var me = this;
  var bdary = new BMap.Boundary();
  bdary.get(name, function (rs) {
    console.log(rs);
    var count = rs.boundaries.length;
    for (var i = 0; i < count; i++) {
      var ply = new BMap.Polygon(rs.boundaries[i], {
        strokeWeight: 1,
        strokeOpacity: 0.5,
        fillColor: color,
        strokeColor: "#000000"
      });
      map.addOverlay(ply);
    }
  });
}
// getBoundary("广东", "#ff0000");


 changeMapStyle('hardedge')
 //sel.value = 'hardedge';

 function changeMapStyle(style) {
  map.setMapStyle({
    style: style
   });
   $('#desc').html(mapstyles[style].desc);
 }

