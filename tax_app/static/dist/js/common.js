
(function ($) {
    "use strict";

    /*================ Background Image Maker ======================*/

    $('.background-image-maker').each(function () {
        var imgURL = $(this).next('.holder-image').find('img').attr('src');
        $(this).css('background-image', 'url(' + imgURL + ')');
    });

/*========================= Dynamic Field ======================*/

    var bookIndex = 0;

    $('#bookForm')

            // Add button click handler
            .on('click', '.addButton', function () {
                bookIndex++;
                var $template = $('#bookTemplate'),
                        $clone = $template
                        .clone()
                        .removeClass('hide')
                        .removeAttr('id')
                        .attr('data-book-index', bookIndex)
                        .insertBefore($template);

                // Update the name attributes
                $clone
                        .find('[name="title"]').attr('name', 'book[' + bookIndex + '].title').end()
                        .find('[name="isbn"]').attr('name', 'book[' + bookIndex + '].isbn').end()
                        .find('[name="price"]').attr('name', 'book[' + bookIndex + '].price').end();

            })

            // Remove button click handler
            .on('click', '.removeButton', function () {
                var $row = $(this).parents('.form-group');

                // Remove element containing the fields
                $row.remove();
            });
/*==============================================================
     Tab Next Previous 
     ============================================================= */
    $('.tab-next').on('click', function () {        
     
        var $tab= $(this).attr('data-tab');
        $('.'+$tab).click();
        return false;

    });
    /*==============================================================
     Sidechat 
     ============================================================= */
    $('.setting').on('click', function () {
        $('#sidechat').toggleClass('active');

    });
    /*==============================================================
     Sidebar 
     ============================================================= */

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#content').toggleClass('active');
    });
    $('#menu').metisMenu().show();

    /*==============================================================
     Back To Top
     =============================================================*/


    $('.scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
/*==============================================================
 Counter
 =============================================================*/
$('.counter_number').counterUp({
    delay: 1,
    time: 1600
});
/*==============================================================
 Masonry
 =============================================================*/

    var $container = $('.portfolio-box');
    $container.imagesLoaded(function () {
        $container.masonry({
            columnWidth: '.post',
            itemSelector: '.post'
        });
    });

    //Reinitialize masonry inside each panel after the relative tab link is clicked - 
    $('a[data-toggle=tab]').each(function () {
        var $this = $(this);
        $this.on('shown.bs.tab', function () {
            $container.masonry({
                columnWidth: '.post',
                itemSelector: '.post'
            });
        }); //end shown
    });  //end each

/*==============================================================
 Editable table
 =============================================================*/

    var clients = [
        {"Name": "Eddy lobonowsky", "Work": "Perform Cms", "date": "1 year ago", "Teg": "Design"},
        {"Name": "Kerem Suar", "Work": "Backup data base", "date": "5 min ago", "Teg": "Meeting"},
        {"Name": "Jawod $", "Work": "Month Report", "date": "1 days ago", "Teg": "Project"},
        {"Name": "Julien", "Work": "Account Password", "date": "2 year ago", "Teg": "Income"},
        {"Name": "Eddy lobonowsky", "Work": "Perform Cms", "date": "1 year ago", "Teg": "Design"},
        {"Name": "Kerem Suar", "Work": "Backup data base", "date": "5 min ago", "Teg": "Meeting"},
    ];

    $("#jsGrid").jsGrid({
        width: "100%",
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        data: clients,
        fields: [
            {name: "Name", type: "text", width: 180, validate: "required"},
            {name: "Work", type: "text", width: 150},
            {name: "date", type: "text", width: 100},
            {name: "Teg", type: "text", width: 100},
            {type: "control", width: 100}
        ]
    });
/*==============================================================
 Slimscroll Chat
 =============================================================*/
  
        $('.scrollerchat').slimScroll({
            height: '456px'
        });

 
        $('.sidebar-scrollarea').slimScroll({
            height: '100vh'
        });
   
    $('#mysideTabContent').slimScroll({
        height: '100vh'
    });

/*==============================================================
 Testimonial
 =============================================================*/
    $("#testimonial").owlCarousel({
        items: 1,
        pagination: true,
        autoPlay: false
    });


/*==============================================================
 Image Lightbox Gallery
 =============================================================*/
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

/*==============================================================
 Table Progress
 =============================================================*/

    $('.progress').barfiller({barColor: '#1e1e1e'});


/*==============================================================
 Data Table Js
 =============================================================*/

    $('#example').DataTable();


/*==============================================================
 DropZone 
 =============================================================*/


    $('#dropzone').on('dragover', function () {
        $(this).addClass('hover');
    });

    $('#dropzone').on('dragleave', function () {
        $(this).removeClass('hover');
    });

    $('#dropzone input').on('change', function (e) {
        var file = this.files[0];

        $('#dropzone').removeClass('hover');

        if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
            return alert('File type not allowed.');
        }

        $('#dropzone').addClass('dropped');
        $('#dropzone img').remove();

        if ((/^image\/(gif|png|jpeg)$/i).test(file.type)) {
            var reader = new FileReader(file);

            reader.readAsDataURL(file);

            reader.onload = function (e) {
                var data = e.target.result,
                        $img = $('<img />').attr('src', data).fadeIn();

                $('#dropzone div').html($img);
            };
        } else {
            var ext = file.name.split('.').pop();

            $('#dropzone div').html(ext);
        }
    });

/*==============================================================
 Calendar
 =============================================================*/
$('#calendar-demo').dcalendar(); //creates the calendar

/*==============================================================
 Jq-Meter Progress Bar 
 =============================================================*/

    $('#jqmeter-horizontal').jQMeter({goal: '$10,000', raised: '9000', width: '100%', height: '10px', barColor: '#1e1e1e', animationSpeed: 1000, displayTotal: false});
    $('#jqmeter-horizonta2').jQMeter({goal: '$10,000', raised: '8000', width: '100%', height: '10px', bgColor: '#e1e1e1', animationSpeed: 1000, displayTotal: false});
    $('#jqmeter-horizonta3').jQMeter({goal: '$10,000', raised: '7000', width: '100%', height: '10px', bgColor: '#e1e1e1', animationSpeed: 1000, displayTotal: false});
    $('#jqmeter-horizonta4').jQMeter({goal: '$10,000', raised: '6000', width: '100%', height: '10px', barColor: '#1e1e1e', animationSpeed: 1000, displayTotal: false});
    $('#jqmeter-horizonta5').jQMeter({goal: '$10,000', raised: '5000', width: '100%', height: '10px', bgColor: '#e1e1e1', animationSpeed: 1000, displayTotal: false});
    $('#jqmeter-horizonta6').jQMeter({goal: '$10,000', raised: '4000', width: '100%', height: '10px', bgColor: '#e1e1e1', animationSpeed: 1000, displayTotal: false});
    $('#jqmeter-horizonta7').jQMeter({goal: '$10,000', raised: '3000', width: '100%', height: '10px', barColor: '#1e1e1e', animationSpeed: 1000, displayTotal: false});


/*==============================================================
 Line Progress Bar
 =============================================================*/
$('#demoprogressbar1').LineProgressbar({
    percentage: 25,
    fillBackgroundColor: '#1e1e1e',
    height: '5px'
});

$('#demoprogressbar2').LineProgressbar({
    percentage: 15,
    fillBackgroundColor: '#1e1e1e',
    height: '5px'
});

$('#demoprogressbar3').LineProgressbar({
    percentage: 30,
    fillBackgroundColor: '#1e1e1e',
    height: '5px'
});

$('#demoprogressbar4').LineProgressbar({
    percentage: 5,
    fillBackgroundColor: '#1e1e1e',
    height: '5px'
});



/*==============================================================
 Map
 =============================================================*/
        //Map
        $('#world-map').vectorMap({
            map: 'world_mill_en',
            scaleColors: ['#666', '#35528c'],
            normalizeFunction: 'polynomial',
            focusOn: {
                x: 0.5,
                y: 0.5,
                scale: 1.0
            },
            zoomMin: 0.85,
            markerStyle: {
                initial: {
                    fill: '#0c3de3',
                    stroke: '#0c3de3',
                }
            },
            backgroundColor: '#fff',
            regionStyle: {
                initial: {
                    fill: '#2e5aef',
                    "fill-opacity": 1,
                    stroke: '#2e5aef',
                    "stroke-width": 0,
                    "stroke-opacity": 0
                },
                hover: {
                    "fill-opacity": 0.8
                },
                selected: {
                    fill: 'yellow'
                }
            },
            markers: [
                //http://www.latlong.net/
                {latLng: [51.507351, -0.127758], name: 'London'},
                {latLng: [41.385064, 2.173403], name: 'Barcelona'},
                {latLng: [40.712784, -74.005941], name: 'New York'},
                {latLng: [-22.911632, -43.188286], name: 'Rio De Janeiro'},
                {latLng: [49.282729, -123.120738], name: 'Vancuver'},
                {latLng: [35.689487, 139.691706], name: 'Tokio'},
                {latLng: [55.755826, 37.617300], name: 'Moskva'},
                {latLng: [43.214050, 27.914733], name: 'Varna'},
                {latLng: [30.044420, 31.235712], name: 'Cairo'}
            ]
        });

/*==============================================================
 Spark LIne Chart
 =============================================================*/
    $(".spark1").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line',
        width: '178',
        height: '40',
        lineColor: '#2347fc',
        fillColor: 'transparent',
        lineWidth: 2,
        spotColor: 'transparent',
        minSpotColor: 'transparent',
        maxSpotColor: 'transparent'
    });

    $(".spark2").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line',
        width: '178',
        height: '40',
        lineColor: '#06c8e3',
        fillColor: 'transparent',
        lineWidth: 2,
        spotColor: 'transparent',
        minSpotColor: 'transparent',
        maxSpotColor: 'transparent'
    });

    $(".spark3").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line',
        width: '178',
        height: '40',
        lineColor: '#9d0fea',
        fillColor: 'transparent',
        lineWidth: 2,
        spotColor: 'transparent',
        minSpotColor: 'transparent',
        maxSpotColor: 'transparent'
    });

    $(".spark4").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line',
        width: '100',
        height: '21',
        lineColor: '#426af1',
        fillColor: 'transparent',
        lineWidth: 2,
        spotColor: 'transparent',
        minSpotColor: 'transparent',
        maxSpotColor: 'transparent'
    });

    $(".spark5").sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line',
        width: '100',
        height: '21',
        lineColor: '#fff',
        fillColor: 'transparent',
        lineWidth: 2,
        spotColor: 'transparent',
        minSpotColor: 'transparent',
        maxSpotColor: 'transparent'
    });

    $(".spark6").sparkline([70, 60, 65, 60, 50, 60, 70], {
        type: 'bar',
        barWidth: 3,
        barSpacing: 10,
        height: '66',
        barColor: '#426af1'});

    $(".spark7").sparkline([70, 60, 65, 60, 50, 60, 70], {
        type: 'bar',
        barWidth: 3,
        barSpacing: 10,
        height: '66',
        barColor: '#e0276a'});

    $(".spark8").sparkline([70, 60, 65, 60, 50, 60, 70], {
        type: 'bar',
        barWidth: 3,
        barSpacing: 10,
        height: '66',
        barColor: '#009f3c'});

    $(".spark9").sparkline([70, 60, 65, 60, 50, 60, 70], {
        type: 'bar',
        barWidth: 3,
        barSpacing: 10,
        height: '66',
        barColor: '#3fbcef'});

    $(".spark10").sparkline([70, 60, 65, 60, 50, 60, 70], {
        type: 'bar',
        barWidth: 3,
        barSpacing: 10,
        height: '66',
        barColor: '#fff'});

    $(".spark11").sparkline([55, 45, 35, 25, 40, 15, 25, 35, 45, 55, 55, 45, 35, 25, 40, 15, 25, 35, 45, 55], {
        type: 'bar',
        barWidth: 2,
        height: '24',
        barColor: '#426af1'});

    $(".spark12").sparkline([55, 45, 35, 25, 40, 15, 25, 35, 45, 55, 55, 45, 35, 25, 40, 15, 25, 35, 45, 55], {
        type: 'bar',
        barWidth: 3,
        height: '24',
        barColor: '#e0276a'});

    $(".spark13").sparkline([55, 45, 35, 25, 40, 15, 25, 35, 45, 55, 55, 45, 35, 25, 40, 15, 25, 35, 45, 55], {
        type: 'bar',
        barWidth: 3,
        height: '24',
        barColor: '#009f3c'});

    $(".spark14").sparkline([55, 45, 35, 25, 40, 15, 25, 35, 45, 55, 55, 45, 35, 25, 40, 15, 25, 35, 45, 55], {
        type: 'bar',
        barWidth: 3,
        height: '24',
        barColor: '#3fbcef'});

/*==============================================================
 Form Text Editor
 =============================================================*/

    $('.summernote').summernote();
    var edit = function () {
        $('.click2edit').summernote({focus: true});
    };
    var save = function () {
        var aHTML = $('.click2edit').code(); //save HTML If you need(aHTML: array).
        $('.click2edit').destroy();
    };

/*==============================================================
 Toastr Alert Js
 =============================================================*/
    toastr.options = {
        "debug": false,
        "newestOnTop": false,
        "positionClass": "toast-bottom-right",
        "closeButton": true,
        "progressBar": true
    };
    $('.homerDemo1').on('click', function (event) {
        toastr.info('Info - <br /> This is a custom info notification');
    });
    $('.homerDemo2').on('click', function (event) {
        toastr.success('Success - <br /> This is a success notification');
    });
    $('.homerDemo3').on('click', function (event) {
        toastr.warning('Warning - <br /> This is a warning notification');
    });
    $('.homerDemo4').on('click', function (event) {
        toastr.error('Error - <br /> This is a error notification');
    });


/*==============================================================
 Tree View Js
 =============================================================*/

    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i');
        }
        e.stopPropagation();
    });

/*==============================================================
 Alert Popup Js
 =============================================================*/
if ($('.sweet-1').length > 0)
{
    document.querySelector('.sweet-1').onclick = function () {
        swal("Here's a message!");
    };
}

if ($('.sweet-2').length > 0)
{
    document.querySelector('.sweet-2').onclick = function () {
        swal("Here's a message!", "It's pretty, isn't it?")
    };
}
if ($('.sweet-3').length > 0)
{
    document.querySelector('.sweet-3').onclick = function () {
        swal("Here's a message!", "Custom HTML Message!!")
    };
}
if ($('.sweet-4').length > 0)
{
    document.querySelector('.sweet-4').onclick = function () {
        swal("Good job!", "You clicked the button!", "success");
    };
}
if ($('.sweet-5').length > 0)
{
    document.querySelector('.sweet-5').onclick = function () {
        swal({
            title: "Are you sure?",
            text: "You clicked the button!",
            type: "info",
            confirmButtonClass: 'btn-primary',
        });
    };
}
if ($('.sweet-6').length > 0)
{
    document.querySelector('.sweet-6').onclick = function () {
        swal({
            title: "Are you sure?",
            text: "You clicked the button!",
            type: "warning",
            confirmButtonClass: 'btn-primary',
        });
    };
}
if ($('.sweet-7').length > 0)
{
    document.querySelector('.sweet-7').onclick = function () {
        swal({
            title: "Are you sure?",
            text: "You clicked the button!",
            type: "error",
            confirmButtonClass: 'btn-primary',
        });
    };
}
if ($('.sweet-8').length > 0)
{
    document.querySelector('.sweet-8').onclick = function () {
        swal({
            title: "Sweet!",
            text: "Here's a custom image.",
            imageUrl: 'dist/images/thumbs-up.jpg'
        });
    };
}
if ($('.sweet-9').length > 0)
{
    document.querySelector('.sweet-9').onclick = function () {
        swal({
            title: "Auto close alert!",
            text: "I will close in 3 seconds.",
            timer: 2000,
            showConfirmButton: true
        });
    };
}
if ($('.sweet-10').length > 0)
{
    document.querySelector('.sweet-10').onclick = function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: 'btn-primary',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
                function (isConfirm) {
                    if (isConfirm) {
                        swal("Deleted!", "Your imaginary file has been deleted!", "success");
                    } else {
                        swal("Cancelled", "Your imaginary file is safe :)", "error");
                    }
                });
    };
}
if ($('.sweet-11').length > 0)
{
    document.querySelector('.sweet-11').onclick = function () {
        swal({
            title: "",
            text: 'Write something interesting:',
            type: 'input',
            showCancelButton: false,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something",
        },
                function (inputValue) {
                    if (inputValue === false)
                        return false;
                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false;
                    }
                    swal("Nice!", 'You wrote: ' + inputValue, "success");
                });
    };
}
if ($('.sweet-12').length > 0)
{
    document.querySelector('.sweet-12').onclick = function () {
        swal({
            title: "Ajax request example",
            text: "Submit to run ajax request",
            type: "info",
            showCancelButton: false,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            setTimeout(function () {
                swal("Ajax request finished!");
            }, 2000);
        });
    };
}
if ($('.sweet-13').length > 0)
{
    document.querySelector('.sweet-13').onclick = function () {
        swal({
            title: "Message",
            text: 'A Custom <span style="color:#2e5aef">Html<span> Message.',
            html: true
        });
    };
}

/*========================================================
 * 
 * Moriss
 */
if ($('#morris-area-chart2').length > 0)
{
    Morris.Area({
        element: 'morris-area-chart2',
        data: [{
                period: '2010',
                SiteA: 0,
                SiteB: 0,
            }, {
                period: '2011',
                SiteA: 130,
                SiteB: 100,
            }, {
                period: '2012',
                SiteA: 80,
                SiteB: 60,
            }, {
                period: '2013',
                SiteA: 70,
                SiteB: 200,
            }, {
                period: '2014',
                SiteA: 180,
                SiteB: 150,
            }, {
                period: '2015',
                SiteA: 105,
                SiteB: 90,
            },
            {
                period: '2016',
                SiteA: 250,
                SiteB: 150,
            }],
        xkey: 'period',
        ykeys: ['SiteA', 'SiteB'],
        labels: ['Site A', 'Site B'],
        pointSize: 0,
        pointStrokeColors: ['#2e5aef', '#0230cb'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 0,
        smooth: false,
        hideHover: 'auto',
        lineColors: ['#2e5aef', '#0230cb'],
        resize: true

    });
}
if ($('#morris-area-chart').length > 0)
{
    /// Morris Line chart
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
                period: '2010',
                iphone: 50,
                ipad: 80,
                itouch: 20
            }, {
                period: '2011',
                iphone: 130,
                ipad: 100,
                itouch: 80
            }, {
                period: '2012',
                iphone: 80,
                ipad: 60,
                itouch: 70
            }, {
                period: '2013',
                iphone: 70,
                ipad: 200,
                itouch: 140
            }, {
                period: '2014',
                iphone: 180,
                ipad: 150,
                itouch: 140
            }, {
                period: '2015',
                iphone: 105,
                ipad: 100,
                itouch: 80
            },
            {
                period: '2016',
                iphone: 250,
                ipad: 150,
                itouch: 200
            }],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iPhone', 'iPad', 'iPod Touch'],
        pointSize: 3,
        fillOpacity: 0,
        pointStrokeColors: ['#2e5aef', '#6881d6', '#16297b'],
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        lineWidth: 1,
        hideHover: 'auto',
        lineColors: ['#2e5aef', '#6881d6', '#16297b'],
        resize: true

    });
}
if ($('#extra-area-chart').length > 0)
{
    // Extra chart
    Morris.Area({
        element: 'extra-area-chart',
        data: [{
                period: '2010',
                iphone: 0,
                ipad: 0,
                itouch: 0
            }, {
                period: '2011',
                iphone: 50,
                ipad: 15,
                itouch: 5
            }, {
                period: '2012',
                iphone: 20,
                ipad: 50,
                itouch: 65
            }, {
                period: '2013',
                iphone: 60,
                ipad: 12,
                itouch: 7
            }, {
                period: '2014',
                iphone: 30,
                ipad: 20,
                itouch: 120
            }, {
                period: '2015',
                iphone: 25,
                ipad: 80,
                itouch: 40
            }, {
                period: '2016',
                iphone: 10,
                ipad: 10,
                itouch: 10
            }
        ],
        lineColors: ['#2e5aef', '#0230cb'],
        xkey: 'period',
        ykeys: ['iphone', 'itouch'],
        labels: ['Site A', 'Site B'],
        pointStrokeColors: ['#2e5aef', '#0230cb'],
        pointSize: 0,
        lineWidth: 0,
        resize: true,
        behaveLikeLine: true,
        gridLineColor: '#e0e0e0',
        hideHover: 'true'
    });
}

/*=========================================================
 * 
 *Chart js
 */
if ($('#placeholder').length > 0)
{
    var ctx1 = document.getElementById("placeholder").getContext("2d");
    var data1 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "transparent",
                strokeColor: "#577bf4",
                pointColor: "#577bf4",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "transparent",
                strokeColor: "#2e5aef",
                pointColor: "#2e5aef",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    var chart1 = new Chart(ctx1).Line(data1, {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: false,
        bezierCurve: false,
        bezierCurveTension: 0.4,
        pointDot: false,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true,
        tooltipCornerRadius: 2,
        scaleOverride: true,
        scaleSteps: 6,
        scaleStepWidth: 20,
        scaleStartValue: 0
    });

}
if ($('#canvas1').length > 0)
{
    var ctx2 = document.getElementById("canvas1").getContext("2d");
    var data2 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "#577bf4",
                strokeColor: "#577bf4",
                highlightFill: "#577bf4",
                highlightStroke: "#577bf4",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "#2e5aef",
                strokeColor: "#2e5aef",
                highlightFill: "#2e5aef",
                highlightStroke: "#2e5aef",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var chart2 = new Chart(ctx2).Bar(data2, {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: false,
        barShowStroke: true,
        barStrokeWidth: 2,
        barDatasetSpacing: 1,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true,
        scaleOverride: true,
        scaleSteps: 6,
        scaleStepWidth: 15,
        scaleStartValue: 0,
        barValueSpacing: 20,
        tooltipCornerRadius: 2
    });

}
if ($('#redar').length > 0)
{
    var ctx3 = document.getElementById("redar").getContext("2d");
    var data3 = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(46,90,239,0.2)",
                strokeColor: "#2e5aef",
                pointColor: "#2e5aef",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(87,123,244,0.2)",
                strokeColor: "#577bf4",
                pointColor: "#577bf4",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    var myRadarChart = new Chart(ctx3).Radar(data3, {
        scaleShowLine: true,
        angleShowLineOut: true,
        scaleShowLabels: false,
        scaleBeginAtZero: true,
        angleLineColor: "rgba(0,0,0,.1)",
        angleLineWidth: 1,
        pointLabelFontFamily: "'Arial'",
        pointLabelFontStyle: "normal",
        pointLabelFontSize: 10,
        pointLabelFontColor: "#666",
        pointDot: false,
        pointDotRadius: 3,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true,
        tooltipCornerRadius: 2,
        scaleOverride: true,
        scaleSteps: 6,
        scaleStepWidth: 15,
        scaleStartValue: 0,
    });
}
if ($('#pie').length > 0)
{
    var ctx4 = document.getElementById("pie").getContext("2d");
    var data4 = [
        {
            value: 300,
            color: "#2e5aef",
            highlight: "#2e5aef",
            label: "Light blue"
        },
        {
            value: 50,
            color: "#577bf4",
            highlight: "#577bf4",
            label: "blue light"
        },
        {
            value: 100,
            color: "#0032d9",
            highlight: "#0032d9",
            label: "Dark Blue"
        }
    ];

    var myPieChart = new Chart(ctx4).Pie(data4, {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        responsive: true,
        tooltipCornerRadius: 2
    });
}

/*===========================================================
 * 
 * Advance Custom Form
 */
//------------- Fancy select -------------//
$('.fancy-select').fancySelect();
//custom templating
$('.fancy-select1').fancySelect({
    optionTemplate: function (optionEl) {
        return optionEl.text() + '<i class="pull-left ' + optionEl.data('icon') + '"></i>';
    }
});

//------------- Select 2 -------------//
$('.select2').select2({placeholder: 'Select state'});

//minumum 2 symbols input
$('.select2-minimum').select2({
    placeholder: 'Select state',
    minimumInputLength: 2
});

// BOOTSTRAP SLIDER CTRL
$('[data-ui-slider]').slider();
// MASKED
$('[data-masked]').inputmask();
/*==============================================================
 Followers Circle
 =============================================================*/
var colors = [
    ['#6a80b2', '#fafafd'], ['#de2c2d', '#fafafd'], ['#06a8eb', '#fafafd'], ['#c62129', '#fafafd'], ['#0179b5', '#fafafd'], ['#e670a2', '#fafafd']
],
        circles = [];

for (var i = 1; i <= 6; i++) {
    if ($('#circles-' + i).length > 0)
    {
        var child = document.getElementById('circles-' + i),
                percentage = 25 + (i * 9),
                circle = Circles.create({
                    id: child.id,
                    value: percentage,
                    radius: getWidth(),
                    width: 15,
                    colors: colors[i - 1]
                });
        circles.push(circle);
    }
}
window.onresize = function (e) {
    for (var i = 0; i < circles.length; i++) {
        circles[i].updateRadius(getWidth());
    }
};

function getWidth() {
    return window.innerWidth / 20;
}

/*======================
 * Google Map
 */
if ($('#markermap').length > 0)
{
    map = new GMaps({
        el: '#markermap',
        lat: 34.043333,
        lng: -78.028333

    });
    map.addMarker({
        lat: 34.042,
        lng: -78.028333,
        title: 'Marker with InfoWindow',
        infoWindow: {
            content:
                    '\<div class="p-2">' +
                    '<h5 class="redial-font-weight-700 mb-2">New York</h5>' +
                    '<ul class="list-unstyled redial-line-height-2_5 mb-0">' +
                    '<li><i class="fa fa-location-arrow pr-2"></i> 15 New York City</li>' +
                    '<li><i class="fa fa-phone pr-2"></i> +01-4567-65678</li>' +
                    '<li><i class="fa fa-clock-o pr-2"></i> Timing: 10am To 5pm  -  Sunday Closed</li>' +
                    '</ul>' +
                    '</div>'
        }
    });
}



    $(window).on("scroll", function () {
        /*==============================================================
         Back To Top
         =============================================================*/
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }

        /*==============================================================
         Header Fixed Scroll
         =============================================================*/
        if ($(window).scrollTop() > 0) {
            $("#header-fix").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
            $("#header-fix").removeClass("active");
        }
    });

})(jQuery);







