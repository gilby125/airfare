$('.ui.selection.dropdown')
  .dropdown()
;

$('#cabin-class-dropdown')
	.dropdown('set selected', 'economy')
;

$('#passenger-count-dropdown')
	.dropdown('set selected', '1')
;

$("#roundTripSubmit").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
        url: $(this).attr("action"),
        type: 'POST',
        data: $(this).serialize(),
        beforeSend: function() {
        	// callback before send
        },
        success: function(data) {
        	// callback after success
        }
    });
    $(".form").slideUp('slow', function() {
       	// Animation complete
    });
});