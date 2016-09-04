(function() {
  var startBookmarklet = function($) {      
    
    //ha nem azon az oldalon vgyunk, kilépünk
    if(!document.getElementById("PhotoArray")){
      return true;
    }
    
    var nanocontainer = document.getElementById("nano-gallery");
    
    if(!nanocontainer){
      
    } else {
      // nanogallery bekapcsolása
       nanoshow();
    }

    
    
    var nanoShow = function() {
      $(".photooverlay").attr("style","{display:flex !important;}");

    },
    nanoHide = function(){
      $(".photooverlay").attr("style","{display:none !important;}");
    },


    nanoBuild = function(gridZindex) {
      var parr = document.getElementById("PhotoArray"),
          photos = Array(),
          nanohtml;
          
          parr = eval(parr.value);
      
      for(var i = 0, l = parr.length; i < l; i++){
        photos[i] = parr[i].split("|");
      }    
      
      nanohtml="<div class=\"photooverlay\"><div class=\"photocontainer\"><div class=\"closebtn\"><a href=\"#\">X</a></div><div class=\"thumbcontainer\"><div id=\"nano-gallery\">";
      
      for(i = 0; i < l; i++){
        nonohtml += "<a href=\"" + photos[i][2] + "\" data-ngthumb=\"" + photos[i][1] + "\">" + i+1 + "</a>";
      }
      
      nanohtml += "</div></div></div></div>";
      $("body").append(nanohtml);

    };
    
    $(".closebtn a").click("on", funcion(){
      nanoHide();
    })

  };
  
  var head = document.getElementsByTagName("head")[0]

  // Load jQuery from CDN if needed
  if (!window.jQuery) {
    var jQueryScript = document.createElement("script");
    jQueryScript.type = "text/javascript";
    jQueryScript.src  = "http://code.jquery.com/jquery-1.10.0.min.js";
    jQueryScript.onload = function() { startBookmarklet(window.jQuery); };
    head.appendChild(jQueryScript);
  } else {
   
  }
  
  
  //load nanoGallery theme
  
  if(!document.getElementById("nanostyle")){
    var nanostyle = document.createElement("style");
    
    nanostyle.type = "text/css";
    nanostyle.src = "https://cdnjs.cloudflare.com/ajax/libs/nanogallery/5.10.3/css/nanogallery.min.css"
    nanostyle.id = "nanostyle";
    nanostyle.rel = "stylesheet";
    head.appendChild(nanostyle);
  } else {
  
  }
  
  //saját téma beinjektálása
  if(!document.getElementById("customstyle")){
    var sty = document.createElement("style");
    
    sty.type = "text/css";
    sty.rel = "stylesheet";
    sty.id = "customstyle";
    sty.textContent = ".photooverlay{align-items: center; background: rgba(255, 0, 0, 0.18) none repeat scroll 0 0; display: flex; flex-flow: row nowrap; height: 100vh; justify-content: center; left: 0; position: absolute; top: 0; width: 100%; z-index: 1000;}"
    
    + ".photocontainer{background: rgba(1, 128, 0, 0.23) none repeat scroll 0 0;  max-width: 650px; position: relative; width: 50%;}"
    + ".closebtn{font-size: 2rem; padding: 1rem; position: absolute; right: 0; text-shadow: 0 0 2px #560303; top: 0;}"
    + ".closebtn a{color: #810707; text-decoration: none;}"
    + ".thumcontainer{align-items: right; display: flex; flex-flow: column nowrap; position: relative;}"
    + ".thumbcontainer>div{width: 50%;}";
    head.appendChild(sty);
    
  } else {
    
  }
  
  //load nanoGallery
  if(!document.getElementById("nanoscript")) {
     var nanoscript = document.createElement("script");
     head = document.getElementById("head");
     nanoscript.type = "text/javascript";
     nanoscript.id = "nanoscript";
     nanoscript.scr = "https://cdnjs.cloudflare.com/ajax/libs/nanogallery/5.10.3/jquery.nanogallery.min.js";
     nanoscript.onload = function(){startBookmarklet(window.jQuery)};
     head
  } else {
     startBookmarklet(window.jQuery);
  }
  
  
})();
