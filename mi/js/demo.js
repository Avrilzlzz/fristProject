// // 左右滑动
// 有bug有bug
// var handleNum = 0 // 点击次数
// var widthArr = [] // 存放当前每一个宽度
// var elChildren = $('.right').children('.rightul')
// console.log(elChildren);
// for (var i = 0, ilen = elChildren.length; i < ilen; i++) {
// 	widthArr.push($('.right').children('.rightul')[i].offsetWidth + 14) // 
// }


// $('.disabled').on('click', function() {
// 	animateTabs('left', $('.right'))

// })

// $('.icon-left').on('click', function() {
// 	animateTabs('right', $('.right'))
// 	console.log(1111);
// })


// function animateTabs(type, $el) {
// 	var elWidth = $el[0].clientWidth // 内部菜单的宽度
// 	var wrapWidth = $('.right')[0].clientWidth // 外层包裹的宽度
// 	var canmove = elWidth - wrapWidth // 可以移动的距离
// 	currleft = $el[0].offsetLeft // 当前向左偏移的距离


// 	if (type === 'left') { // 向左
// 		currleft = Math.abs(currleft) + widthArr[handleNum]
// 		$el.stop().animate({
// 			left: -currleft + 'px'
// 		}, 500, function() {
// 			handleNum++
// 			if (currleft >= canmove) {
// 				handleNum = $el.children('.rightul').length - 1
// 				$el.stop().animate({
// 					left: -canmove + 'px',
// 				})
// 			}
// 		})
// 	} else { // 向右
// 		currleft = currleft + widthArr[handleNum]
// 		$el.stop().animate({
// 			left: currleft + 'px'
// 		}, 500, function() {
// 			handleNum--
// 			if (currleft >= 0) {
// 				handleNum = 0
// 				$el.stop().animate({
// 					left: 0 + 'px'
// 				})

// 			}
// 		})

// 	}
// }

var datas = [
	["Redmi 9", "腾讯黑鲨游戏手机3", "Redmi 8A", "小米移动 电话卡"],
	["小米电视 大师 65英寸OLED", "小米电视5 75英寸", "全面屏电视Pro 55英寸", "小米电视4A 58英寸"],
	["RedmiBook 13", "显示器"],
	["冰箱", "微波炉", "电磁炉", "插线板"],
	["手环5NFC", "滑板车", "无线车充"],
	["打印机", "摄像机", "小爱音箱"],
	["移动电源", "手机壳"],
	["洗手机", "体脂称", "婴儿推车"],
	["小爱音箱Art", "Redmi音箱", "蓝牙音箱"],
	["小背包", "床垫", "驱蚊器"]
];
var detail = document.querySelector(".detail");
// 二维数组的遍历
for (var i = 0; i < datas.length; i++) {
	var item = document.createElement("div");
	item.className = "item";

	for (var j = 0; j < datas[i].length; j++) {
		// 创建ul
		var ul = document.createElement("ul");

		var str = "";
		for (var k = 1; k <= 6; k++) {
			str += '<li><a href="#"><img src="images/nav_imgs/' + datas[i][j] + '.png"/>' + datas[i][j] + '</a></li>';
		}
		// 设置ul内容
		ul.innerHTML = str;

		// 把ul追加到item里面
		item.appendChild(ul);
	}

	// 追加到.detail中
	detail.appendChild(item);
}

// 给.nav ul里面的每个li绑定鼠标单击事件
var navLis = document.querySelectorAll(".nav ul li");
var items = document.querySelectorAll(".banner .detail .item");

for (var i = 0; i < navLis.length; i++) {
	navLis[i].setAttribute("data-index", i);

	navLis[i].onmouseover = function() {

		for (var j = 0; j < navLis.length; j++) {
			items[j].style.display = "none";

			items[j].onmouseover = function() {
				this.style.display = "block";
			}
			items[j].onmouseout = function() {
				this.style.display = "none";
			}

		}

		var index = this.getAttribute("data-index");
		items[index].style.display = "block";
	}

	navLis[i].onmouseout = function() {
		for (var k = 0; k < navLis.length; k++) {
			items[k].style.display = "none";
		}
	}
}



// 获取对象
var banner_img = document.querySelector(".banner_img");
var bannerImgLis = document.querySelectorAll(".banner_img ul li");
var circleLis = document.querySelectorAll(".banner ol li");
var arrow_left = document.querySelector(".banner .arrow_left");
var arrow_right = document.querySelector(".banner .arrow_right");

// 封装一个去到指定轮播图的函数
function goto(index) {
	for (var i = 0; i < bannerImgLis.length; i++) {
		bannerImgLis[i].removeAttribute("class");
		circleLis[i].removeAttribute("class");
	}

	bannerImgLis[index].className = "current";
	circleLis[index].className = "current";
}

// 每个小圆点的点击事件
for (var j = 0; j < circleLis.length; j++) {
	// 设置自定义属性
	circleLis[j].setAttribute("data-index", j);
	// 绑定点击事件
	circleLis[j].onclick = function() {
		// 获取自定义属性
		var index = this.getAttribute("data-index");

		// 显示指定的轮播图
		goto(index);

		// 设置当前轮播是第几张
		num = index;
	}
}

// 定义一个全局,代表当前轮播到第几张
var num = 0;

// 右侧按钮点击事件
arrow_right.onclick = function() {
	num++;
	// 边界值判断
	num = num % circleLis.length;
	goto(num);

	// 解绑事件
	arrow_right.onclick = null;
}

// 左侧按钮点击事件
arrow_left.onclick = function() {
	num--;
	// 边界值判断
	if (num == -1) {
		num = circleLis.length - 1;
	}
	goto(num);

	// 解绑事件
	arrow_left.onclick = null;
}

// 开启定时器,自动轮播
var timer = setInterval(function() {
	arrow_right.click();
}, 1500);

// 鼠标移上.banner_img层清除定时器
banner_img.onmouseover = function() {
	clearInterval(timer);
	timer = null;
}
// 鼠标移上.banner_img层继续定时器
banner_img.onmouseout = function() {
	if (timer == null) {
		timer = setInterval(function() {
			arrow_right.click();
		}, 1500);
	}
}

// 给每个bannerImgLis对应的li标签绑定过渡完成事件
for (var k = 0; k < bannerImgLis.length; k++) {
	var count = 0;
	bannerImgLis[k].addEventListener('transitionend', function() {
		count++;
		if (count % 2 == 1) {
			// 核心做法是,点击一次以后,就解绑事件;过渡完成时候,重新绑定事件
			arrow_right.onclick = function() {
				num++;
				// 边界值判断
				num = num % circleLis.length;
				goto(num);

				// 解绑事件
				arrow_right.onclick = null;
			}

			arrow_left.onclick = function() {
				num--;
				// 边界值判断
				if (num == -1) {
					num = circleLis.length - 1;
				}
				goto(num);

				// 解绑事件
				arrow_left.onclick = null;
			}
		}
	});
}

//使用一个数组对象保存数据

var iflashbuyDatas = [{
	pro_name: "小米小爱音箱 Play（白色）量产版 白色",
	pro_desc: "听音乐、语音遥控家电",
	old_price: "99元",
	new_price: "169元"
}, {
	pro_name: "米家扫拖一体机器人 白色",
	pro_desc: "扫得干净，拖得彻底",
	old_price: "1599元",
	new_price: "1999元"
}, {
	pro_name: "小米米家智能门锁 标准碳素黑",
	pro_desc: "一体化活体指纹识别，多种开锁方式",
	old_price: "1199元",
	new_price: "1299元"
}, {
	pro_name: "MIJOY 抽纸青春版 24包/箱 ",
	pro_desc: "精选原生竹浆，健康环保",
	old_price: "27.9元",
	new_price: "32.9元"
}, {
	pro_name: "米家两门冰箱 160L 银色",
	pro_desc: "小巧能装，速冻养鲜",
	old_price: "929元",
	new_price: "1099元"
}, {
	pro_name: "巨省电 | 小米新1级空调X 1.5匹",
	pro_desc: "变频节能巨省电，自清洁",
	old_price: "2099元",
	new_price: "2399元"
}, {
	pro_name: "小米AI音箱",
	pro_desc: "听音乐、语音遥控家电",
	old_price: "199元",
	new_price: "299元"
}, {
	pro_name: "17PIN 星果杯 樱花粉",
	pro_desc: "随心随行，悦饮随心",
	old_price: "99元",
	new_price: "139元"
}, {
	pro_name: "小米移动电源10000mAh高配 灰色",
	pro_desc: "轻薄设计，轻松出行",
	old_price: "129元",
	new_price: "149元"
}, {
	pro_name: "米家手持无线吸尘器1C 白色",
	pro_desc: "吸力续航双强劲，清洁小怪兽",
	old_price: "899元",
	new_price: "999元"
}, {
	pro_name: "米家扫拖一体机器人 白色",
	pro_desc: "扫得干净，拖得彻底",
	old_price: "1599元",
	new_price: "1999元"
}, {
	pro_name: "圈厨多功能涮烤锅 黑色火锅盘",
	pro_desc: "深浅双盘多用途",
	old_price: "329元",
	new_price: "399元"
}, {
	pro_name: "米家落地扇 白色",
	pro_desc: "静享智能轻风",
	old_price: "199元",
	new_price: "219元"
}, {
	pro_name: "小米曲面显示器 34英寸 黑",
	pro_desc: "超宽大环绕显示屏",
	old_price: "2199元",
	new_price: "2499元"
}, {
	pro_name: "自清洁 | 米家互联网立式空调 2匹",
	pro_desc: "一级能效更省电，自清洁",
	old_price: "3499元",
	new_price: "4299元"
}, {
	pro_name: "米家空气净化器Pro",
	pro_desc: "大空间，快循环",
	old_price: "999元",
	new_price: "1499元"
}, {
	pro_name: "小米手环4 石墨黑",
	pro_desc: "大屏彩显，20天超长续航",
	old_price: "149元",
	new_price: "169元"
}, {
	pro_name: "小米路由器4C 白色",
	pro_desc: "300M单频，高增益4天线",
	old_price: "59元",
	new_price: "99元"
}, {
	pro_name: "Fun Home保温泡茶杯（茶水分离） 白色 520ml",
	pro_desc: "茶水分离，长效保温",
	old_price: "79元",
	new_price: "99元"
}, {
	pro_name: "最生活毛巾·Air（10条装） 白色+素蓝",
	pro_desc: "给生活一条好毛巾",
	old_price: "99元",
	new_price: "169元"
}, {
	pro_name: "Pinlo迷你三明治机 白色",
	pro_desc: "小巧身材，一机多用",
	old_price: "109元",
	new_price: "169元"
}, {
	pro_name: "小米显示器1A 23.8英寸 黑色",
	pro_desc: "高清画质，超广视角",
	old_price: "679元",
	new_price: "699元"
}, {
	pro_name: "小浪智能衣物消毒烘干机 白色 35L",
	pro_desc: "三重杀菌 柔热烘干",
	old_price: "489元",
	new_price: "549元"
}, {
	pro_name: "小米米家智能门锁 磨砂金 霸王锁体 磨砂金",
	pro_desc: "适配霸王锁体，多种开锁方式",
	old_price: "1499元",
	new_price: "1799元"
}, {
	pro_name: "8H多功能护颈枕U1 混灰色",
	pro_desc: "乳胶颗粒填充 ，舒适入睡",
	old_price: "69元",
	new_price: "79元"
}, {
	pro_name: "悦米YM人体工学椅 白色",
	pro_desc: "健康坐姿，舒适体验",
	old_price: "1199元",
	new_price: "1499元"
}, {
	pro_name: "米家扫拖机器人1C 白色",
	pro_desc: "能扫能拖，地面清洁交给我",
	old_price: "1199元",
	new_price: "1299元"
}, {
	pro_name: "RedmiBook 16 i7 16G 512G MX350 灰色",
	pro_desc: "便携大屏，全“芯”超越",
	old_price: "5499元",
	new_price: "5699元"
}, {
	pro_name: "最生活浴巾·Air（4条装） 白色+素蓝",
	pro_desc: "享用一条洁净好浴巾",
	old_price: "169元",
	new_price: "269元"
}, {
	pro_name: "米家运动鞋4 花灰色 41",
	pro_desc: "轻盈若絮,弹若脱兔",
	old_price: "189元",
	new_price: "199元"
}, {
	pro_name: "小米游戏鼠标 黑色",
	pro_desc: "掌中游戏利器，为真玩家而生",
	old_price: "169元",
	new_price: "199元"
}, {
	pro_name: "小米手表 尊享版 曜石黑",
	pro_desc: "能打电话、能下载APP，才是真正的智能手表",
	old_price: "1799元",
	new_price: "1999元"
}];

iflashbuyDatas.forEach(function(currentItem, currentIndex) {

	var newli = $(
		` <li>
                  <a href="#">
                      <img src="images/shangou/iflashbuy${currentIndex}.jpg">
                      <p class="biaoti">${currentItem.pro_name}</p>
                      <p class="desc">${currentItem.pro_desc}</p>
                      <p class="price">
                          <span>${currentItem.old_price}</span>
                          <del>${currentItem.new_price}</del>
                      </p>
                  </a>
              </li>`
	)


	$(".iflashbuy .content .right ul").append(newli);
	
	// $(".iflashbuy .content .right ul li")
	
	$(".iflashbuy .content .right ul li").eq(7).css("margin-right", "0")
	$(".iflashbuy .content .right ul li").eq(11).css("margin-right", "0")
	$(".iflashbuy .content .right ul li").eq(15).css("margin-right", "0")
	$(".iflashbuy .content .right ul li").eq(19).css("margin-right", "0")
	$(".iflashbuy .content .right ul li").eq(23).css("margin-right", "0")
	$(".iflashbuy .content .right ul li").eq(27).css("margin-right", "0")
	$(".iflashbuy .content .right ul li").eq(31).css("margin-right", "0")
	// $(".iflashbuy .content .right ul li").eq(32).css("margin-right", "0")
})


var index = 0;
$(".iflashbuy .title .icon-left").click(function() {

	index++;
	if (index > 0) {
		$(".iflashbuy .title .icon-arrow-left-copy").removeClass("disabled")
	}
	if (index > 7) {
		$(".iflashbuy .title .icon-left").addClass("disabled")
		index = 8

	}
	$(".iflashbuy .content .right ul").stop().animate({
		"left": -index * 978 + "px"
	}, 3000)
})

//左键左滑
$(".iflashbuy .title .disabled").click(function() {

	index--;

	if (index == 7) {


		$(".iflashbuy .title .icon-left").removeClass("disabled")
	}
	if (index == 0) {
		$(".iflashbuy .title .icon-arrow-left-copy").addClass("disabled")
	}


	if (index < 0) {
		index = 0
	}
	// console.log(index)
	$(".iflashbuy .content .right ul").stop().animate({
		"left": -index * 978 + "px"
	}, 3000)
})

timer = setInterval(function() {
	$(".iflashbuy .title .icon-left").click();
	if (index > 0) {
		//LEFT
		$(".iflashbuy .title .icon-arrow-left-copy").removeClass("disabled")
		//RIGHT
		$(".iflashbuy .title .icon-left").removeClass("disabled")
	}
	if (index == 5) {

		$(".iflashbuy .title .icon-left").addClass("disabled")
		index = 0
	}
	if (index == 1) {
		$(".iflashbuy .title .icon-arrow-left-copy").addClass("disabled")
		$(".iflashbuy .title .icon-left").removeClass("disabled")
	}



	if (index < 0) {
		index = 0
	}
}, 5000)

// 回到顶部
$(window).scroll(function() {
	var current = $("body").scrollTop() || $("html").scrollTop();
	// console.log("current ==>",current)
	if (current > $(".title").offset().top) {
		$(".backTop").stop().fadeIn();
	} else {
		$(".backTop").stop().fadeOut();
	}
})
$(".backTop").click(function() {
	$("body,html").animate({
		"scrollTop": 0
	})
})
