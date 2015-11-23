// Initialize your app
var myApp = new Framework7({
    material: true,
    swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    swipePanel: 'left'
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

var socket = io();
var currentLightButton = null;
var previousLightButton = null;
var currentAlarmButton = null;
$$('.lightToggleButton').on("click", function(){
    socket.emit('switch on', $$(this).attr('id'));
});

$$('.alarmToggleButton').on("click", function(){
    socket.emit('alarm on', $$(this).attr('id'));
})

socket.on('update', function(currentLights, currentAlarm){
    previousLightButton = currentLightButton;
    currentLightButton = $$('#' + currentLights);
    if(previousLightButton == null || !(currentLightButton.attr('id') == previousLightButton.attr('id'))){
        if(previousLightButton!=null)
            previousLightButton.html(previousLightButton.attr('id') + '%');
        $$('#' + currentLights).append('<div style="float:right; margin-top:7px;" class="chip"><div class="chip-label">Active</div></div>');
    }
    if(currentAlarm == "arm" && currentAlarmButton==null){
        $$('#arm').append('<div style="float:right; margin-top:7px;" class="chip"><div class="chip-label">Active</div></div>');
    }else if(currentAlarm == "disarm" && currentAlarmButton==null){
        $$('#disarm').append('<div style="float:right; margin-top:7px;" class="chip"><div class="chip-label">Active</div></div>');
    }else if(currentAlarm == "arm" && currentAlarmButton!=currentAlarm){
        $$('#disarm').html('Disarm');
        $$('#arm').append('<div style="float:right; margin-top:7px;" class="chip"><div class="chip-label">Active</div></div>');
    }else if(currentAlarm == "disarm" && currentAlarmButton!=currentAlarm){
        $$('#arm').html('Arm');
        $$('#disarm').append('<div style="float:right; margin-top:7px;" class="chip"><div class="chip-label">Active</div></div>');
    }
    currentAlarmButton = currentAlarm;
});