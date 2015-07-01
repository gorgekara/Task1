(function ($) {
	'use strict';

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

	    	$('#edit-modal').modal('show');

	    	$.ajax({
	    		url: $(this).attr('href'),
	    		type: 'POST',
	    		data: {
	    			_csrf: window._csrf
	    		},
	    		success: function (data) {
	    			$('#edit-modal').find('.modal-body').html(data);
	    		}
	    	});
	    });

}(jQuery));