Neighborhood Maps Project
==================
#####Udacity FE Web Developer Nanodegree - Project 5#####
---

Contents
--------

1. [How to Run / Test](#chapter-1)  
2. [User Guide](#chapter-2)  
3. [APIs Used](#chapter-3)    
4. [Additional Notes](#chapter-4)    

How to Run / Test <a id="chapter-1"></a>
-----------------
There are two ways for you to demo the Neighborhood Maps application:    

1. Simply visit the [live version](http://www.vincentmaling.com/np/maptest.html "Neighborhood Maps") hosted on my web server.  
2. Download the Git ZIP, extract, and run maps.html on your favorite browser. 

The application has been fully tested on Chrome, Firefox, Internet Explorer, Android Default Browser, and Chrome Mobile. It runs on desktops, tablets and smartphones.  

**NOTE:** If you intend to run the application on IE, I'd recommend option (1) above to avoid having to host the PHP file from your local machine. See [Additional Notes](#chapter-4).

User Guide <a id="chapter-2"></a>
----------
![Desktop Screenshot](https://github.com/vincemaling/FE-Web-Dev-Nano-P5/blob/master/images/screenshot%20-%20desktop%20-%20small.png) 
![Mobile Screenshot](https://github.com/vincemaling/FE-Web-Dev-Nano-P5/blob/master/images/screenshot%20-%20mobile%20-%20small.png)  

<dl><dt>(1) Neighborhood Selector</dt>
<dd>I designed the application so that multiple neighborhoods could be loaded and (theoretically) added and removed. By default, three neighborhoods are included: Lindbergh (Atlanta), Shaker Heights (Cleveland), and Cabbagetown (Atlanta). On the desktop version of the application, you can select your neighborhood using the tabs in the top-left. On the mobile version, tapping the neighborhood name drops down a list of neighborhoods to select from.<dd>  

<dt>(2) Weather Widget</dt>
<dd>The Weather Widget displays a snapshot of the current weather conditions in the neighborhood you have selected. In the desktop version of the application, you can hover over the widget with your mouse for additional details. The Weather Widget uses the Open Weather API.</dd>  

<dt>(3) Dynamic Yelp! Search</dt>
<dd>The applications will begin to conduct searches against Yelp's database as soon as you start typing. As you type, results will be displayed both in the search result list view, and on the map. Note that in the mobile version of the application, you'll need to use the menu icons in the top-right to toggle between map view and search list view (see #8 below).</dd>

<dt>(4) Search List View (Desktop)</dt>
<dd>As search results populate, they will appear in the search list view on the left-hand side of your screen. The list view includes location names, a Yelp rating, and a typical user review. When you click on an item in the search list view, the map will pan to its location and additional data will be displayed.</dd>

<dt>(5) Favorites View (Desktop)</dt>
<dd>If you like a particular business, you can save it as a favorite. Favorites are displayed as hearts on your map, and are also included in a list view on the left-hand side of your screen. When you click on an item in the search list view, the map will pan to its location and additional data will be displayed.</dd>

<dt>(6) Google Map View</dt>
<dd>All of your search results and favorites are displayed on the Google map that takes up most of your screen. You can select a search result or favorite directly from the map to view more information.</dd>

<dt>(7) Location Info Box with Streetview</dt>
<dd>When a search item or favorite is selected, an info box appears. The info box contains additional information about the business as well as links to its Yelp page and a Google Streetview image. You can also add and remove favorites from the info box.</dd>  

<dt>(8) Menu Selectors (Mobile)</dt>
<dd>Although the Google Map is the default view in the mobile version of the application, you can access a drop-down list view of search results or favorites by clicking the corresponding icon in the top-right of the screen. Clicking the icon again (or clicking another icon) dismisses the view.</dd></dl>

![Mobile Search List](https://github.com/vincemaling/FE-Web-Dev-Nano-P5/blob/master/images/mobile-search-list.png)
![Mobile Favorites List](https://github.com/vincemaling/FE-Web-Dev-Nano-P5/blob/master/images/mobile-favorites-list.png)

APIs Used <a id="chapter-3"></a>
---------
<dl><dt>Google Maps API</dt>
<dd>I used the Google Maps API to create the map that serves as the primary application view in both the desktop and mobile version of the application. I wrote custom Knockout JS binding handlers that link the markers on the map (both search results and favorites) to observable arrays.</dd>  

<dt>Yelp! API</dt>
<dd>Of all the business search APIs I researched, Yelp was my favorite. The Yelp Development Guide recommends creating a server-side script (e.g. in PHP) to handle AJAX calls rather than making calls directly from Javascript, so I wrote a PHP script that the application calls (see the PHP folder in this Github project). I used the Yelp API to retrieve rating, review, and location information about businesses.</dd>

<dt>Open Weather</dt>
<dd>Open Weather is a simple, open-source API that I used to create Weather Widgets for the various neighborhoods. An initial AJAX call (at app start-up) fetches the weather information for each neighborhood from Open Weather. That information is then data-bound to the neighborhood selector (via Knockout) so that the appropriate weather is displayed when the user toggles between neighborhoods.</dd>

<dt>Google Streetview</dt>
<dd>This simple API (which doesn't even require AJAX) was used to add Streetview images for each of the locations in the search and/or favorites arrays.</dd></dl>

Additional Notes <a id="chapter-4"></a>
----------------
Libraries used in this application included:  
- Knockout JS
- jQuery
- Bootstrap

I also learned quite a bit about custom Knockout JS data binding by reviewing [this very helpful article] (http://www.codeproject.com/Articles/351298/KnockoutJS-and-Google-Maps-binding "KnockoutJS and Google Maps Binding").  

Finally, I should note that the Development Guide for the Yelp API encourages developers to use a server-side script (e.g. PHP) rather than Javascript. I followed this advice and created my own PHP script, which I've included in this project (under the PHP folder).  

Because Internet Explorer does not accept cross-origin browser requests, if you want to demo this application in IE you'll need to either (1) install the PHP script on your server (or whichever server you plan to run the project from), or (2) simply use the live link I've provided at the top of this article.

