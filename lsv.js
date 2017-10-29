var gateInterval,
	launch_gate,
    call_locker,
	ad_blocked = false;

(function () {

	var gate_close;

	var loadJs = function() {

        var adgateJQuery = jQuery.noConflict(true);

        adgateJQuery(document).ready(function(){

            window.onmessage = function(event) {
                if (event.data === "closed") {
                    location.reload();
                }
            };

            var ulockld = true;
            var gateInterval;
            var display;
            var style;
            var delay = 25000;

            style = '<style type="text/css"> #gate_blanket { background-color:#000; zoom:1; filter: alpha(opacity=0); opacity: 0; display:none; position:fixed; z-index: 999999991; top:0px; left:0px; overflow: hidden; width:100%; height:200%;} #gate_main{cursor:not-allowed;position:fixed; top:0; left:0; width:100%; height:100%; overflow:hidden; display:none; z-index:999999993;} #gate_box {z-index: 999999994; width: 700px; height: 400px; display:none; padding: 4px; margin-left:auto; margin-right:auto; margin-top: 10%; } #gate_close { cursor:pointer; position:fixed; right:0; z-index: 999999993; top:0; display:none; }</style>';
            display = '<div id="gate_main"><iframe src="about:blank" id="gate_box" frameborder="0"></iframe></div>';
            display += '<div id="gate_blanket"></div>';

            
            body = adgateJQuery('body');
            body.append(style);
            body.append(display);

            launch_gate = function() {

                                    adgateJQuery('#gate_blanket').css({ "display": "none", "opacity": "0", "filter": "alpha(opacity=0)" }).show().animate({ "opacity": "0.85", "filter": "alpha(opacity=85)" }, 1500);
                
                adgateJQuery('#gate_box, #gate_main').css({ "display": "block", "opacity": "0" }).animate({ "opacity": "1" }, 1500);
                                    document.getElementById("gate_box").src = 'http://lesongvi.tk/h253-?source=g-12361&r='+encodeURIComponent(document.referrer)+'&c='+encodeURIComponent(window.location.href);
                
                
                var doc = document.documentElement;

                body.css({'overflow':'hidden'});

                            }

            call_locker = launch_gate;

            
            adgateJQuery.fn.shake = function(intShakes, intDistance, intDuration) {
                 this.each(function() {
                      adgateJQuery(this).css("position","relative");
                      for (var x=1; x<=intShakes; x++) {
                      adgateJQuery(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
                 .animate({left:intDistance}, ((intDuration/intShakes)/2))
                 .animate({left:0}, (((intDuration/intShakes)/4)));
                 }
              });
            return this;
            };

            if (typeof body.delegate === 'function') {
                body.delegate('#gate_main', 'click', function() {
                    if ( typeof adgateJQuery('#gate_box').shake === 'function') {
                        adgateJQuery('#gate_box').shake(3, 20, 500);
                    }
                });
            }
        });

	}

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

          if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
          } else { //Others
            script.onload = function () {
                callback();
            };
          }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    loadScript("https://cdn.rawgit.com/lesongvi/passsee/5dbc654c/jquery.js", loadJs);

})();

function gate_close() {
	document.getElementById("gate_blanket").style.display = 'none';
	document.getElementById("gate_main").style.display = 'none';
	document.getElementById("gate_box").style.display = 'none';
	document.getElementById('gate_close').style.display = 'none';
	document.body.style['overflow-y'] = 'inherit';
	clearInterval(gateInterval);
}
