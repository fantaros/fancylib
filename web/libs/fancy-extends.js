/**
 * 扩展在此.
 */
(function(window) {
    var $ = window.jQuery;
    if (typeof $ !== "undefined") {
        var controls_inputs = {
            "button" : true,
            "checkbox" : true,
            "file" : true,
            "hidden" : true,
            "image" : true,
            "password" : true,
            "radio" : true,
            "reset" : true,
            "submit" : true,
            "text" : true
        };
        window.fancyExtends = (function($fe) {
            $fe.urlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
            $fe.sql = function(sqlEname, params, ajax, callback) {
                if (typeof sqlEname !== 'string') {
                    return null;
                }
                ;
                var userData = {};
                userData.sqlEname = sqlEname;
                var params = params || {};
                for ( var p in params) {
                    if (params.hasOwnProperty(p)) {
                        userData[p] = params[p];
                    }
                }
                ;
                var result = $.ajax({
                    type : 'POST',
                    url : Fancy.baseUrl + '/SqlService',
                    async : ajax || false,
                    data : userData,
                    dataType : 'json',
                    success : callback,
                    error : function() {
                        return null;
                    }
                });
                return $.parseJSON(result.responseText);
            };
            /**
             * 获取报表数据项的值.
             */
            $fe.index = function(tableid, indexid, rowindexid) {
                var ctid = Fancy.get(Fancy.Querys, "tableId");
                if (tableid === ctid) {
                    return Fancy.cindex(indexid, rowindexid);
                } else {
                    return Fancy.oindex(tableid, indexid, rowindexid);
                }
            };
            /**
             * 获取当前报表数据项的值.
             */
            $fe.cindex = function(indexid, rowindexid) {
                var jqdom = Fancy.$tableIndex(indexid, rowindexid);
                if (jqdom === null) {
                    return null;
                } else {
                    return jqdom.val();
                }
            };
            /**
             * 获取外来报表数据项的值.
             */
            $fe.oindex = function(tableid, indexid, rowindexid, versionid,
                    taskid) {
                var baseurl = Fancy.baseUrl + "/JsonService";
                var result = $.ajax({
                    type : 'POST',
                    url : baseurl,
                    async : false,
                    data : {
                        serviceName : "BBTM56",
                        methodName : 'query',
                        'inqu_status-0-tableId' : tableid,
                        'inqu_status-0-indexId' : indexid,
                        'inqu_status-0-rowindexId' : rowindexid,
                        'inqu_status-0-versionId' : versionid,
                        'inqu_status-0-taskId' : taskid
                    },
                    dataType : 'json'
                });
                return $.parseJSON(result.responseText).rows[0].cell;
            };
            /**
             * 获取对应id的jquery对象.
             */
            $fe.$tableIndex = function(id, rid) {
                if (typeof rid === "undefined" || rid === null) {
                    if (typeof id === "undefined" || id === null) {
                        return null;
                    } else {
                        return $("#" + id);
                    }
                } else {
                    return $(Fancy.str("#").a(rid).a("_").a(id).s());
                }
            }
            $fe.catchError = function(e) {
            };
            $fe.changeControl = function($dom, elename) {
                if (typeof elename === "string" && $dom instanceof jQuery) {
                    $dom.each(function() {
                        var aa = this.attributes, i, s, asl = Fancy.str("<").a(
                                elename);
                        for (i = 0; i < aa.length; ++i) {
                            s = aa[i]["specified"];
                            if (s === undefined || s === true || s === "true") {
                                asl.a(" ").a(aa[i]["name"]).a("='").a(
                                        $(this).attr(aa[i]["name"])).a("'");
                            }
                        }
                        asl.a(" ></").a(elename).a(">");
                        $(asl.s()).replaceAll($(this));
                    });
                }
            };
            $fe.changeInput = function($dom, eletype) {
                if (typeof eletype === "string" && $dom instanceof jQuery) {
                    $dom.each(function() {
                        var aa = this.attributes, i, s, asl = Fancy.str("<input");
                        asl.a(" type='").a(eletype).a("' ");
                        for (i = 0; i < aa.length; ++i) {
                            s = aa[i]["specified"];
                            if (s === undefined || s === true || s === "true") {
                                asl.a(" ").a(aa[i]["name"]).a("='").a(
                                        $(this).attr(aa[i]["name"])).a("'");
                            }
                        }
                        asl.a(" ></input>");
                        $(asl.s()).replaceAll($(this));
                    });
                }
            };
            $fe.lazyChange = function($dom, ton) {
                if ($dom instanceof jQuery && typeof ton === "string") {
                    if (controls_inputs.hasOwnProperty(ton)) {
                        Fancy.changeInput($dom, ton.toLowerCase());
                    } else {
                        Fancy.changeControl($dom, ton.toLowerCase());
                    }
                }
            }
            return $fe;
        })(window.fancyExtends || {});
    }
})(window);