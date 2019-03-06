function createButton() {
	var button = document.createElement("button");
	button.style.width = "70px";
	button.style.height = "40px";
	button.style.position = "fixed";
	button.style.color = "#dedede";
	button.style.top = "10px";
	button.style.right = "10px";
	button.innerText = "Copy";
	document.body.appendChild(button);
	return button;
} 

var button = createButton();

function isValidEmail(email) { 
	var re = /\S+@\S+\.\S+/;
	return re.test(email); 
}

function isAddress(address){
	if(address.includes(",")){
		return true;
	}else{
		return false;
	}
}

function getCarrierName(carrierInfo){
	var carrierName= carrierInfo.replace('Mobile - ','');
	return carrierName;
}

function copyStringToClipboard (str) {
	var el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style = {position: 'absolute', left: '-9999px'};
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function isValidName(str){
	if(str.includes("is not yet available")){
		return false;
	}else{
		return true;
	}
}


var user_info = {name:' ',address:' ',email:' ',carrier:' '};


button.addEventListener("click",function() {
	user_info.name=" ";

	nameValue = $(".ProfileName").find('div').text().trim();

	if(isValidName(nameValue)){
		user_info.name=nameValue;
	}


	$("div.ProfileDetails.ProfileContainer > div.List").each(function(key,value){


		if(key==0){

			user_info.email=" ";
			user_info.address = " ";

			user_info.carrier = getCarrierName($(this).find("div.List__Item div.List__Info div").last().text());

			if(user_info.carrier===""){
				user_info.carrier=" ";
			}

		}else if(key==1){
			
			user_info.email=" ";
			user_info.address = " ";

			$(this).find("a.List__Item").each(function(){
				doubtedEmail = $(this).find('div.List__Info div').last().text();

				if(user_info.email===" "){

					if(isValidEmail(doubtedEmail)){
						user_info.email=doubtedEmail;
					}else if(isAddress(doubtedEmail)){
						user_info.address = doubtedEmail;
					}
				}else if(isAddress(doubtedEmail)){
					user_info.address = doubtedEmail;
				}


			});


		}



	});

	console.log(user_info);

	copyStringToClipboard(user_info.name+"\t"+user_info.email+"\t"+user_info.address+"\t"+user_info.carrier);

}); 