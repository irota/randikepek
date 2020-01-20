javascript: (function () {
	function btnDraw() {
		var btnAttr,
		displayMode,
		imgDisplay,
		btnText,
		bgColor,
		btnBoxShadow,
		btn = document.querySelector(".btn.ok")
				
		if ("on" == btn.getAttribute("data-open") ) {
			if(adatlap) {
				document.querySelector('.photoContainer a').removeEventListener("click", nanoGallery );
			} else {
				document.querySelectorAll(".right .users a .userBox img").forEach(function(element){
					element.removeEventListener("mouseover", calcBigImg );
				});
			}

			btnAttr = "off";
			displayMode = "none";
			imgDisplay = "none";
			btnText = "Ki";
			bgColor = "#cdcdcd";
			btnBoxShadow = "0 5px 0 0 #aaa0a0";
		} else {
            if(adatlap){
				let pcont = document.querySelector('.photoContainer a');
				pcont.addEventListener("click", nanoGallery);
				pcont.removeAttribute('href');
			} else {
				document.querySelectorAll(".right .users a .userBox img").forEach(function(element){
					element.addEventListener("mouseover", calcBigImg);
				})
			}
			btnAttr = "on";
			displayMode = "flex";
			imgDisplay = "block";
			btnText = "Be";
			bgColor = "#6ec956";
			btnBoxShadow = "0 5px 0 0 #439542";
        }
        document.querySelector("#imgov").style.display = imgDisplay;
        btn.setAttribute("data-open", btnAttr);
        btn.style.backgroundColor = bgColor;
        btn.style.boxShadow = btnBoxShadow;
        document.querySelector("#bigoverlay").style.display = displayMode;
		
		let el;
		el = Array.from(document.styleSheets);
		el.forEach( elem => {
			if(elem.ownerNode.type !== '' && elem.rules[0].selectorText === '#bigcontrols'){
				elem.ownerNode.id = 'bigstyle';
			}
		})		
	}
	
	function getHidedUser(){
		return 'www.valami.hu';
	}
	
	function nanoGallery(event){

		event.stopPropagation();
		
		var bigimg = document.querySelector('#bigimg'),
			userId = document.location.href.match(/[0-9]{6,7}/)[0],
			photos = document.querySelectorAll('.photos .thumbnail:not(.privatePhoto)'),
			el = document.querySelector('#bigoverlay');
		
		bigimg.dataset['uid'] = userId;

		if( !users[`${UID_prefix}${userId}`] ){
			users[`${UID_prefix}${userId}`] = {
				id : userId,
				imgs : [],
				count : photos.length,
				idx : 0
			}
			photos.forEach((elem) => {
				users[`${UID_prefix}${userId}`].imgs.push(elem.dataset['url']);
			})
		}
		
		var imgTarget = users[`${UID_prefix}${userId}`].imgs[0];
		
		console.log('nano');
		
		bigimg.setAttribute("src", imgTarget);
		bigimg.dataset['imgindex'] = '0';
		
		if (event.which === 1){

			el.style.opacity = "1";
			el.style.width = "100%";
			el.style.left = "0";
		}
	}	
	
	async function calcBigImg(event) {
		
		var imgElement = event.target,
			dataSource = imgElement.parentElement.parentElement.parentElement.href,
			userId;
		
		if (dataSource.search('elofizetes') > 0){
			dataSource = getHidedUser();
		}
		userId = dataSource.match(/[0-9]{6,7}/)[0];
		
		
		var st = document.documentElement.scrollTop;
		var sl = document.documentElement.scrollLeft;
		
		var imgPos = imgElement.getBoundingClientRect();
		var imgTop = imgPos.bottom - 75 + st;
		var imgLeft = imgPos.left + Math.round(imgPos.width / 2) - 10 + sl,
			res, resall;
		
		console.log(dataSource, userId);
		if( !users[`${UID_prefix}${userId}`] ){
			
			await fetch(dataSource)
			.then( (response) => {
				return response.text()
			})
			.then( (data) => {
				res = data.matchAll(/data-url=\"(.*?jpg)\"/g);
				resall = Array.from(res);
				
				users[`${UID_prefix}${userId}`] = {
					id : userId,
					imgs : [],
					count : resall.length,
					idx : 0
				}

				resall.forEach( (elem) => {
					users[`${UID_prefix}${userId}`].imgs.push(elem[1]);
				})
			})
		}
		
		var imgTarget = users[`${UID_prefix}${userId}`].imgs[0] ,
		imgov = document.querySelector("#imgov"),
		bigimg = document.querySelector("#bigimg");
		
		imgov.style.top = `${imgTop}px`;
        imgov.style.left = `${imgLeft}px`;
		bigimg.dataset['uid'] = userId;

        bigimg.setAttribute("src", imgTarget);
		bigimg.dataset['imgindex'] = '0';
	}
	
	
    function handleImgovMousedown(event) {
		var el = event.target,
			el1 = document.querySelector("#bigoverlay");
			
		if (event.which === 1){
			el.style.left = "-100px";
			el.style.top = "-100px";
			el1.style.opacity = "1";
			el1.style.width = "100%";
			el1.style.left = "0";
		}
	}

	
	function handleOkBtnClick(event){
		btnDraw(event.target);
	}

	
    function handleCloseBtnClick(event){
        var els = document.querySelectorAll("img");
        
		els.forEach(function(element){
			element.removeEventListener("mouseover", calcBigImg);
		});
		
		el = document.querySelector("#imgov");
		el.removeEventListener("mousedown", handleImgovMousedown);
		document.body.removeChild(el);
		
		el = document.querySelector("#bigoverlay");
		el.removeEventListener("click", handleBigOverlayClick);
		document.body.removeChild(el);
		
		el = document.querySelector(".btn.ok");
		el.removeEventListener("mousedown", handleImgovMousedown);
		//el.style.display = 'none'
        
		el = document.querySelector(".btn.close");
        el.removeEventListener("click", handleCloseBtnClick);
		//el.style.display = 'none'
		
		document.body.removeChild(document.querySelector("#bigcontrols"));
        document.head.removeChild(document.querySelector("#bigstyle"));
        
		
	}
	
	
    function handleBigOverlayClick(event){
        var el = document.querySelector("#bigoverlay");
        el.style.opacity ="0";
        el.style.left = "50%";
        el.style.width = "0";

        document.querySelector("#bigimg").setAttribute("src","");
        el = document.querySelector("#imgov");
        el.style.left = "-100px";
        el.style.top = "-100px";
        
    }

	
	function handleNextButtonsClick(event){
		event.stopPropagation();
		var way = event.target.dataset['way'],
			bigimg = document.querySelector('#bigimg'),
			uid = document.querySelector('#bigimg').dataset['uid'],
			actualImageIndex = users[`${UID_prefix}${uid}`].idx,
			imgcount = users[`${UID_prefix}${uid}`].count;
		
		if(way === 'left') {
			actualImageIndex = (actualImageIndex + imgcount - 1) % imgcount;
		} else {
			actualImageIndex = (actualImageIndex + imgcount + 1) % imgcount;
		}
		
		bigimg.setAttribute('src', users[`${UID_prefix}${uid}`].imgs[actualImageIndex]);
		users[`${UID_prefix}${uid}`].idx = actualImageIndex;
		bigimg.dataset['imgindex'] = actualImageIndex;
		
	}



	
//***************************************************
const
	UID_prefix = 'id_';

var users = [],
	adatlap	;
	
	console.log('Start BigImages bookmarklet');
	
	document.location.href.search('adatlap') > 0 ? adatlap = true : adatlap = false;
	
	var el = document.createElement('div');
	el.id = "bigoverlay";
	el.innerHTML = `<div class="bginner"><img id="bigimg" src=""><div class="go toleft" data-way="left"></div><div class="go toright" data-way="right"></div></div>`;
	document.body.appendChild(el);
	
	el = document.createElement('div');
	el.id = "bigcontrols";
	el.innerHTML = `<div class="btn ok" data-open="on">Be</div><div class="btn close">×</div>`;
	document.body.appendChild(el);
	
	el = document.createElement('div');
	el.id = "imgov";
	document.body.appendChild(el);	
	
	document.querySelectorAll('.bginner .go').forEach( (elem) => {
		elem.addEventListener('click', handleNextButtonsClick)	;
	})		
	
	let bigStyleText = `
	#bigcontrols{
	    position: fixed; 
	    top: 0px; 
	    right: 1vw; 
	    z-index:1000000;
	    opacity: 0.1;
	    transition: opacity 0.3s ease 2s;
	}

	#bigcontrols:hover{
	    opacity:1;
	    transition: opacity 0.3s ease 0s;
	}

	#bigcontrols .btn{
	    min-width: 5vh;
	    text-align: center;
	    vertical-align: middle;
	    font-size:20px;
	    line-height:22px;
	    color:#fff;
	    margin-right:3px;
	    display:inline-block;
	    cursor: pointer;
	    padding: 0.3rem 0.5rem;
	    border-radius: 3px;
	    text-shadow: 1px -1px 0 rgba(0, 0, 0, 0.2);
	}

	.btn.ok{
	    background-color:#6ec956;
	    color:#aaa;
	    box-shadow: 0 5px 0 0 #439542;
	}

	.btn.close{
	    background-color:#f17e7e;
	    box-shadow: 0 5px 0 0 #d35959;
	}

	#bigoverlay{
	    position: fixed;
	    z-index: 1000000;
	    top: 0; 
	    bottom: 0; 
	    left: 50%; 
	    width:0; 
	    background: rgba(0, 0, 0, 0.93) none repeat scroll 0% 0%;
	    display: flex; 
	    flex-direction: row; 
	    align-items: center; 
	    justify-content: center; 
	    opacity:0; 
	    transition: all 0.3s 0s linear;
	}    

	#bigoverlay .bginner{
	    max-width:60%; 
	    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2)

	}


	#bigimg{
	    max-width:100%;
	    max-height:100vh;
	}

	#imgov{
	    position:absolute; 
	    content:"";
	    display:block;
	    width:35px;
	    height:30px;
	    background-color:rgba(100,0,0,.2);
	    cursor:move;
	    z-index:100;
	    top:-100;
	    left:-100;
	    font-size:18px;
	    line-height:20px;
	    text-align:center;
	    color:#fff;
	    border-radius:3px;
	    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.44);
	}

	#bigoverlay .borela {
	    position: absolute;
	}

	#bigoverlay .go {
	    position: absolute;
	    width: 20vh;
	    height: 20vh;
	    top: 40vh;
	    background: transparent;
	    border: solid 10vh transparent;
	    --border-color: #D81B60;
	    opacity : 0.1;
	    cursor : pointer;
	    transition : opacity 0.4s;

	}

	#bigoverlay .go.toleft{
	    border-right-color : var(--border-color);
	    left : -10vh;
	}

	#bigoverlay .go.toright{
	    border-left-color : var(--border-color);
	    right: -10vh;
	}

	#bigoverlay .go.toleft:hover,
	#bigoverlay .go.toright:hover{
	    opacity : 1;
	}`;
	
	el = document.createElement('style');
	el.id = "bigstyle";
	el.setAttribute("type", "text/css");
	el.innerHTML = bigStyleText;
	document.head.appendChild(el);
	
	el = document.querySelector("#imgov");
	el.addEventListener("mousedown", handleImgovMousedown);	
	
	el = document.querySelector(".btn.ok");
	el.addEventListener("click", handleOkBtnClick);	
	
	el = document.querySelector(".btn.close");
	el.addEventListener("click", handleCloseBtnClick);	
	
    el = document.querySelector("#bigoverlay");
    el.addEventListener("click", handleBigOverlayClick);	
	
	btnDraw();
})();
