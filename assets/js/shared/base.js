var NS = NS || {};
NS.Base = (function ($) {
	'use strict';

	var instance = {},
		editModal = '#edit-modal';

	instance.initTable = function (url, table, columns) {
		instance.table = table.DataTable({
	    	processing: true,
	        serverSide: true,
	        ajax: url || '',
	        pageLength: 10,
	    	columns: columns
	    });
	};

	$('body')
		.on('click', '.btn-delete', function (event) {
	    	var cf = confirm('Are you sure you want to delete this item?');

	    	if (!cf) {
	    		event.preventDefault();
	    		return false;
	    	}
	    })
	    .on('click', '.btn-edit', function (event) {
	    	event.preventDefault();

	    	$(editModal).modal('show');

	    	$.ajax({
	    		url: $(this).attr('href'),
	    		type: 'POST',
	    		data: {
	    			_csrf: window._csrf
	    		},
	    		success: function (data) {
	    			$(editModal).find('.modal-body').html(data);
	    		}
	    	});
	    });

	return instance;
}(jQuery));