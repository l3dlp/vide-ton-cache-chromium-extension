(function(){
	$(document).ready(function(){
		
		/**
		 * Default values set in load-default-options.js
		 */
		var dataToRemove	= JSON.parse(localStorage['data_to_remove']);
		var autorefresh		= localStorage['autorefresh']=='true' || false;
		
		/**
		 * Hotfix: 'originBoundCertificates' is not supported any more
		 */
		if( dataToRemove['originBoundCertificates'] ){
			delete dataToRemove['originBoundCertificates'];
			saveSettings();
		}
		
		/**
		 * Parse data_to_remove
		 */
		$("input[name='data_to_remove']").each(function(){
			var element		= $(this);
			var dataType	= element.attr("value");
			element.prop('checked', dataToRemove[dataType]);
			element.change(function(){
				dataToRemove[dataType] = element.prop('checked');
				saveSettings();
			});
		});
		
		/**auto
		 * Parse autorefresh
		 */
		$("input[name='autorefresh']")
			.prop('checked', autorefresh==true)
			.change(function(){
				autorefresh = $(this).prop('checked');
				saveSettings();
			});
		
		
		
		
		/*=======================================================
		 * Initialize
		 *=======================================================/
		 
		/**
		 * Helpers
		 */
		function saveSettings(){
			localStorage['data_to_remove']	= JSON.stringify( dataToRemove );
			localStorage['autorefresh']		= autorefresh;
		}
		
		/**
		 * Based on http://daringfireball.net/2010/07/improved_regex_for_matching_urls
		 */
		function validateUrl( url ){
			var regex = /^(?:([a-z0-9+.-]+:\/\/)((?:(?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*)(:(?:\d*))?(\/(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?|([a-z0-9+.-]+:)(\/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?)(\?(?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*)?(#(?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*)?$/i;
			return url.match( regex );
		}
	});
})();