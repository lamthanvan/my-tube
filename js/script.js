function isValidForm() {
	var isValid = true;
	// Handle form.
	var videoId = document.getElementById("video-id").value;
	if(videoId.length < 10){
		isValid = false;
		document.getElementById("video-id-error").innerHTML = "* Vui lòng nhập video id có độ dài lớn hơn 10 ký tự.";
		//alert("Vui lòng nhập video id có độ dài lớn hơn 10 ký tự.");
	} else {
		document.getElementById("video-id-error").innerHTML = "Hợp lệ.";
		document.getElementById("video-id-error").className = "msg-success";
	}
	isValid = false;
	return isValid;
}