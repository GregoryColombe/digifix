// 1. Vars and Inits
// 2. Set Header
// 3. Init Search
// 4. Init Menu
// 5. Init Google Map

$(document).ready(function () {
    "use strict";

    // 1. Vars and Inits

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

    initMenu();
    initMap();

    // 2. Set Header

    function setHeader() {
        if ($(window).scrollTop() > 100) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
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

    function initMap() {
        
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ3JlZ29yeWNvbG9tYmUiLCJhIjoiY2sxdWY0bXJyMDV2bDNjcW1rdnI5azM4byJ9.6csVhKC7yWAmHFl6OmFBCw';
        let map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [2.4415278, 48.861928],
            zoom: 15,
            language: "fr-FR",
        });

        map.on('load', function () {
            // Load an image from an external URL.
            map.loadImage(
                "../images/logo2.png",
                function (error, image) {
                    if (error) throw error;

                    // Add the image to the map style.
                    map.addImage('digifix-logo', image);

                    // Add a data source containing points features.
                    map.addSource('point-montreuil', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [{
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [2.4415278, 48.861928]
                                },
                            }]
                        }
                    });
                    map.addSource('point-puteaux', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [{
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [2.2385817, 48.8815513]
                                }
                            }]
                        }
                    });


                    // Add layers to use the image to represent the data.
                    map.addLayer({
                        'id': 'points-montreuil',
                        'type': 'symbol',
                        'source': 'point-montreuil',
                        'layout': {
                            'icon-image': 'digifix-logo',
                            'icon-size': 0.85
                        }
                    });
                    map.addLayer({
                        'id': 'points-puteaux',
                        'type': 'symbol',
                        'source': 'point-puteaux',
                        'layout': {
                            'icon-image': 'digifix-logo',
                            'icon-size': 0.85
                        }
                    });
                }
            );
        });
    }
});