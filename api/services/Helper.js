module.exports = {

	forEach: function (array, callback) {
		if (typeof array[0] === 'undefined' ||
			!array.length ||
			!callback) { return; }

		var i = 0;

		for (i = 0; i < array.length; i += 1) {
			callback(array[i], i);
		}
	},

	getUrlParameter: function (param, dummyPath) {
		var sPageURL = dummyPath || window.location.search.substring(1),
			sURLVariables = sPageURL.split(/[&||?]/),
			res;

		Helper.forEach(sURLVariables, function (paramName) {
			var sParameterName = (paramName || '').split('=');
			
			if (sParameterName[0] === param) {
				res = sParameterName[1];
			}
		});

		return res;
	}
	
};

