javascript: (function () {

	var newsrc=document.querySelector("form a img").src.replace("_process.php?filename=","/").replace("%2F","/");
	document.querySelector("form a img").src = newsrc;

})();
