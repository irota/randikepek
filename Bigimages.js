(function () {
	function btnDraw(btn) {
		var btnAttr,
		displayMode,
		imgDisplay,
		btnText,
		bgColor,
		btnBoxShadow;
		if ("on" == btn.getAttribute("data-open") ) {
            document.querySelectorAll("img").forEach(function(element){
                element.removeEventListener("mouseover", calcBigImg )
            });
			btnAttr = "off";
			displayMode = "none";
			imgDisplay = "none";
			btnText = "Ki";
			bgColor = "#cdcdcd";
			btnBoxShadow = "0 5px 0 0 #aaa0a0";
		} else {
            document.querySelectorAll("img").forEach(function(element){
                element.addEventListener("mouseover", calcBigImg );
            });
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
	}

	function calcBigImg(event) {
        imgElement = event.target;

		var imgTarget = imgElement.getAttribute("src");
		var imgPos = imgElement.getBoundingClientRect();
		var imgTop = imgPos.top + Math.round((imgPos.bottom - imgPos.top + 30) / 2) + window.getScrollTop();
		var imgLeft = imgPos.left + Math.round((imgPos.right - imgPos.left - 35) / 2) + window.getScrollLeft();
        document.querySelector("#imgov").style.top = imgTop + "px";
        document.querySelector("#imgov").style.left = imgLeft + "px";
		imgTarget = imgTarget.replace(/_t/g, "");
        imgTarget = imgTarget.replace(/_[0-9]{3}x[0-9]{3}/, "");
        document.querySelector("#bigimg").setAttribute("src", imgTarget)

	}


/******************************************************************* 
****************************************************************** */    

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

	var el = document.querySelector("#imgov");
	el.addEventListener("mousedown", handleImgovMousedown);

	
	function handleOkBtnClick(event){
		btnDraw(event.target);
	}
	el = document.querySelector("#okbtn");
	el.addEventListener("click", handleOkBtnClick);

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
		
		document.querySelector("#okbtn").removeEventListener("mousedown", handleImgovMousedown);

		document.body.removeChild(document.querySelector("#bigcontrols"));
        document.head.removeChild(document.querySelector("#bigstyle"));
		document.querySelector("#closebtn").removeEventListener("click", handleCloseBtnClick);
		
        
	}
	el = document.querySelector("#closebtn");
	el.addEventListener("click", handleCloseBtnClick);
 

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
    el = document.querySelector("#bigoverlay");
    el.addEventListener("click", handleBigOverlayClick);

    
    document.querySelectorAll("img").forEach(function(element){
        element.addEventListener("mouseover", calcBigImg);
    });


    let bigStyleText = `
        #bigcontrols{
            position: fixed; 
            top: 0px; 
            right: 0px; 
            width: 100px; 
            height: 25px;
            z-index:10000;
            opacity: 0.1;
            transition: opacity 0.3s ease 2s;
        }     
            
        #bigcontrols:hover{
            opacity:1;
            transition: opacity 0.3s ease 0s;
        }     

        #bigcontrols div{
            display: inline-block; 
            width: 27%; 
            height: 100%; 
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

        #okbtn{
            background-color:#6ec956; 
            color:#aaa;
            box-shadow: 0 5px 0 0 #439542;
        }     

        #closebtn{
            background-color:#f17e7e;
            box-shadow: 0 5px 0 0 #d35959;
        }     

        #bigoverlay{
            position: fixed; 
            z-index: 1000; 
            top: 0; 
            bottom: 0; 
            left: 50%; 
            width:0; 
            background: rgba(0, 0, 0, 0.2) none repeat scroll 0% 0%;       
            display: flex; 
            flex-direction: row; 
            align-items: center; 
            justify-content: center; 
            opacity:0; 
            transition: all 0.3s 0s linear;
        }    

        #bigoverlay div{
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
        } `;

        el = document.createElement('style');
        el.id = "bigstyle";
        el.setAttribute("type", "text/css");
        el.innerHTML = bigStyleText;
        document.head.appendChild(el);
 
})();
