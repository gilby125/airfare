$('.ui.selection.dropdown')
  .dropdown()
;

$('#cabin-class-dropdown')
	.dropdown('set selected', 'economy')
;

$('#passenger-count-dropdown')
	.dropdown('set selected', '1')
;

$('.form').submit(function(event) {
	event.preventDefault();
	$(this).slideUp('slow', function() {
		// Animation complete.
	});
});