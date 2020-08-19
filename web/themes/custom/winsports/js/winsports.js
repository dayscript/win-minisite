/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.winsports = {
    attach: function (context, settings) {
      //alert("I'm alive!");
      	//$("#sidebar-first .menu li").first('a').addClass("active")
		// Cache selectors
		var lastId,
		    topMenu = $("#sidebar-first .menu"),
		    topMenuHeight = topMenu.outerHeight(),
		    // All list items
		    menuItems = topMenu.find("a"),
		    // Anchors corresponding to menu items
		    scrollItems = menuItems.map(function(){
		      var item = $($(this).attr("href"));
		      if (item.length) { return item; }
		    });

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
		  var href = $(this).attr("href"),
		      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		  $('html, body').stop().animate({ 
		      scrollTop: offsetTop
		  }, 300);
		  e.preventDefault();
		});

		// Bind to scroll
		$(window).scroll(function(){
		   // Get container scroll position
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove active class
		       menuItems
		         .parent().removeClass("active")
		         .end().filter("[href='#"+id+"']").parent().addClass("active");
		   }                   
		});
		$(".field-node--field-mediastream, .field-node--field-url-youtube").parent('.node').find(".field-node--field-image").addClass("hidden");
		$(document, context).once('winsports').ajaxStop(function() {
			console.log('entro')
		});
    }
  };

})(jQuery, Drupal);
