/**
 * @license 
 * jQuery Tools @VERSION Mousewheel
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/toolbox/mousewheel.html
 * 
 * based on jquery.event.wheel.js ~ rev 1 ~ 
 * Copyright (c) 2008, Three Dub Media
 * http://threedubmedia.com 
 *
 * Since: Mar 2010
 * Date: @DATE 
 *
* I have no idea if this really works or not. In fact, I'm inclined to doubt it.
* The "original" doesn't work in chrome. I updated it to the modern Firefox's wheel
* event, but I have no clue if it's correct. I have no intention to test, since I don't 
* actually use this plugin. --Matt
 */
(function($) { 
	
	$.fn.mousewheel = function( fn ){
		return this[ fn ? "on" : "trigger" ]( "wheel", fn );
	};

	// special event config
	$.event.special.wheel = {
		setup: function() {
			$.event.add( this, wheelEvents, wheelHandler, {} );
		},
		teardown: function(){
			$.event.remove( this, wheelEvents, wheelHandler );
		}
	};

	// events to bind ( browser sniffed... )
	//var wheelEvents = !$.browser.mozilla ? "mousewheel" : // IE, opera, safari
		//"DOMMouseScroll"+( $.browser.version<"1.9" ? " mousemove" : "" ); // firefox
    
    if (window.onmousewheel == undefined) {
        wheelEvents = 'wheel';
    }
    else {
        wheelEvents = 'mousewheel';
    }

	// shared event handler
	function wheelHandler( event ) {
		
		switch ( event.type ) {
			
			case "wheel": 
                event.delta = event.originalEvent.deltaY;
				break;
				
			// IE, opera, safari	
			case "mousewheel":				
				event.delta = event.wheelDelta / 120;
				break;
		}
		
		event.type = "wheel"; // hijack the event	
		return $.event.handle.call( this, event, event.delta );
	}
	
})(jQuery); 

