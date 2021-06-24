// 1. Vars and Inits
// 2. Set Header
// 3. Init Search
// 4. Init Menu
// 5. Init Google Map

$(document).ready(function () {
    "use strict";

    let header = $('.header');
    let hambActive = false;
    let menuActive = false;
    let map;

    setHeader();

    $(window).on('resize', function () {
        setHeader();
    });

    $(document).on('scroll', function () {
        setHeader();
    });

    initSearch();
    initMenu();
    initGoogleMap();

    // 2. Set Header

    function setHeader() {
        if ($(window).scrollTop() > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    }

    // 3. Init Search

    function initSearch() {
        if ($('.search').length && $('.search_panel').length) {
            let search = $('.search');
            let panel = $('.search_panel');

            search.on('click', function () {
                panel.toggleClass('active');
            });
        }
    }

    // 4. Init Menu

    function initMenu() {
        if ($('.hamburger').length) {
            let hamb = $('.hamburger');

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

            //Handle page menu
            if ($('.page_menu_item').length) {
                let items = $('.page_menu_item');
                items.each(function () {
                    let item = $(this);

                    item.on('click', function (evt) {
                        if (item.hasClass('has-children')) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            let subItem = item.find('> ul');
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
        let fs = $('.menu');
        fs.addClass('active');
        hambActive = true;
        menuActive = true;
    }

    function closeMenu() {
        let fs = $('.menu');
        fs.removeClass('active');
        hambActive = false;
        menuActive = false;
    }


    // 5. Init Google Map
    
    function initGoogleMap() {
        const defaultPosition = new google.maps.LatLng(48.86192797558556, 2.3618762179900044);
        const digifixPuteaux = new google.maps.LatLng(48.862725, 2.287592);
        const digifixMontreuil = new google.maps.LatLng(48.861928, 2.4415278);
        
        let mapOptions = {
            center: digifixPuteaux,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable: true,
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
            styles: [{
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#e9e5dc"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "weight": 1.5
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "weight": 1
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#fa9e25"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#e49307"
                    }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "weight": 0.5
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d9d4ca"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                }
            ]
        }

        // Initialize a map with options
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Marker Digifix
        const image = "../images/logo2.png";
        let myMarkerOptions = {
            position: digifixPuteaux,
            map: map,
            icon: image,
        }

        let myMarkerPuteau = new google.maps.Marker(myMarkerOptions);

        let myMarkerOptions2 = {
            position: digifixMontreuil,
            map: map,
            icon: image,
        }
        let myMarkerMontreuil = new google.maps.Marker(myMarkerOptions2);

        // Re-center map after window resize
        google.maps.event.addDomListener(window, 'resize', function () {
            setTimeout(function () {
                google.maps.event.trigger(map, "resize");
                // map.setCenter(digifixPuteaux);
            }, 500);
        });
    }

});