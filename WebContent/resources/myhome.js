$(function() {
	// 창크기 변화 감지
	/*
	 * $(window).resize(function() {
	 * 
	 * });
	 */

/*	$(window).bind('resize', function(e) {
		window.resizeEvt;
		$(window).resize(function() {
			clearTimeout(window.resizeEvt);
			window.resizeEvt = setTimeout(function() {

				var marginLeft = (parseInt($('.content').css('margin-right'), 10) / myObj.getDisplayInfo().width) * 100;

				$('.content').css('margin-left', marginLeft + '%');

			}, 10);
		});
	});*/
	
	
	/*$(window).bind('resize', function(e) {
		window.resizeEvt;
		$(window).resize(function() {
			clearTimeout(window.resizeEvt);
			window.resizeEvt = setTimeout(function() {

				var marginLeft = (parseInt($('.content').css('margin-right'), 10) / myObj.getDisplayInfo().width) * 100;
				$('.content').animate({
					'margin-left' : marginLeft + '%'
				}, 100);

				$('.content').css('margin-left', marginLeft + '%');

			}, 50);
		});
	});
*/
	$('.pin-i').click(function() {
		$(this).toggleClass('pin-press');
		if ($(this).hasClass('pin-press')) {
			$(this).css('color', 'red');
			$('.sidebar-effect').hide();
		} else {
			$(this).css('color', '#9B64D7');
			$('.sidebar-effect').show();
		}
	});

	// user-info 컨트롤
	$('.fa-user-circle').parent().click(function() {
		myObj.userInfoToggle();
	});
	$('.user-info-effect').click(function() {
		myObj.userInfoToggle();
	});

	// 메뉴바 show
	$('.gnb-menu').click(function() {

		if ($('.pin-press').length > 0) return;
		myObj.slideUpSubMenu();
		myObj.toggleMenuBar();

	});

	// 메뉴바 숨기기
	$('.sidebar-effect').click(function() {
		myObj.toggleMenuBar();
		// $('.user-info-box').hide();
	});

	// sidebar 메뉴아이템 클릭 처리
	$('.sidebar-menu-item').each(function(idx, obj) {
		$(this).click(function() {
			// note! target Object // 처리할 Dom 담기
			var $target = $(this).find('.menu-arrow-right');

			if ($target.hasClass('fa-angle-down')) {
				myObj.slideUpSubMenu($target);
				return;
			}
			myObj.slideDownSubMenu($(this));

			$target.toggleClass('fa-angle-right');
			$target.toggleClass('fa-angle-down');
		});
	});

	// 메뉴바 처리 객체
	var myObj = new function() {

		this.toggleMenuBar = function() {
			// note! target Object // 처리할 Dom 담기
			$('.sidebar-nav-box').toggleClass('menu-bar-visible');
			myObj.contentResize();
		}
		this.contentResize = function() {
			var $target = $('.sidebar-nav-box');
			var $content = $('.content');
			if ($target.hasClass('menu-bar-visible')) {
				$target.animate({
					left : '0px',
					opacity : '1'
				}, 250);

				$('.sidebar-effect').show();

			/*	var sidebar_width = parseInt($('.sidebar-nav-box').css('width'), 10);
				var marginLeft = sidebar_width * 0.65 + parseInt($('.content').css('margin-right'), 10);

				if (marginLeft < sidebar_width + 50) {
					marginLeft = sidebar_width + 50;
				}
				console.log("dd", marginLeft);

				$content.animate({
					'margin-left' : marginLeft + 'px'
				}, 250);*/

			} else {
				$('.sidebar-effect').hide();

				$target.animate({
					left : '-250px',
					opacity : '0'
				}, 250);

				/*var marginLeft = (parseInt($('.content').css('margin-right'), 10) / myObj.getDisplayInfo().width) * 100;
				$content.animate({
					'margin-left' : marginLeft + '%'
				}, 250);*/
			}

		}
		this.userInfoToggle = function() {
			var $target = $('.user-info-box');
			$target.toggleClass('user-info-show');
			if ($target.hasClass('user-info-show')) {
				$target.show();
				$('.user-info-effect').show();
			} else {
				$target.hide();
				$('.user-info-effect').hide();
			}
		}
		this.slideDownSubMenu = function(obj) {
			// obj 는 a태그
			if (obj.siblings().length <= 0)
				return;
			else {
				// a태크 형제 ul 서브 메뉴 찾아 처리
				var $target = obj.next();
				$target.addClass('submenu-open');
				$target.slideDown(150);
			}
		}

		this.getDisplayInfo = function() {
			var size = {
				width : window.innerWidth || document.body.clientWidth,
				height : window.innerHeight || document.body.clientHeight
			}
			return size;
		}

		this.slideUpSubMenu = function(arg) {
			// arg with 'menu-arrow-right' class
			if (arg != null) {
				var $tag_a = $(arg).parent();// a태그
				var $tag_ul = $tag_a.next();

				if ($tag_ul.hasClass("submenu-open")) {
					$tag_ul.removeClass("submenu-open");
					$tag_ul.slideUp(150);

					if (arg.hasClass('fa-angle-down')) {
						arg.removeClass('fa-angle-down');
						arg.addClass('fa-angle-right');
					}
				}
			} else {
				// submenu 앞에 ul없으면 실행 오작동 남 .. 이유는 모르겠음.
				$('ul.submenu').each(function(i, obj) {
					if ($(obj).hasClass("submenu-open")) {
						$(obj).removeClass("submenu-open");
						$(obj).slideUp(150);

						var $target = $(obj).prev().find('.menu-arrow-right');
						if ($target.hasClass('fa-angle-down')) {
							$target.removeClass('fa-angle-down');
							$target.addClass('fa-angle-right');
						}
					}
				});// $('ul.submenu').each()
			}
		}// this.slideUpSubMenu = function()
	}// var myObj = new function()
});