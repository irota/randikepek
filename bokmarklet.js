javascript : (function () {
	var head = document.getElementsByTagName("head")[0];
  
  if(!document.getElementById("randibkmlt")){
    var bklScript = document.createElement("script");
    bklScript.type = "text/javascript";
    bklScript.id ="randibkmlt";

    bklScript.src = "https://raw.githubusercontent.com/irota/randikepek/master/randikepek.min.js";
    head.appendChild(bklScript);
    
  } else {
     document.querySelector(".photooverlay").style = "display:flex !important;";
    
  }
  
})();
