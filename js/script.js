var apiUrl = "http://youtube-video-api-1608.appspot.com/youtube/api";
var player;
var vidArray = new Array();
$(document).ready(function() {
    apiUrl = "http://youtube-video-api-1608.appspot.com/youtube/api";
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
    } else if (name.length > 60) {
        isValid = false;
        nameError.innerHTML = "* Vui lòng nhập tên video có độ dài nhỏ hơn 60 ký tự.";
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
            var main = document.getElementById('video-list');
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
            divContainer.className = 'col2';
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
            main.prepend(divContainer);
            // console.log(main[i]);
        },
        error: function() {
            alert('Failed!');
        }
    });
}

function findVideoById(videoId) {}
//Hiển thị ra video vừa add
function lastestAdded(pVideo) {}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function pagninate(href) {
    var flag = true;
    var url = new URL(href);
    var page = url.searchParams.get("page");
    var currentPage;
    var limit = url.searchParams.get("limit");
    var totalPage;
    var divPageCtrl = document.getElementById('pageController');
    var alink;
    if (!page) {
        flag = false;
        page = 1;
        currentPage = page;
        if (!limit) {
            limit = 8; //set mặc định không có tham số = 8
        }
        // location.href = url + '?page=' + currentPage + '&limit=' + limit;
    } else {
        if (!limit) {
            limit = 8; //set mặc định không có tham số = 8
        }
        currentPage = page;
    }
    console.log('get Url' + href);
    console.log(page);
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(rsData) {
            totalPage = Math.ceil(rsData.length / limit);
            console.log('get limit: ' + limit);
            console.log('Total page: ' + totalPage);
            ////tạo vòng lặp để đẩy hiển thị phân trang
            ///
            for (var i = 1; i < totalPage + 1; i++) {
                alink  = document.createElement('a');
                alink.innerHTML = i;
                alink.href = '?page=' + i;
                divPageCtrl.appendChild(alink);
            }
            divPageCtrl.append('Current page: ' + currentPage + ' videos/Page: ' + limit);
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
            if (totalPage <= 1) {
                this.currentPage = 1;
            } else {}
          
            loadData(rsData, currentPage, limit);
        },
        error: function() {
            // alert('Failed!');
            console.log('Get data Failed!!!!!');
        }
    })
}

function loadData(rsData, page, limit) {
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
        var linkVidName = document.createElement('h5');
        var divBtnShow = document.createElement('div')
        var spanButton = document.createElement('span');
        //thêm class, id
        // divContainer.classList.add('col2'); //"pl-container";
        // divContainer.classList.add(' no-boder');
        divContainer.className = 'col2';
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
    //var playerHTML = ""; //width='"+width+"' height='"+height+"'
    var playerHTML = "<iframe id='iframe' src='https://www.youtube.com/embed/" + vid + "?version=3&enablejsapi=1'";
    playerHTML += " frameborder='0' allowfullscreen>";
    playerHTML += "</iframe>";
    frame.innerHTML = playerHTML;
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
    //     }
    // }
}