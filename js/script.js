var apiUrl = "https://youtube-video-api-1608.appspot.com/youtube/api";
var player;
var vidArray = new Array();
// var ua = window.navigator.userAgent;
// console.log(ua);
function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0) // If Internet Explorer, return version number
    {
        alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    } else // If another browser, return 0
    {
        alert('otherbrowser');
    }
    return false;
}
// window.onload = msieversion();
$(document).ready(function() {
    apiUrl = "https://youtube-video-api-1608.appspot.com/youtube/api";
    var videoId, name, description, keywords, genre, category;
    // init();
});

function init() {
    // Clear forms here
    var txtArea = document.getElementById("video-description");
    if (txtArea) {
        txtArea = "";
    }
    document.getElementById("video-description").value = '';
}
//check valid form
//Kiểm tra tính hợp lên của form
function isValidForm() {
    //getvalue
    videoId = document.getElementById("video-id").value;
    name = document.getElementById("video-name").value;
    description = document.getElementById("video-description").value;
    keywords = document.getElementById("video-keywords").value;
    category = document.getElementsByName("video-category");
    genre = document.getElementById("video-genre").value;
    var idError = document.getElementById("video-id-error");
    var nameError = document.getElementById("video-name-error");
    var isValid = true;
    // Handle form.
    if (videoId.length < 10) {
        isValid = false;
        idError.innerHTML = "* Vui lòng nhập video id có độ dài lớn hơn 10 ký tự.";
        // alert("Vui lòng nhập video id có độ dài lớn hơn 10 ký tự.");
    } else {
        idError.innerHTML = "Hợp lệ.";
        idError.className = "msg-success";
    }
    if (name.length <= 0) {
        isValid = false;
        nameError.innerHTML = "* Vui lòng nhập tên video";
    } else if (name.length > 100) {
        isValid = false;
        nameError.innerHTML = "* Vui lòng nhập tên video có độ dài nhỏ hơn 100 ký tự.";
    } else {
        nameError.innerHTML = "Hợp lệ";
        nameError.className = "msg-success";
    }
    if (isValid) {
        handleForm();
    }
    return isValid;
}
//format datetime uploaded of video 
function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + 1 + "/" + date.getMonth() + "/" + date.getFullYear() + "  " + strTime;
}
//handle form>> submit to server over api
/// đưa dữ liệu qua api lên server
function handleForm() {
    var d = new Date();
    var videoBOD = formatDate(d);
    var lstCategory = "";
    for (var i = 0, len = category.length; i < len; i++) {
        if (category[i].checked) {
            lstCategory += category[i].value + ',';
        }
    }
    lstCategory = lstCategory.substring(0, lstCategory.length - 1);
    // console.log(lstCategory);
    var video = {
        videoId: videoId,
        name: name,
        description: description,
        keywords: keywords,
        category: lstCategory,
        genre: genre,
        authorName: "lamtv",
        authorEmail: "lamtvd00516@fpt.edu.vn",
        birthday: videoBOD
    };
    // console.log(video);
    // console.log(apiUrl);
    $.ajax({
        url: apiUrl,
        // contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(video),
        type: 'POST',
        success: function() {
            alert('Thêm thành công ' + name);
            var main = document.getElementById('paginationCtrl');
            var vid = videoId;
            var divLink = "<div class='btnShow' onclick=\"return callModal('" + vid + "');\"/>";
            // console.log(divLink);
            var divContainer = document.createElement('div');
            var divFrame = document.createElement('div');
            var divPlayer = document.createElement('div');
            var imgPreview = document.createElement('img');
            var divLinkName = document.createElement('div');
            var linkVidName = document.createElement('h5');
            var divBtnShow = document.createElement('div')
            var spanButton = document.createElement('span');
            //thêm class, id
            // divContainer.classList.add('col2'); //"pl-container";
            // divContainer.classList.add(' no-boder');
            divContainer.className = 'col-1';
            divFrame.className = "content-container"; //"pl-frame";
            divPlayer.className = "content"; //"player";
            // linkVidName.className = "pl-vid-name";
            imgPreview.className = "img-preview";
            // divBtnShow.className = "btnShow";
            divLinkName.className = "video-name";
            // spanButton.className = "btnShow";
            //đưa id vào từng box, put source
            divPlayer.id = vid;
            divContainer.id = "video=" + vid;
            spanButton.id = vid;
            imgPreview.src = "https://i.ytimg.com/vi/" + vid + "/hqdefault.jpg";
            linkVidName.innerHTML = name;
            divBtnShow.innerHTML = divLink;
            divPlayer.append(imgPreview);
            divPlayer.append(divBtnShow);
            divFrame.append(divPlayer);
            divLinkName.append(linkVidName);
            divFrame.append(divLinkName);
            divContainer.append(divFrame);
            //tổng               
            main.appendChild(divContainer);
            // console.log(main[i]);
        },
        error: function() {
            alert('Failed!');
        }
    });
}

function findVideoById(videoId) {
    var len;
    $.ajax({
        url: apiUrl,
        // contentType: 'application/json; charset=UTF-8',
        type: 'GET',
        success: function(rsData, status) {
            var i = 0;
            while (i in rsData) {
                // console.log(videoId);
                // console.log(rsData[i]);
                if (videoId === rsData[i].videoId) {
                    console.log('loop: ' + i + ' found!');
                    console.log(rsData[i]);
                    return rsData[i];
                } else {
                    console.log('loop: ' + i + ' not found!');
                    i++;
                    // return false;
                }
            }
        },
        error: function() {
            // alert('Failed!');
            console.log('Get data Failed!!!!!');
        }
    })
}
//Hiển thị ra video vừa add
function lastestAdded(pVideo) {}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function deleteFunction() {
    //var lstVideoDom = document.getElementsByClassName('video-name');
    //var lstVideoDom = document.getElementById('video-list');
    var divBtnDel = document.createElement('div');
    var btnDel = document.createElement('input');
    divBtnDel.className = 'btnDel';
    btnDel.type = 'button'
    btnDel.innerHTML = 'Delete';
    divBtnDel.innerHTML = btnDel;
    // lstVideoDom.appendChild(divBtnDel) ;
    $('.video-name').append(divBtnDel);
    console.log(divBtnDel);
}

function deleteVideo(vid) {
    $.ajax({
        url: apiUrl + '?videoId=' + vid,
        method: 'delete',
        success: function() {
            console.log('DELETED');
        },
        error: function() {
            console.log("error");
        }
    });
}

function processAjaxData(response, urlPath) {
    document.getElementById("content").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({
        "html": response.html,
        "pageTitle": response.pageTitle
    }, "", urlPath);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function showPage() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('video-list').style.display = "block";
    document.getElementById('select-limit').style.display = "block";
    document.getElementById('main-video-list').className += " comfort-bg";
}

function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("video-list").style.display = "none";
    document.getElementById('select-limit').style.display = "none";
    // document.getElementById('main-video-list').className = "col-9";
}
var flag = true;

function paginate(href) {
    var url = new URL(href);
    var page = getParameterByName("page", url);
    // var page = url.searchParams.get("page");
    var currentPage;
    var limit = getParameterByName("limit", url);
    // console.log('get para limit rs: '+limit);
    var totalPage;
    var divPageCtrl = document.getElementById('pageController');
    var alink;
    //set default page number and litmit
    //mặc định trang, limit
    if (!page) {
        flag = false;
        page = 1;
        currentPage = page;
        if (!limit) {
            limit = 6; //set mặc định không có tham số 
        }
        // location.href = url + '?page=' + currentPage + '&limit=' + limit;
    } else {
        if (!limit) {
            limit = 6; //set mặc định không có tham số 
        }
        currentPage = page;
    }
    console.log('get Url' + href);
    console.log(page);
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(rsData) { //Tính tổng số trang cần thiết để hiển thị $limit video
            // console.log('Data length '+rsData.length);
            totalPage = Math.ceil(rsData.length / limit);
            console.log('get limit: ' + limit);
            console.log('Total page: ' + totalPage);
            ////tạo vòng lặp để đẩy hiển thị phân trang
            ///
            for (var i = 1; i < totalPage + 1; i++) {
                alink = document.createElement('a');
                alink.className = 'paging';
                alink.innerHTML = i;
                alink.href = '?page=' + i;
                alink.rel = '?page=' + i;
                // alink.onclick = function(e) {
                //     showLoader();
                //     document.getElementById('video-list').innerHTML = "";
                //     e.preventDefault();
                //     var targetUrl = '?page=' + linkIndex[2] + '&limit=' + limit;
                //     console.log("target url: " + targetUrl);
                //     $.ajax({
                //         url: apiUrl + targetUrl,
                //         type: "GET",
                //         success: function() {
                //             console.log("Create pagination done");
                //             flag = false;
                //             divPageCtrl.innerHTML = "";
                //             // return false;
                //             window.location.replace(targetUrl);
                //             // document.location.hash = url;
                //             // history.pushState('data to be passed', 'Title of the page', url);
                //             paginate(location.href + targetUrl);
                //             console.log('Clicked url: ' + location.href + targetUrl);
                //         },
                //         error: function() {
                //             alert("testing error");
                //         }
                //     });
                // }
                //Tránh tạo lại khối phân trang khi click chuyển page
                divPageCtrl.appendChild(alink);
            }
            alink = document.createElement('a');
            alink.className = 'paging';
            alink.innerHTML = '&laquo;';
            divPageCtrl.prepend(alink);
            alink = document.createElement('a');
            alink.className = 'paging';
            alink.innerHTML = '&raquo;';
            divPageCtrl.appendChild(alink);;
            // divPageCtrl.append('Current page: ' + currentPage + ' videos/Page: ' + limit);
            //////
        },
        error: function() {
            // alert('Failed!');
            console.log('Get data Failed!!!!!');
        }
    });
    $.ajax({
        url: apiUrl + '?page=' + currentPage + '&limit=' + limit,
        // contentType: 'application/json; charset=UTF-8',
        type: 'GET',
        success: function(rsData, status) {
            loadData(rsData);
        },
        error: function() {
            // alert('Failed!');
            console.log('Get data Failed!!!!!');
        }
    });
}

function loadData(rsData) {
    showPage();
    // alert('ok');
    // console.log("Làm tròn "+Math.ceil(3.05));
    var main = document.getElementById('video-list');
    // $.ajax({
    // url: apiUrl + '?page=' + page + '&limit=' + limit,
    // contentType: 'application/json; charset=UTF-8',
    // type: 'GET',
    // success: function(rsData, status) {
    //tính tổng số trang, mỗi trang hiển thị một lượng = limit video vd: 21/8 => 3 trang (cần làm tròn)
    for (var i = 0; i < rsData.length; i++) {
        vidArray[i] = rsData[i];
    }
    for (var i = rsData.length - 1; i >= 0; i--) {
        var vid = String(rsData[i].videoId);
        var divLink = "<div class='btnShow' onclick=\"return callModal('" + vid + "');\"/>";
        // console.log(divLink);
        var divContainer = document.createElement('div');
        var divFrame = document.createElement('div');
        var divPlayer = document.createElement('div');
        var imgPreview = document.createElement('img');
        var divLinkName = document.createElement('div');
        var linkVidName = document.createElement('span');
        var divBtnShow = document.createElement('div')
        var spanButton = document.createElement('span');
        //thêm class, id
        // divContainer.classList.add('col2'); //"pl-container";
        // divContainer.classList.add(' no-boder');
        divContainer.className = 'video-gl-container';
        divFrame.className = "video-content-container"; //"pl-frame";
        divPlayer.className = "video-content"; //"player";
        // linkVidName.className = "pl-vid-name";
        imgPreview.className = "img-preview";
        // divBtnShow.className = "btnShow";
        divLinkName.className = "video-name";
        // spanButton.className = "btnShow";
        //đưa id vào từng box, put source
        divPlayer.id = vid;
        divContainer.id = "video=" + vid;
        spanButton.id = vid;
        imgPreview.src = "https://i.ytimg.com/vi/" + vid + "/hqdefault.jpg";
        linkVidName.innerHTML = rsData[i].name;
        //set event
        // spanButton.onclick = function() {
        //     // alert(id);
        //     console.log(rsData[i].videoId);
        // }
        // Lồng element;
        divBtnShow.innerHTML = divLink;
        // spanButton.append(divBtnShow);
        divPlayer.append(imgPreview);
        divPlayer.append(divBtnShow);
        divFrame.append(divPlayer);
        divLinkName.append(linkVidName);
        divFrame.append(divLinkName);
        divContainer.append(divFrame);
        //tổng 
        // main.innerHTML = '<div id="select-limit"> ';
        // main.innerHTML += ' <div class="float-left">';
        // main.innerHTML += '     <label for="input-select-limit">Hiển thị</label>';
        // main.innerHTML += '     <select id = "input-select-limit">';
        // main.innerHTML += '         <option value = "6" >6</option>';
        // main.innerHTML += '         <option value = "9" >9</option>';
        // main.innerHTML += '         <option value = "12">12</option>';
        // main.innerHTML += '     </select>';
        // main.innerHTML += ' < /div>';
        // main.innerHTML += '</div > ';
        main.appendChild(divContainer);
        // console.log(main[i]);
        // }
        // },
        // error: function() {
        //     // alert('Failed!');
        //     console.log('Get data Failed!!!!!');
    }
    // });
    // for(var i in rsData)
    // console.log(rsData);
    // console.log(apiUrl+'?page=' + page + '&limit=' + limit);
}

function clear() {
    document.getElementById('video-description').value = "";
}
// Gọi modal
//
//
// Get the modal
function callModal(vid) {
    // alert('hihi');
    var modal = document.getElementById('myModal');
    var frame = document.getElementById('frame-play');
    var minimize = document.getElementById('modal-minimize');
    var restore = document.getElementById('modal-restore');
    var close = document.getElementById("modal-close");
    var videoDetail = document.getElementById('video-detail');
    //var playerHTML = ""; //width='"+width+"' height='"+height+"'
    var playerHTML = "<iframe id='iframe' src='https://www.youtube.com/embed/" + vid + "?version=3&enablejsapi=1'";
    playerHTML += " frameborder='0' allowfullscreen>";
    playerHTML += "</iframe>";
    frame.innerHTML = playerHTML;
    // frame.prepend()
    var iframe = document.getElementById('iframe');
    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    // When the user clicks on the button, open the modal 
    // btn.onclick = function() {
    modal.style.display = "block";
    if (modal.className === 'modal') {
        iframe.className = 'default-player';
    }
    // }
    // When the user clicks on <span> (x), close the modal
    minimize.onclick = function() {
        modal.className = 'modal-mini';
        iframe.className = 'minimize-player';
        // videoDetail.className ='video-detail-minimode';
    }
    restore.onclick = function() {
        modal.className = 'modal';
        iframe.className = 'default-player';
    }
    close.onclick = function() {
        modal.style.display = "none";
        frame.innerHTML = "";
    }
    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //         frame.innerHTML = "";
    //     }
    // }
}
// call add video modal
function addVideoModal() {
    var modal = document.getElementById('add-video-modal');
    var close = document.getElementById("add-modal-close");
    modal.style.display = "block";
    close.onclick = function() {
        modal.style.display = "none";
    }
}