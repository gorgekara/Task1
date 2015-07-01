(function ($) {
	'use strict';

	var instance = {};

	instance.initTable = function (url, table, columns) {
		instance.table = table.DataTable({
	    	processing: true,
	        serverSide: true,
	        ajax: url || '',
	        pageLength: 10,
	    	columns: columns
	    });
	};

	instance.initTable('/category/getCategories', $('.dataTable'), [
        null,
	    null,
	    null,
	    null,
	    null
    ]);

}(jQuery));