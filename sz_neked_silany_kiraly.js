javascript: (function () {

	var newsrc = decodeURIComponent(document.querySelector("form a img").src).replace("_process.php?filename=","/");
	
	document.querySelector("form a img").src = newsrc;

})();
