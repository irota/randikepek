javascript: {
	(function () {
		function btnDraw(btn) {
			var btnAttr,
			 displayMode,
			 imgDisplay,
			 btnText,
			 bgColor,
			 btnBoxShadow;
			if ("on" == btn.attr("data-open")) {
				jQuery("img").unbind("mouseover");
				btnAttr = "off";
				displayMode = "none";
				imgDisplay = "none";
				btnText = "Ki";
				bgColor = "#cdcdcd";
				btnBoxShadow = "0 5px 0 0 #aaa0a0";
			} else {
				jQuery("img").on("mouseover", function () {
					calcBigImg(jQuery(this));
				});
				btnAttr = "on";
				displayMode = "flex";
				imgDisplay = "block";
				btnText = "Be";
				bgColor = "#6ec956";
				btnBoxShadow = "0 5px 0 0 #439542";
			}
			jQuery("#imgov").css("display", imgDisplay);
			btn.text(btnText).attr("data-open", btnAttr).css("background-color", bgColor).css("box-shadow", btnBoxShadow);
			jQuery("#bigoverlay").css("display", displayMode);
		}
		
		function calcBigImg(imgElement) {
			var imgTarget = imgElement.attr("src");
			var imgPos = imgElement[0].getBoundingClientRect();
			var imgTop = imgPos.top + Math.round((imgPos.bottom - imgPos.top + 30) / 2) + jQuery(window).scrollTop();
			var imgLeft = imgPos.left + Math.round((imgPos.right - imgPos.left - 35) / 2) + jQuery(window).scrollLeft();
			jQuery("#imgov").css("top", imgTop);
			jQuery("#imgov").css("left", imgLeft);
			imgTarget = imgTarget.replace(/_t/g, "");
			imgTarget = imgTarget.replace(/_[0-9]{3}x[0-9]{3}/, "");
			jQuery("#bigimg").attr("src", imgTarget);
		}
		
/**********************************************************************************************************/
		
		if (!document.getElementById("bigoverlay")) {
			var overlayElement = document.createElement("div");
			overlayElement.id = "bigoverlay";
			overlayElement.innerHTML = '<div><img id="bigimg" src="" /></div>';
			document.body.appendChild(overlayElement);
		}
		
		if (!document.getElementById("bigcontrols")) {
			var controlElement = document.createElement("div");
			controlElement.id = "bigcontrols";
			controlElement.innerHTML = '<div id="okbtn" data-open="on">Be</div><div id="closebtn">\u00d7</div>';
			document.body.appendChild(controlElement);
		}
		
		if (!document.getElementById("imgov")) {
			var imgHoverElement = document.createElement("div");
			imgHoverElement.id = "imgov";
			document.body.appendChild(imgHoverElement);
		}
		
		if (!document.getElementById("bigstyle")) {
			var styleElement = document.createElement("style");
			var styleText = '#bigcontrols{position: fixed; top: 0px; right: 0px; width: 100px; height: 25px;z-index:10000;opacity: 0.1;transition: opacity 0.3s ease 2s;}     #bigcontrols:hover{opacity:1;transition: opacity 0.3s ease 0s;}     #bigcontrols div{display: inline-block; width: 27%; height: 100%; text-align: center; vertical-align: middle;       font-size:20px; line-height:22px; color:#fff; margin-right:3px; display:inline-block; cursor: pointer;       padding: 0.3rem 0.5rem; border-radius: 3px; text-shadow: 1px -1px 0 rgba(0, 0, 0, 0.2);}     #okbtn{background-color:#6ec956; color:#aaa;box-shadow: 0 5px 0 0 #439542;}     #closebtn{background-color:#f17e7e;box-shadow: 0 5px 0 0 #d35959;}     #bigoverlay{position: fixed; z-index: 1000; top: 0; bottom: 0; left: 50%; width:0; background: rgba(0, 0, 0, 0.2) none repeat scroll 0% 0%;       display: flex; flex-direction: row; align-items: center; justify-content: center; opacity:0; transition: all 0.3s 0s linear;}     #bigoverlay div{max-width:60%; box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2)}     #bigimg{max-width:100%;max-height:100vh;}     #imgov{position:absolute; content:"";display:block;width:35px;height:30px;background-color:rgba(100,0,0,.2);       cursor:move;z-index:100;top:-100;left:-100;font-size:18px;line-height:20px;       text-align:center;color:#fff;border-radius:3px;box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.44);}';
			styleElement.id = "bigstyle";
			styleElement.textContent = styleText;
			document.body.appendChild(styleElement);
		}
		
		if (typeOf(jQuery) !== "function") { jQuery = $ };
		
		jQuery("#imgov").on("mousedown", function (event) {
			return 3 === event.which ? (jQuery(this).css("left", "-100px").css("top", "-100px"), false) : void jQuery("#bigoverlay").css("opacity", "1").css("width", "100%").css("left", "0");
		});
		
		jQuery("#okbtn").on("click", function () {
			btnDraw(jQuery(this));
		});
		
		jQuery("#closebtn").on("click", function () {
			jQuery("img").unbind("mouseover").unbind("mouseout");
			jQuery("#imgov").unbind("click").css("display", "none").remove();
			jQuery("#bigoverlay").unbind("click").css("display", "none").remove();
			jQuery("#okbtn").unbind("click");
			jQuery("#closebtn").unbind("click");
			jQuery("#bigcontrols").css("display", "none").remove();
			jQuery("#bigstyle").remove();
		});
		
		jQuery("#bigoverlay").on("click", function () {
			jQuery(this).css("opacity", "0");
			jQuery(this).css("left", "50%");
			jQuery(this).css("width", "0");
			jQuery("#bigimg").attr("src", "");
			jQuery("#imgov").css("left", "-100px").css("top", "-100px");
		});
		
		jQuery("img").on("mouseover", function () {
			calcBigImg(jQuery(this));
		});
		
	})();
};
