'use strict';

angular.module('mean').controller('ProductDetailsController', ['$scope', '$stateParams', 'Global', function ($scope, $stateParams, Global) {
  $scope.global = Global;
  $scope.prodTravel = $stateParams.prodTravel[0];

  // $scope.productName = $scope.productObj.id;
  // $scope.productName = "testing"
  // $(".lightgallery").lightGallery();

  // $('.owl-carousel').owlCarousel({
  //   items: 5,
  //   loop: true,
  //   margin: 10,
  //   merge: true,
  //   responsive: {
  //     678: {
  //       mergeFit: true
  //     },
  //     1000: {
  //       mergeFit: false
  //     }
  //   }
  // });

	$scope.owlC = function activeHash(e) {
		var i = e;
		var $activeHash = $('.owl-item').eq(i).find('[data-hash]').attr('data-hash');
		$('.product-thumbnails li').removeClass('active');
		$('[href="#' + $activeHash + '"]').parent().addClass('active');
		$('.gallery-wrapper .gallery-item').removeClass('active');
		$('[data-hash="' + $activeHash + '"]').parent().addClass('active');
	}

	$(document).ready(function() {
		var bigimage = $("#big");
		var thumbs = $("#thumbs");
		var syncedSecondary = true;
	  
		thumbs.on("initialized.owl.carousel", function() {
		  thumbs
			.find(".thumbnails")
			.eq(0)
			.addClass("current");
		}).owlCarousel({
			mouseDrag: false
		}).on("changed.owl.carousel", syncPosition2);
	  
		function syncPosition2(el) {
		  if (syncedSecondary) {
			var number = el.item.index;
			bigimage.data("owl.carousel").to(number, 100, true);
		  }
		}
	  
		thumbs.on("click", ".thumbnails", function(e) {
		  e.preventDefault();
		  var number = $(this).index();
		  bigimage.data("owl.carousel").to(number, 300, true);
		});
	});

	// Gallery (Photoswipe)
	//------------------------------------------------------------------------------
	if($('.gallery-wrapper').length) {
		
		var initPhotoSwipeFromDOM = function(gallerySelector) {
		
			// parse slide data (url, title, size ...) from DOM elements
			// (children of gallerySelector)
			var parseThumbnailElements = function(el) {
				var thumbElements = $(el).find('.gallery-item:not(.isotope-hidden)').get(),
					numNodes = thumbElements.length,
					items = [],
					figureEl,
					linkEl,
					size,
					item;
		
				for (var i = 0; i < numNodes; i++) {
		
					figureEl = thumbElements[i]; // <figure> element
		
					// include only element nodes
					if (figureEl.nodeType !== 1) {
						continue;
					}
		
					linkEl = figureEl.children[0]; // <a> element
					
					// create slide object
					if ($(linkEl).data('type') == 'video') {
						item = {
							html: $(linkEl).data('video')
						};
					} else {
						size = linkEl.getAttribute('data-size').split('x');
						item = {
							src: linkEl.getAttribute('href'),
							w: parseInt(size[0], 10),
							h: parseInt(size[1], 10)
						};
					}
		
					if (figureEl.children.length > 1) {
						item.title = $(figureEl).find('.caption').html();
					}
		
					if (linkEl.children.length > 0) {
						item.msrc = linkEl.children[0].getAttribute('src');
					}
		
					item.el = figureEl; // save link to element for getThumbBoundsFn
					items.push(item);
				}
		
				return items;
			};
		
			// find nearest parent element
			var closest = function closest(el, fn) {
				return el && (fn(el) ? el : closest(el.parentNode, fn));
			};
		
			function hasClass(element, cls) {
				return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
			}
		
			// triggers when user clicks on thumbnail
			var onThumbnailsClick = function(e) {
				e = e || window.event;
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
		
				var eTarget = e.target || e.srcElement;
		
				// find root element of slide
				var clickedListItem = closest(eTarget, function(el) {
					return (hasClass(el, 'gallery-item'));
				});
		
				if (!clickedListItem) {
					return;
				}
		
				// find index of clicked item by looping through all child nodes
				// alternatively, you may define index via data- attribute
				var clickedGallery = clickedListItem.closest('.gallery-wrapper'),
					childNodes = $(clickedListItem.closest('.gallery-wrapper')).find('.gallery-item:not(.isotope-hidden)').get(),
					numChildNodes = childNodes.length,
					nodeIndex = 0,
					index;
		
				for (var i = 0; i < numChildNodes; i++) {
					if (childNodes[i].nodeType !== 1) {
						continue;
					}
		
					if (childNodes[i] === clickedListItem) {
						index = nodeIndex;
						break;
					}
					nodeIndex++;
				}
		
				if (index >= 0) {
					// open PhotoSwipe if valid index found
					openPhotoSwipe(index, clickedGallery);
				}
				return false;
			};
		
			// parse picture index and gallery index from URL (#&pid=1&gid=2)
			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
					params = {};
		
				if (hash.length < 5) {
					return params;
				}
		
				var vars = hash.split('&');
				for (var i = 0; i < vars.length; i++) {
					if (!vars[i]) {
						continue;
					}
					var pair = vars[i].split('=');
					if (pair.length < 2) {
						continue;
					}
					params[pair[0]] = pair[1];
				}
		
				if (params.gid) {
					params.gid = parseInt(params.gid, 10);
				}
		
				return params;
			};
		
			var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
				var pswpElement = document.querySelectorAll('.pswp')[0],
					gallery,
					options,
					items;
		
				items = parseThumbnailElements(galleryElement);
		
				// define options (if needed)
				options = {
					
					closeOnScroll: false,
					
					// define gallery index (for URL)
					galleryUID: galleryElement.getAttribute('data-pswp-uid'),
		
					getThumbBoundsFn: function(index) {
							// See Options -> getThumbBoundsFn section of documentation for more info
							var thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
							if($(thumbnail).length > 0) {
								var	pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
										rect = thumbnail.getBoundingClientRect();
				
								return {
									x: rect.left,
									y: rect.top + pageYScroll,
									w: rect.width
								};
							}
						}
		
				};
		
				// PhotoSwipe opened from URL
				if (fromURL) {
					if (options.galleryPIDs) {
						// parse real index when custom PIDs are used
						// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
						for (var j = 0; j < items.length; j++) {
							if (items[j].pid == index) {
								options.index = j;
								break;
							}
						}
					} else {
						// in URL indexes start from 1
						options.index = parseInt(index, 10) - 1;
					}
				} else {
					options.index = parseInt(index, 10);
				}
		
				// exit if index not found
				if (isNaN(options.index)) {
					return;
				}
		
				if (disableAnimation) {
					options.showAnimationDuration = 0;
				}
		
				// Pass data to PhotoSwipe and initialize it
				gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
				gallery.init();
		
				gallery.listen('beforeChange', function() {
					var currItem = $(gallery.currItem.container);
					$('.pswp__video').removeClass('active');
					var currItemIframe = currItem.find('.pswp__video').addClass('active');
					$('.pswp__video').each(function() {
						if (!$(this).hasClass('active')) {
							$(this).attr('src', $(this).attr('src'));
						}
					});
				});
		
				gallery.listen('close', function() {
					$('.pswp__video').each(function() {
						$(this).attr('src', $(this).attr('src'));
					});
				});
		
			};
		
			// loop through all gallery elements and bind events
			var galleryElements = document.querySelectorAll(gallerySelector);
		
			for (var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i + 1);
				galleryElements[i].onclick = onThumbnailsClick;
			}
		
			// Parse URL and open gallery if it contains #&pid=3&gid=1
			var hashData = photoswipeParseHash();
			if (hashData.pid && hashData.gid) {
				openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
			}
		
		};
		
		// execute above function
		initPhotoSwipeFromDOM('.gallery-wrapper');
	}
	
	  

}]);

