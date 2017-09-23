function loadData(page, limit) {
    // alert('ok');
    var main = document.getElementById('video-list');
    $.ajax({
        url: apiUrl + '?page=' + page + '&limit=' + limit,
        // contentType: 'application/json; charset=UTF-8',
        type: 'GET',
        success: function(rsData, status) {
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
                divContainer.className = 'col2';
                divFrame.className = "content-container"; //"pl-frame";
                divPlayer.className = "content"; //"player";
                // linkVidName.className = "pl-vid-name";
                imgPreview.className = "img-preview";
                spanButton.className = "btnShow";
                divLinkName.className = "video-name";
                // spanButton.className = "btnShow";
                //đưa id vào từng box, put source
                divPlayer.id = vid;
                divContainer.id = "video=" + vid;
                spanButton.id = vid;
                imgPreview.src = "https://i.ytimg.com/vi/" + vid + "/hqdefault.jpg";
                linkVidName.innerHTML = rsData[i].name;
                spanButton.innerHTML = divLink;
                // spanButton.append(divBtnShow);
                divPlayer.append(imgPreview);
                divPlayer.append(spanButton);
                divFrame.append(divPlayer);
                divLinkName.append(linkVidName);
                divFrame.append(divLinkName);
                divContainer.append(divFrame);
                //tổng

                main.appendChild(divContainer);
                // console.log(main[i]);
            }
        },
        error: function() {
            alert('Failed!');
        }
    });

}