Neighborhood Maps Project
==================
#####Udacity FE Web Developer Nanodegree - Project 5#####
---

Contents
--------

1. How to Run / Test  
2. User Guide  
3. APIs Used  
4. Additional Notes  

How to Run / Test
-----------------
There are two ways for you to demo the Neighborhood Maps application:    

1. Simply visit the [live version](http://www.vincentmaling.com/np/maptest.html "Neighborhood Maps") hosted on my web server.  
2. Download the Git ZIP, extract, and run maps.html on your favorite browser. 

The application has been fully tested on Chrome, Firefox, IE 11, and Android Default Browser. It runs on desktops, tablets and mobile devices like smartphones.
NOTE: If you intend to run the application on IE, I'd recommend option 1 above to avoid having to host the PHP file from your local machine. See Additional Notes.

User Guide
----------
![Desktop Screenshot](https://github.com/vincemaling/FE-Web-Dev-Nano-P5/blob/master/images/screenshot%20-%20desktop%20-%20small.png) 
![Mobile Screenshot](https://github.com/vincemaling/FE-Web-Dev-Nano-P5/blob/master/images/screenshot%20-%20mobile%20-%20small.png)  

**(1) Neighborhood Selector**  
I designed the application so that multiple neighborhoods could be loaded and (theoretically) added and removed. By default, three neighborhoods are included: Lindbergh (Atlanta), Shaker Heights (Cleveland), and Cabbagetown (Atlanta). On the desktop version of the application, you can select your neighborhood using the tabs in the top-left. On the mobile version, tapping the neighborhood name drops down a list of neighborhoods to select from.  

**(2) Weather Widget**  
The Weather Widget displays a snapshot of the current weather conditions in the neighborhood you have selected. In the desktop version of the application, you can hover over the widget with your mouse for additional details. The Weather Widget uses the Open Weather API.  

**(3) Dynamic Yelp! Search**  
The applications will begin to conduct searches against Yelp's database as soon as you start typing. As you type, results will be displayed both in the search result list view, and on the map. Note that in the mobile version of the application, you'll need to use the menu icons in the top-right to toggle between map view and search list view (see #8 below).    

**(4) Search List View (Desktop)**  
As search results populate, they will appear in the search list view on the left-hand side of your screen. The list view includes location names, a Yelp rating, and a typical user review. When you click on an item in the search list view, the map will pan to its location and additional data will be displayed.

**(5) Favorites View (Desktop)**  
If you like a particular business, you can save it as a favorite. Favorites are displayed as hearts on your map, and are also included in a list view on the left-hand side of your screen. When you click on an item in the search list view, the map will pan to its location and additional data will be displayed.  

**(6) Google Map View**  
: All of your search results and favorites are displayed on the Google map that takes up most of your screen. You can select a search result or favorite directly from the map to view more information.  

**(7) Location Info Box with Streetview**  
: When a search item or favorite is selected, an info box appears. The info box contains additional information about the business as well as links to its Yelp page and a Google Streetview image. You can also add and remove favorites from the info box.  

**(8) Menu Selectors (Mobile)**  
: Although the Google Map is the default view in the mobile version of the application, you can access a drop-down list view of search results or favorites by clicking the corresponding icon in the top-right of the screen. Clicking the icon again (or clicking another icon) dismisses the view.  



