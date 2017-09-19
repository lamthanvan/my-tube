<<<<<<< HEAD
 var apiUrl = "http://youtube-video-api-1608.appspot.com/youtube/api";
=======
 var apiUrl;
>>>>>>> 653b310ecda769a22729d5782f313ff9125f4fcd
 $(document).ready(function() {
     apiUrl = "http://youtube-video-api-1608.appspot.com/youtube/api";
     var videoId, name, description, keywords, genre, category;
     init();
 });

 function init() {
     // Clear forms here
<<<<<<< HEAD
     var txtArea = document.getElementById("video-description");
     if (txtArea) {
         txtArea = "";
     }
=======
     document.getElementById("video-description").value = "";
>>>>>>> 653b310ecda769a22729d5782f313ff9125f4fcd
 }
 //check valid form
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
     if (name.length > 60) {
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
<<<<<<< HEAD
     };
     console.log(video);
     // console.log(apiUrl);
     $.ajax({
         url: apiUrl,
         // contentType: 'application/json; charset=UTF-8',
         data: JSON.stringify(video),
         type: 'POST',
         success: function() {
             alert('Thêm thành công ' + name);
         },
         error: function() {
             alert('Failed!');
         }
     });
 }

 function loadData(page, limit) {
     // alert('ok');
     var main = document.getElementById('video-list');
     $.ajax({
         url: apiUrl + '?page=' + page + '&limit=' + limit,
         // contentType: 'application/json; charset=UTF-8',
         type: 'GET',
         success: function(rsData, status) {
             for (var i = rsData.length - 1; i >= 0; i--) {
                 // console.log(rsData[i]);
                 main.innerHTML += '<div>'+rsData[i].name+'</div>';
             }
         },
         error: function() {
             alert('Failed!');
         }
     });
     // for(var i in rsData)
     // console.log(rsData);
     // console.log(apiUrl+'?page=' + page + '&limit=' + limit);
=======
     }
     
>>>>>>> 653b310ecda769a22729d5782f313ff9125f4fcd
 }

 function clear() {
     document.getElementById('video-description').value = "";
 }