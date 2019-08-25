const fs = require('fs');
const path = require('path');
const request = require('request');
const async = require('async');
const _ = require('lodash');

let depositPath = path.resolve('../static/img'); // 存放图片的地址

// 获取图片链接
const data = fs.readFileSync(path.resolve('../yanxuan.sql'));

// \/\/匹配//开始，.+?匹配任意字符串重复1次或更多次，但尽可能少重复，以.(jpeg|png|jpg)结尾
let srcArray = data.toString().match(/(http|https)?(:)?\/\/.+?(.(jpeg|png|jpg|mp4))/g);

// 判断src是否有http前缀
srcArray = srcArray.map((src) => {
	let checkHttp = src.indexOf('http');
	if (checkHttp < 0) {
		src = 'http:' + src;
	}
	return src;
});
// 去重
srcArray = _.uniq(srcArray);

// 并发连接数的计数器
let concurrencyCount = 0;

// 并发抓取数据的过程
const fetchSrc = (src, callback) => {
  // delay 的值在 2000 以内，是个随机的整数
  let delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', src, '，耗时' + delay + '毫秒');
  setTimeout(() => {
      concurrencyCount--;
		  // 截取图片名称
			let imagePath = depositPath + '/' + src.substring(src.lastIndexOf('/') + 1, src.length);
	    // 判断文件是否已经存在
	    if (!fs.existsSync(imagePath)) {
				request(src)
				.on('error', (err) => {
				  console.error(err)
			  })
				.pipe(fs.createWriteStream(imagePath))
				.on('close', () => {
				  callback(null, src);
			  });
	    }
  }, delay);
};

const createImage = () => {
	// 查看是否存在这个文件夹
	if (!fs.existsSync(depositPath)) {
	  fs.mkdirSync(depositPath);// 不存在就建文件夹
	  console.log('文件夹创建成功');
	}

	// 使用 async.mapLimit 来 5 个并发抓取，并获取结果
	async.mapLimit(srcArray, 5, (src, callback) => {
	  fetchSrc(src, callback);
	}, (err, result) => {
	  //所有连接抓取成功，返回回调结果列表
	  console.log('final:');
	  console.log(result);
	});
};

createImage();