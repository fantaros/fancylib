﻿( function ( $ ) {
    var preData = ["测试字符串1","test string NO.2","testtesttest","sth. else","abcdefghijklmn"]
        , i = 0
        , buffer
        , str
        , stimer
        , etimer
        , delay1
        , delay2
        , delay3
        , rtext = ""
        , results = []
        , baseline_test = function (depth){
        		depth = depth || 50000;
        		window.console && console.log("开始测试 深度:",depth);
        		buffer = "";
		        str = "";
		        delay1 = 0;
		        stimer = new Date();
		        for(i=0;i<depth;++i){
		            buffer += preData[0];
		            buffer += preData[1];
		            buffer += preData[2];
		            buffer += preData[3];
		            buffer += preData[4];
		        }
		        str = buffer;
		        etimer = new Date();
		        delay1 = etimer.getTime() - stimer.getTime();
		        results.push({
		            name : "直接+=",
		            val : delay1
		        });
		        buffer = [];
		        str = "";
		        delay2 = 0;
		        stimer = new Date();
		        for(i=0;i<depth;++i){
		            buffer.push(preData[0]);
		            buffer.push(preData[1]);
		            buffer.push(preData[2]);
		            buffer.push(preData[3]);
		            buffer.push(preData[4]);
		        }
		        str = buffer.join("");
		        etimer = new Date();
		        delay2 = etimer.getTime() - stimer.getTime();
		        results.push({
		            name : "Array Join",
		            val : delay2
		        });
		        buffer = "";
		        str = "";
		        delay3 = 0;
		        stimer = new Date();
		        for(i=0;i<depth;++i){
		            buffer.concat(buffer,preData[0]);
		            buffer.concat(buffer,preData[1]);
		            buffer.concat(buffer,preData[2]);
		            buffer.concat(buffer,preData[3]);
		            buffer.concat(buffer,preData[4]);
		        }
		        str = buffer;
		        etimer = new Date();
		        delay3 = etimer.getTime() - stimer.getTime();
		        results.push({
		            name : "String concat",
		            val : delay3
		        });
		        rtext = "<br/>完成基线测试 深度为";
		        rtext += depth;
		        rtext += "轮<br/>";
		        for(i=0;i<results.length;++i){
		            rtext += "基线项目 ";
		            rtext += results[i]["name"];
		            rtext += " : ";
		            rtext += results[i]["val"];
		            rtext += " (秒) <br/>";
		        }
		        $("#results").html(rtext);
		        window.console && console.log("结束");
        };
    $(function () {
        $("button").eq(0).click(function (){
       		var num = (+$("input[type='text']").eq(0).val());
       		if(isNaN(num)) {
       			num = 50000;
       		}
       		baseline_test(num);
       	});
    });
} ) ( window.jQuery )