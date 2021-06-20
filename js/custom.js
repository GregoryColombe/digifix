$(document).ready(function () {
    "use strict";
    var header = $('.header');
    var hambActive = false;
    var menuActive = false;
    setHeader();
    $(window).on('resize', function () {
        setHeader();
    });
    $(document).on('scroll', function () {
        setHeader();
    });
    initHomeSlider();
    initMenu();

    function setHeader() {
        if ($(window).scrollTop() > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    }

    function initHomeSlider() {
        if ($('.home_slider').length) {
            var homeSlider = $('.home_slider');
            homeSlider.owlCarousel({
                items: 1,
                autoplay: true,
                autoplayTimeout: 10000,
                smartSpeed: 1200,
                dotsSpeed: 1200,
                fluidSpeed: 1200,
                loop: true,
                nav: false
            });
            if ($('.home_slider_custom_dot').length) {
                $('.home_slider_custom_dot').on('click', function () {
                    $('.home_slider_custom_dot').removeClass('active');
                    $(this).addClass('active');
                    homeSlider.trigger('to.owl.carousel', [$(this).index(), 1200]);
                });
            }
            homeSlider.on('changed.owl.carousel', function (event) {
                $('.home_slider_custom_dot').removeClass('active');
                $('.home_slider_custom_dots li').eq(event.page.index).addClass('active');
            });

            function setAnimation(_elem, _InOut) {
                var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                _elem.each(function () {
                    var $elem = $(this);
                    var $animationType = 'animated ' + $elem.data('animation-' + _InOut);
                    $elem.addClass($animationType).one(animationEndEvent, function () {
                        $elem.removeClass($animationType);
                    });
                });
            }
            homeSlider.on('change.owl.carousel', function (event) {
                var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-out]");
                setAnimation($elemsToanim, 'out');
            });
            homeSlider.on('changed.owl.carousel', function (event) {
                var $currentItem = $('.home_slider_item', homeSlider).eq(event.item.index);
                var $elemsToanim = $currentItem.find("[data-animation-in]");
                setAnimation($elemsToanim, 'in');
            })
        }
    }

    function initMenu() {
        if ($('.hamburger').length) {
            var hamb = $('.hamburger');
            hamb.on('click', function (event) {
                event.stopPropagation();
                if (!menuActive) {
                    openMenu();
                    $(document).one('click', function cls(e) {
                        if ($(e.target).hasClass('menu_mm')) {
                            $(document).one('click', cls);
                        } else {
                            closeMenu();
                        }
                    });
                } else {
                    $('.menu').removeClass('active');
                    menuActive = false;
                }
            });
            if ($('.page_menu_item').length) {
                var items = $('.page_menu_item');
                items.each(function () {
                    var item = $(this);
                    item.on('click', function (evt) {
                        if (item.hasClass('has-children')) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            var subItem = item.find('> ul');
                            if (subItem.hasClass('active')) {
                                subItem.toggleClass('active');
                                TweenMax.to(subItem, 0.3, {
                                    height: 0
                                });
                            } else {
                                subItem.toggleClass('active');
                                TweenMax.set(subItem, {
                                    height: "auto"
                                });
                                TweenMax.from(subItem, 0.3, {
                                    height: 0
                                });
                            }
                        } else {
                            evt.stopPropagation();
                        }
                    });
                });
            }
        }
    }

    function openMenu() {
        var fs = $('.menu');
        fs.addClass('active');
        hambActive = true;
        menuActive = true;
    }

    function closeMenu() {
        var fs = $('.menu');
        fs.removeClass('active');
        hambActive = false;
        menuActive = false;
    }
});