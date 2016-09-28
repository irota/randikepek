(function() {
  var startBookmarklet = function($) {      
    
    //ha nem azon az oldalon vgyunk, kilépünk
    if(!document.getElementById("PhotoArray")){
      return true;
    }
    
    var nanocontainer,
    
  
    
    nanoShow = function() {
      $(".photooverlay").attr("style","{display:flex !important;}");

    },
    
    nanoHide = function(){
      $(".photooverlay").attr("style","display:none !important;");
    },


    nanoBuild = function() {
      var parr = document.getElementById("PhotoArray"),
          photos = Array(),
          nanohtml;
          
          parr = eval(parr.value);
      
      for(var i = 0, l = parr.length; i < l; i++){
        photos[i] = parr[i].split("|");
      }    
      
      nanohtml="<div class=\"photooverlay\"><div class=\"photocontainer\"><div class=\"closebtn\"><a href=\"#\">x</a></div><div class=\"thumbcontainer\"><div id=\"nano-gallery\">";
      
      for(i = 0; i < l; i++){
        nanohtml += "<a href=\"" + photos[i][2] + "\" data-ngthumb=\"" + photos[i][1] + "\">" + eval(i+1) + "</a>";
      }
      
      nanohtml += "</div></div></div></div>";
      $("body").append(nanohtml);

    },
    
    nanocontainer = document.getElementById("nano-gallery");
    
    if(!nanocontainer){
       nanoBuild();
       $("#nano-gallery").nanoGallery({
          thumbnailWidth: 'auto',
          thumbnailHeight: 110,
          locationHash: false,
          thumbnailHoverEffect:'borderLighter'
        });
    } else {
      // nanogallery bekapcsolása
       nanoshow();
    }
    
    $(".closebtn").click("on", function(){
      nanoHide();
    }); 
    $(".photooverlay").click("on", function(){
      nanoHide();
    });

  };
  
  var head = document.getElementsByTagName("head")[0];

  // Load jQuery from CDN if needed
  if (!window.jQuery) {
    var jQueryScript = document.createElement("script");
    jQueryScript.type = "text/javascript";
    jQueryScript.src  = "http://code.jquery.com/jquery-1.10.0.min.js";
    //jQueryScript.onload = ;
    head.appendChild(jQueryScript);
  } else {
   
  }
  
  
  //load nanoGallery theme
  
  if(!document.getElementById("nanostyle")){
    var nanostyle = document.createElement("link");
    
    nanostyle.type = "text/css";
    nanostyle.href = "https://cdnjs.cloudflare.com/ajax/libs/nanogallery/5.10.3/css/nanogallery.min.css"
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
    sty.textContent = ".photooverlay{align-items: center; background: rgba(0, 0, 0, 0.52) none repeat scroll 0 0; display: flex; flex-flow: row nowrap; height: 100vh; justify-content: center; left: 0; position: absolute; top: 0; width: 100%; z-index: 1000;}"
    
    + ".photocontainer{background: rgba(255, 255, 255, 0.78) none repeat scroll 0 0;  max-width: 650px; position: relative; width: 80%;border-radius:7% / 120%;box-shadow:0 0 0 6px rgba(145, 5, 5, 0.31), 0 0 0 3px rgba(255, 255, 255, 0.31) inset;}"
    + ".closebtn{cursor:pointer;padding: .5rem; position: absolute; right: 9px; text-shadow: 0 0 2px #560303; top: 0;z-index:1001;background:rgba(255,255,255,1);box-shadow:0 0 1px 1px rgba(0,0,0,.89) inset;margin: 3px 3px 0 0;border-radius: 50%;}"
    + ".closebtn a{color: #810707; text-decoration: none;font-size: 1.4rem;line-height: 0.8rem;}"
    + ".thumbcontainer{align-items: right; display: flex; flex-flow: column nowrap; position: relative;padding:10px;}"
    + "#nano-gallery{width:88%}";
    head.appendChild(sty);
    
  } else {
    
  }
  
  //load nanoGallery
  if(!document.getElementById("nanoscript")) {
     var nanoscript = document.createElement("script");
     
     nanoscript.type = "text/javascript";
     nanoscript.id = "nanoscript";
     nanoscript.src = "https://cdnjs.cloudflare.com/ajax/libs/nanogallery/5.10.3/jquery.nanogallery.min.js";
     nanoscript.onload = function() { startBookmarklet(window.jQuery); };
     head.appendChild(nanoscript);
  } else {
     startBookmarklet(window.jQuery);
  }
  
  
})();
