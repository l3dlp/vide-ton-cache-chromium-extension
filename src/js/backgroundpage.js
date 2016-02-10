(function(){
	
	var _iconAnimation = new IconAnimation();
	var autorefresh		= localStorage['autorefresh']=='true';
	var timeout			= NaN;
	
	_iconAnimation.updated.add(function(){
		chrome.browserAction.setIcon({'imageData':_iconAnimation.getImageData()});
	});
	
	chrome.browserAction.onClicked.addListener(function(tab) {
		/**
		 * Default values set in load-default-options.js
		 */
		var dataToRemove	= JSON.parse( localStorage['data_to_remove'] );
		
		clearCache();
		
	});
		
	function clearCache(){
		
		_iconAnimation.fadeIn();
		var autorefresh		= localStorage['autorefresh']=='true';
		
		/*
		chrome.browsingData.removeCache({
			"since": 0,
			"originTypes": {
				"unprotectedWeb": true,
				"protectedWeb": true,
				"extension": true
			}
		});
		*/
		
		chrome.browsingData.remove({
			"since": 0
		}, {
			"appcache": true,
			"cache": true,
			"fileSystems": true,
			"indexedDB": true,
			"localStorage": true,
			"pluginData": true,
			"webSQL": true
		});
		
		startTimeout(function(){
			chrome.browserAction.setBadgeText({text:""});
			chrome.browserAction.setPopup({popup:""});
			_iconAnimation.fadeOut();
		}, 500 );

		/*
		
		// new API since Chrome Dev 19.0.1055.1
		if( chrome['browsingData'] && chrome['browsingData']['removeAppcache'] ){
			chrome.browsingData.remove( {'since':0}, dataToRemove, function(){
				startTimeout(function(){
					chrome.browserAction.setBadgeText({text:""});
					chrome.browserAction.setPopup({popup:""});
					_iconAnimation.fadeOut();
				}, 500 );
			});
		
		// new API since Chrome Dev 19.0.1049.3	
		} else if( chrome['experimental'] && chrome['experimental']['browsingData'] && chrome.experimental['browsingData']['removeAppcache'] ){
			chrome.experimental.browsingData.remove( {'since':timeperiod}, dataToRemove, function(){
				startTimeout(function(){
					chrome.browserAction.setBadgeText({text:""});
					chrome.browserAction.setPopup({popup:""});
					_iconAnimation.fadeOut();
				}, 500 );
			});
			
		// new API since Chrome Dev 19.0.1041.0
		} else if( chrome['experimental']['browsingData'] ){
			chrome.experimental.browsingData.remove( timeperiod, dataToRemove, function(){
				startTimeout(function(){
					chrome.browserAction.setBadgeText({text:""});
					chrome.browserAction.setPopup({popup:""});
					_iconAnimation.fadeOut();
				}, 500 );
			});
			
		// old API
		} else if( chrome['experimental'] ){
			chrome['experimental'].clear.browsingData( timeperiod, dataToRemove, function(){
				startTimeout(function(){
					chrome.browserAction.setBadgeText({text:""});
					chrome.browserAction.setPopup({popup:""});
					_iconAnimation.fadeOut();
				}, 500 );
			});
		} else {
			console.error( "No matching API found! (Really old browser version?)" );
		}
		*/
		
		// reload current tab
		if( autorefresh ){
			chrome.tabs.reload();
		}
	}
	
	function startTimeout( handler, delay ){
		stopTimeout();
		timeout = setTimeout( handler, delay );
	}
	
	function stopTimeout(){
		if(!isNaN(timeout)){
			return;
		}
		clearTimeout(timeout);
	}
	
})();