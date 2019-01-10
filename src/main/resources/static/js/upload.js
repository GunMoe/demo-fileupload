/**
 * 上传附件
 * @param fileId 附件上传input ID
 * @param sourceType 上传类型 1、任务附件 2、回复附件 3、 任务结束附件
 * @param fileList 显示附件列表容器id
 * @param textFile 显示选中附件名称容器id
 * @returns {Boolean}
 */
function ajaxFileUpload(fileId, sourceType, fileList, textFile) {
    var replyId = $("#replyId").val();
    if (sourceType != 2) {
        replyId = "";
    }

    if (replyId == undefined) {
        replyId = "";
    }
    //显示正在上传的文件
    $("#fileList tr").css("display", "");//显示正在上传的文件

    var taskId = $("#taskId").val();
    var userid = $("#userID").val();
    var name = $("#userName").val();
    var url = "/Upload?taskId=" + taskId + "&replyId=" + replyId + "&userid=" + userid + "&name=" + name + "&sourceType=" + sourceType + "&isApp=noapp";
    if ($("#" + fileId).val() != "") {
        $.ajaxFileUpload
        (
            {
                url: url, //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: fileId, //文件上传域的ID
                dataType: 'json', //返回值类型 一般设置为json
                success: function (data, status)  //服务器成功响应处理函数
                {
                    if (status == "success" && data.message == "success") {
                        //alert("上传成功");
                        $("#" + fileList).empty();
                        for (var i = 0; i < data.list.length; i++) {
                            var html = '<tr id="' + data.list[i].annexId + '">' +
                                '<td style="color: #84bf69;"><i class="jindu-cg"></i>成功</td>' +
                                '<td>' + data.list[i].fileName + '<span> - ' + data.list[i].fileSize / 1000 + 'K</span></td>' +
                                "<td align='right' onclick=deleteAnnexById('" + data.list[i].annexId + "')><i></i></td>" +
                                '</tr>';
                            $("#" + fileList).append(html);
                        }

                        if (sourceType == "3") {//如果是结束任务时上传的附件，需要局部刷新附件列表
                            getTaskAnnexList(taskId);
                        }

                        $("#" + textFile).val("");
                        var file = $("#" + fileId);
                        file.after(file.clone().val(""));
                        file.remove();
                    } else if (status == "success" && data.message == "failure") {
                        alert(data.result);
                    }
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                    alert(e);
                }
            }
        )
        return false;
    } else {
    }
}

/**
 *  显示选中的文件（一个显示名字，多个显示个数）
 * @param obj
 * @param textFile 显示选中附件名称容器id
 * @param fileList 显示附件列表容器id
 */
function showUploadFileName(obj, textFile, fileList) {
    var t_files = obj.files;

    for (var i = 0, len = t_files.length; i < len; i++) {
        if (t_files[i].size > 10 * 1024 * 1024) {
            alert(t_files[i].name + "  大小超过了10M了，请重新上传");
            return;
        } else {
            if (t_files.length > 1) {
                $("#" + textFile).val(t_files[0].name + "等" + t_files.length + "个文件");
            } else {
                $("#" + textFile).val(obj.value);
            }
        }
        var html = '<tr class="" style="display:none">' +
            '    <td style="color: #007aff;"><i class="jindu-sc"></i>上传</td>' +
            '    <td>' + t_files[i].name + '<span> - ' + t_files[i].size / 1000 + 'K</span></td>' +
            '    <td align="right"><i></i></td>' +
            '</tr>';
        $("#" + fileList).prepend(html);
    }
}