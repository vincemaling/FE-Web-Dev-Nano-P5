// This Javascript file does most of the work for the Atlanta Neighborhoods app. It follows the MVVM framework from Knockout.js.

// CONTENTS:
// 1. Custom Data Binding (I've written custom data-binding functions to tie Search and Favorites markers to certain observables)
// 2. Data Model (contains all JSON data used to initiate the application)
// 3. View-Model (contains all of the functions that drive the behavior of the app)


// CUSTOM BINDING HANDLER FOR FAVORITES MARKERS
// When the observable array containing the user's Favorites for each neighborhood is updated, this handler ensures that the markers on the map are populated

ko.bindingHandlers.favoritesmarkerlist = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        var latLng;

        for (var location_index in value.locations())
        {
            if (value.locations()[location_index].pinpoint) value.locations()[location_index].pinpoint.setMap(null); 
            latLng = new google.maps.LatLng(
                            value.locations()[location_index].lat, 
                            value.locations()[location_index].lng);
            value.locations()[location_index].pinpoint = new google.maps.Marker({
                position: latLng,
                map: value.locations()[location_index].map,
                icon: value.locations()[location_index].icon,
                title: value.locations()[location_index].name
              });


            viewModel.attachMessage(value.locations()[location_index].pinpoint, value.locations()[location_index], "Yelp!");
        }
    }
};

// CUSTOM BINDING HANDLER FOR SEARCH MARKERS
// When the observable array containing search results is updated, this handler ensures that the corresponding markers on the map are populated

ko.bindingHandlers.searchmarkerlist = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        var latLng;

        for (var location_index in value.locations())
        {
            if (value.locations()[location_index].pinpoint) value.locations()[location_index].pinpoint.setMap(null); 
            latLng = new google.maps.LatLng(
                            value.locations()[location_index].lat, 
                            value.locations()[location_index].lng);
            value.locations()[location_index].pinpoint = new google.maps.Marker({
                position: latLng,
                map: value.locations()[location_index].map,
                icon: value.locations()[location_index].icon,
                title: value.locations()[location_index].name
              });


            viewModel.attachMessage(value.locations()[location_index].pinpoint, value.locations()[location_index], "Yelp!");
        }
    }
};


// DATA MODEL
// The Data Model defines all the pre-existing data and settins for the app: for example, the initial Favorites for each neighborhood.
// This is where you could add additional neighborhoods (by simply adding them to the "Neighborhoods" array in the "initialNeighborhoods" model

var dataModel = { 
  "initialMapOptions" : {
      zoom: 14,
      lat: 33.805312,
      lng: -84.366842,
      zIndex: 99
  },
  "openWeatherAPIKey" : "6a43a7b10f073446d59c23a4ae0e1ebb",
  "yelpSearchLimit" : 5,
  "initialSearchResults": [],
  "mapFailMessage": "We can't get Google Maps to work. Maybe their servers are down!",
  "searchFailMessage": "We called Yelp and Google, but they didn't pick up. Maybe their servers are down!",
  "weatherFailMessage": "We called Open Weather, but they didn't pick up. Maybe their servers are down!",
  "favoritesFailMessage": "One or more of your previously saved favorites could not be refreshed. It may have gone out of business or moved. Try searching for it!",
  "searchZeroMessage": "We couldn't find any locations matching your search criteria.",
  "weatherTemplate": '<div class="container" style="width: 270px;">'+
    '<div class="row"><div class="col-md-6 text-right" style="width: 40%"><strong>Summary </strong></div><div class="col-md-6 text-left"> --DESC--</div></div>'+
    '<div class="row"><div class="col-md-6 text-right" style="width: 40%""><strong>Temp. </strong></div><div class="col-md-6 text-left"> --TEMP--</div></div>'+
    '<div class="row"><div class="col-md-6 text-right" style="width: 40%""><strong>Humidity </strong></div><div class="col-md-6 text-left"> --HUM--</div></div>'+
    '<div class="row"><div class="col-md-6 text-right" style="width: 40%"><strong>Wind </strong></div><div class="col-md-6 text-left"> --WIND--</div></div></div>',
  "infoboxTemplate": '<div class="markerinfo" style="overflow: hidden"><div id="content">'+
    '<a href="--LINKHREF--"><h4 id="firstHeading">--TITLE--</h4></a>'+
    '<img class="streetview" src="--STREETVIEW--" style="float: right; margin-left: 10px; margin-bottom: 10px;">'+
    '<div id="ratingbar">'+
    '<span id="ratingline" width="50%"><b>--PROVIDER-- Rating: </b></span><span width="50%"><img id="ratingimage" src="--IMAGESOURCE--"></span>'+
    '<p><i>--REVIEWTAG--</i></p></div>'+
    '<p>--SNIPPET--<a href="--SNIPPETHREF--"> [read more]</a></p>',
  "buttonAdd": '<button type="button" id="addtofavorites" class="btn btn-default" aria-label="Left Align">'+
    '<span id="buttonglyph" class="glyphicon glyphicon-heart" aria-hidden="true"></span> Add to Favorites'+
    '</button></div></div>',
  "buttonRemove": '<button type="button" id="removefromfavorites" class="btn btn-default" aria-label="Left Align">'+
    '<span id="buttonglyph" class="glyphicon glyphicon-remove" aria-hidden="true"></span> Remove from Favorites'+
    '</button></div></div>', 
  "buttonAlready": '<button type="button" id="alreadyafavorites" class="btn btn-default" aria-label="Left Align">'+
    '<span id="buttonglyph" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Already a Favorite!'+
    '</button></div></div>', 
  "initialNeighborhoods": {
  "neighborhoods": [
    {
    "name": "Lindbergh",
    "lat": 33.805312,
    "lon": -84.366842,
    "city": "Atlanta",
    "state": "GA",
    "id": 0,
    "refreshed": false,
    "favorites": [
      {
        "name": "Fatt Matt's Rib Shack",
        "business_id": "fat-matts-rib-shack-atlanta"
      },
      {
        "name": "Smith's Olde Bar",
        "business_id": "smiths-olde-bar-atlanta"
      },
      {
        "name": "Grindhouse Killer Burgers",
        "business_id": "grindhouse-killer-burgers-atlanta-2"
      }]
    },
    {
    "name": "Shaker Square",
    "lat": 41.483557,
    "lon":  -81.590557,
    "city": "Cleveland",
    "state": "OH",
    "id": 1,
    "refreshed": false,
    "favorites": [
      {
        "name": "Dewey's Cofee House",
        "business_id": "deweys-coffee-house-cleveland"
      },
      {
        "name": "Loganberry Books",
        "business_id": "loganberry-books-shaker-heights"
      }]
    },
    {
    "name": "Cabbagetown",
    "lat": 33.752853,
    "lon": -84.363576,
    "city": "Atlanta",
    "state": "GA",
    "id": 2,
    "refreshed": false,
    "favorites": [
      {
        "name": "Krog Street Tunnel",
        "business_id": "krog-street-tunnel-atlanta"

      },
      {
        "name": "Octane",
        "business_id": "octane-atlanta-2"
      }]
    }
  ]}};



// VIEW-MODEL
// The View-Model includes the functions that drive the app's behavior. 
// It declares local observables and updates the UI when those observables change (Knockout data-binding)

var neighborhoodViewModel = function(initialFaves) {
    var self = this;

    // INITIAL DATA/DECLARATIONS
    // These lines declare observables to be used in the application, and initialize any content from the Data Model
    
        // These observables trigger search updates and store search results
        self.searchValue = ko.observable();
        self.searchResults = ko.observableArray(dataModel.initialSearchResults);
    
        // These observables control UI elements in the MOBILE experience only (icon changes, etc.)
        self.searchList = ko.observable(false);
        self.favoritesList = ko.observable(false);
        self.neighborhoodList = ko.observable(false);
        self.searchImage = ko.observable('images/mn_list_gray.png');
        self.favoritesImage = ko.observable('images/mn_favorite_gray.png');
        self.mapImage = ko.observable('images/mn_map.png');
    
        // These observables control the "error" modal that displays when AJAX fails or when no search results are found
        self.modalVisible = ko.observable(false);
        self.modalMessage = ko.observable(dataModel.searchZeroMessage);
    
        // These observable monitor the completion of the initial AJAX requests (to Yelp and Open Weather) on app start-up
        self.favoritesYetToBeRefreshed = ko.observable(true);
        self.weatherLoaded = ko.observable(false);

        // These observables contain data about the neighborhoods -- i.e. their IDs, names, locations, and the Favorites stores for each
        self.alldata = ko.observableArray(ko.utils.arrayMap(initialFaves, function(neighborhood) {
            return { name: neighborhood.name, lat: neighborhood.lat, lng: neighborhood.lon, city: neighborhood.city, state: neighborhood.state, id: neighborhood.id, refreshed: neighborhood.refreshed, faves: ko.observableArray(neighborhood.favorites), weather: ko.observable({"icon": "http://openweathermap.org/img/w/01d.png", "temp" : 0})};
        }));
        self.currentNeighborhood = ko.observable(0);
        self.currentNeighborhoodName = ko.observable("Lindbergh");
        self.neighborhoods = ko.observableArray(self.alldata());
        
        // These variables control the position of the map, and also configure it for start-up
        if (typeof google === 'object' && typeof google.maps === 'object') {
            self.latlngbounds = new google.maps.LatLngBounds();
            var center = new google.maps.LatLng(dataModel.initialMapOptions.lat, dataModel.initialMapOptions.lng);
            var updatedMapOptions = {
                "zoom": dataModel.initialMapOptions.zoom,
                "center": center,
                "zIndex": dataModel.initialMapOptions.zIndex
            };
            self.map = new google.maps.Map(document.getElementById('map-canvas'), updatedMapOptions);
        } else {
          self.modalMessage(dataModel.mapFailMessage);
          self.modalVisible(true);
        }   
        
        // This event listener ensures the map has loaded and is in an idle state. If not, the modal error message remains visible.
/*        google.maps.event.addListenerOnce(self.map, 'idle', function(){
            self.modalVisible(false);
        });*/

    // SEARCH UPDATES
    // The function below creates a "subscription" to the searchValue observable, and updates search results based on a Yelp AJAX call any time it changes

    self.searchValue.subscribe(function () {
      if (self.searchValue().length>1) {
        self.modalVisible(false);
        var urlstring = "http://www.vincentmaling.com/Yelp/yelpgetter.php?location=" + self.alldata()[self.currentNeighborhood()].name + "+" + self.alldata()[self.currentNeighborhood()].city + "+" + self.alldata()[self.currentNeighborhood()].state + "&term=" + self.searchValue() + "&limit=" + dataModel.yelpSearchLimit;
        $.getJSON( urlstring )
            .done(function( json ) {
              self.addSearchResults(json);
            })
            .fail(function( jqxhr, textStatus, error ) {
              var err = textStatus + ", " + error;
              console.log( "Request Failed: " + err );
              self.modalMessage(dataModel.searchFailMessage);
              self.modalVisible(true);
            });
      }
    });      
    
    // SEARCH RESULTS UPDATE
    // The function below takes the AJAX returned from Yelp and updates the searchResults observable accordingly
    // NOTE: The function uses a custom PHP script I wrote (hosted at vincentmaling.com) for Yelp AJAX calls; this was Yelp's recommended approach        
    
    self.addSearchResults = function(json) {
      self.clearMarkers("search"); // Clear pre-existing search markers
      var modifiedInfoBox;
      var newobj=[];
      for (var i=0; i<json.businesses.length; i++) {
          var streetviewstring = "https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" + json.businesses[i].location.coordinate.latitude + "," + json.businesses[i].location.coordinate.longitude; 
         modifiedInfoBox=self.createInfoWindow(json.businesses[i].name, json.businesses[i].rating_img_url_small, json.businesses[i].snippet_text, json.businesses[i].url, streetviewstring, json.businesses[i].review_count, "add");
         newobj[i] = {
            "name": json.businesses[i].name,
            "rating": json.businesses[i].rating,
            "snippetText": json.businesses[i].snippet_text,
            "ratingImage": json.businesses[i].rating_img_url_small,
            "url": json.businesses[i].url,
            "identifier": i,
            "business_id": json.businesses[i].id,
            "favorite": false,
            "lat": json.businesses[i].location.coordinate.latitude,
            "lng": json.businesses[i].location.coordinate.longitude,
            "streetview": streetviewstring,
            "reviewCount": json.businesses[i].review_count,
            "reviewsTag": "Based on " + json.businesses[i].review_count + " reviews",
            "icon": 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            "map": self.map,
            "infobox" : new google.maps.InfoWindow({
                content: modifiedInfoBox
              })
          };
         }
      self.searchResults(newobj); 
      // Push newly assembled array of search results to the observable
      for (var l=0; l<self.searchResults().length; l++) {
          self.latlngbounds.extend(new google.maps.LatLng(self.searchResults()[l].lat, self.searchResults()[l].lng)); // Reset map bounds to align with new search results
      }
      // If there were 0 search results, display a message over the map in a modal window
      if (json.businesses.length>0) { 
          self.modalVisible(false);
          self.moveMap(new google.maps.LatLng(self.searchResults()[0].lat, self.searchResults()[0].lng),14);
      } else {
          self.modalMessage(dataModel.searchZeroMessage);
          self.modalVisible(true);
      }
    };

    // CREATE MARKER INFOBOX
    // The function below takes values from the search result (e.g. business name, Yelp rating, Google Streetview) and organizes them into an InfoBox.
    // The InfoBox is displayed over the item's map marker when the user clicks on the item.
    // Note that the function relies on an HMTL template included in the dataModel. 
    
    self.createInfoWindow = function(name, ratingImage, snippetText, url, streetview, reviewCount, type) {
        var modifiedInfoBox;
        if (type=="remove") modifiedInfoBox = dataModel.infoboxTemplate + dataModel.buttonRemove;
        if (type=="add") modifiedInfoBox = dataModel.infoboxTemplate + dataModel.buttonAdd;
        if (name) modifiedInfoBox = modifiedInfoBox.replace("--TITLE--", name);
        if (ratingImage) modifiedInfoBox = modifiedInfoBox.replace("--IMAGESOURCE--", ratingImage);      
        if (snippetText) modifiedInfoBox = modifiedInfoBox.replace("--SNIPPET--", snippetText); 
        if (url) modifiedInfoBox = modifiedInfoBox.replace("--LINKHREF--", url); 
        if (url) modifiedInfoBox = modifiedInfoBox.replace("--SNIPPETHREF--", url); 
        if (streetview) modifiedInfoBox = modifiedInfoBox.replace("--STREETVIEW--", streetview); 
        if (reviewCount) modifiedInfoBox = modifiedInfoBox.replace("--REVIEWTAG--", "Based on " + reviewCount + " reviews"); 
        modifiedInfoBox = modifiedInfoBox.replace("--PROVIDER--", "Yelp!");
        return modifiedInfoBox;
    };

    // ATTACH INFO WINDOW TO MARKER
    // Once the InfoBox is created, the function below declares an event listener that opens the InfoBox when the corresponding marker is clicked.
    // Each InfoBox includes either a "Add to Favorites" or "Remove from Favorites" button. Those button event listeners are declared here as well.
    
    self.attachMessage = function(marker, contentsource) {        
      google.maps.event.addListener(marker, 'click', function() {
        self.toggleMap();
        contentsource.infobox.open(marker.get('map'), marker);
        self.moveMap(marker.position, 16);
      });
      google.maps.event.addListener(contentsource.infobox, 'domready', function() {
          if(contentsource.favorite===false) {
            $("#addtofavorites").click(function() {
              self.addFave(contentsource);
              contentsource.pinpoint.setMap(null);
              self.searchResults.remove(contentsource);
            });
          } else if (contentsource.favorite===true) {
            $("#removefromfavorites").click(function() {
              contentsource.pinpoint.setMap(null); 
              self.alldata()[self.currentNeighborhood()].faves.remove(contentsource);
            });  
          }
      });

    };    
    
    // REFRESH USER FAVORITES AND CURRENT WEATHER (ON APP START-UP)
    // When the App starts up, it pings Yelp and Google for updated information about the user's pre-existing Favorites.
    // It also makes an AJAX call to Open Weather for the nieghborhood's current weather. 
    // Once those AJAX calls are complete, it adds the updated Favorite and Weather data to the appropriate observables
    
    self.refreshFavorites = function() {
        if (self.favoritesYetToBeRefreshed()===true) {
            var yelpurl;
            var weatherurl;
            var yelpobj = {};
            var neighb;
            var weatherobj = {};
            var usen;
            for (var j=0; j < self.alldata().length; j++) {
                var businessids = [];
                for (var y=0; y<self.alldata()[j].faves().length; y++) {
                    businessids.push(self.alldata()[j].faves()[y].business_id);
                }
                self.alldata()[j].faves.removeAll();
                
                // Here, each of the user's pre-existing favorites is sent to Yelp for updates
                for (var i=0; i<businessids.length; i++) {
                    yelpurl = "http://www.vincentmaling.com/Yelp/yelpgetter.php?type=businessid&business_id=" + businessids[i] + "&rn=" + j;                    
                    $.getJSON( yelpurl )
                    .done(function( json ) {
                      yelpobj = {
                        "name": json.name,
                        "rating": json.rating,
                        "snippetText": json.snippet_text,
                        "ratingImage": json.rating_img_url_small,
                        "url": json.url,
                        "identifier": i,
                        "business_id": json.id,
                        "favorite": true,
                        "lat": json.location.coordinate.latitude,
                        "lng": json.location.coordinate.longitude,
                        "streetview": "https://maps.googleapis.com/maps/api/streetview?size=200x200&location=" + json.location.coordinate.latitude + "," + json.location.coordinate.longitude,
                        "reviewCount": json.review_count,
                        "icon": 'images/ic_favorite.png',
                        "map": self.map,
                        "reviewsTag": "Based on " + json.review_count + " reviews"
                      };
                      neighb = json.reqnei;
                      self.addFave(yelpobj, neighb);
                    })
                    .fail(function( jqxhr, textStatus, error ) {
                      var err = textStatus + ", " + error;
                      console.log( "Request Failed: " + err );
                      self.modalMessage(dataModel.favoritesFailMessage);
                      self.modalVisible(true);
                    });
                }
                
                // Here, the weather for each neighborhood is retrieved from Open Weather
                weatherurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + self.alldata()[j].lat + "&lon=" + self.alldata()[j].lng;                    
                    $.ajax({
                      type: "GET",
                      url: weatherurl,
                      neighb: j,    
                      dataType: "JSON",
                    beforeSend:function( jqXHR, settings){
                        /* add url property and get value from settings (or from caturl)*/
                         jqXHR.neighb = settings.neighb;
                    }
                    })
                    .done(function( json, textStatus, jqXHR ) {
                      usen = parseInt(jqXHR.neighb);
                      weatherobj = {
                        "icon": "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png",
                        "temp": (((json.main.temp - 273.15) * 1.8000) + 32.00).toFixed(1) + " F",
                        "desc": json.weather[0].description,
                        "hum": json.main.humidity + "%",
                        "wind": (json.wind.speed * 2.2369362920544).toFixed(1) + " mph"
                      };
                      self.alldata()[usen].weather(weatherobj);
                      self.weatherLoaded(true);
                    })
                    .fail(function( jqxhr, textStatus, error ) {
                      var err = textStatus + ", " + error;
                      console.log( "Request Failed: " + err );
                      self.modalMessage(dataModel.weatherFailMessage);
                      self.modalVisible(true);
                    });
            }
            
            setTimeout(function() {
               self.favoritesYetToBeRefreshed(false);
            }, 3000);
        } else {

        }         
    }; 
    
    // ADD FAVORITE
    // When a user completes a search, he may choose to add a search result to his Favorites list for that neighborhood.
    // This function handles the addition of that Favorite to the corresponding arrays/models. It also creates map markers for the new favorite.
    // This function is also used to add the user's pre-existing Favorites (when the app first starts up).
    
    self.addFave = function(contentsource, neighborhood) {
        var useneighborhood = (neighborhood) ? neighborhood : self.currentNeighborhood();
        // Check to see if the Favorite already exists in the user's list before adding it
        for (var i=0; i< self.alldata()[useneighborhood].faves().length; i++) {
            if (contentsource.business_id==self.alldata()[useneighborhood].faves()[i].business_id) return;
        }
        
        var modifiedInfoBox = self.createInfoWindow(contentsource.name, contentsource.ratingImage, contentsource.snippetText, contentsource.url, contentsource.streetview, contentsource.reviewCount, "remove");    
        var newobj = {
          "name": contentsource.name,
          "rating": contentsource.rating,
          "snippetText": contentsource.snippetText,
          "ratingImage": contentsource.ratingImage,
          "url": contentsource.url,
          "business_id": contentsource.business_id,
          "favorite": true,
          "lat": contentsource.lat,
          "lng": contentsource.lng,
          "identifier": self.alldata()[useneighborhood].faves().length,
          "streetview": contentsource.streetview,
          "reviewCount": contentsource.reviewCount,
          "reviewsTag": "Based on " + contentsource.reviewCount + " reviews",
          "icon": 'images/ic_favorite.png',
          "map": self.map,
          "infobox" : new google.maps.InfoWindow({
             content: modifiedInfoBox          
           })
        };
        self.alldata()[useneighborhood].faves.push(newobj);
    };

    // CLEAR MAP MARKERS
    // This function ius used to clear map markers from the map. It can clear Search markers, Favorites markers, or both depending on the parameter.

    self.clearMarkers = function(type) {
      if (type=="search" || type=="all") {
          for (var i=0; i<self.searchResults().length; i++) {
              self.searchResults()[i].pinpoint.setMap(null);
          }
          self.searchResults.removeAll();
      }
      if (type=="favorites" || type=="all") {
          for (var i=0; i<self.alldata()[self.currentNeighborhood()].faves().length; i++) {
              self.alldata()[self.currentNeighborhood()].faves()[i].pinpoint.setMap(null);
          } 
      }
    };
    
    // CHANGE NEIGHBORHOOD
    // When a user toggles between neighborhoods, this function clears any existing map markers / list box items, and adds Favorites from the new neighborhood.
    
    self.refreshNeighborhood = function(item) {
        if (item.id != self.currentNeighborhood()) {
            self.clearMarkers("all");
            self.currentNeighborhood(item.id);
            self.currentNeighborhoodName(item.name);
        }
        self.searchValue('');
        self.neighborhoodList(false);
        var newcenter = new google.maps.LatLng(self.alldata()[self.currentNeighborhood()].lat, self.alldata()[self.currentNeighborhood()].lng);
        self.moveMap(newcenter, 14);
    };

    // VIEW SEARCH ITEM
    // When the user clicks a Search Result from the list view, the function below opens the InfoBox and pans the map to the appropriate location.
            
    self.viewSearchItem = function(item) {
      self.toggleMap();
      item.infobox.open(item.pinpoint.get('map'), item.pinpoint);
      self.moveMap(item.pinpoint.position, 16);
    };

    // VIEW FAVORITES ITEM
    // When the user clicks a Favorite from the list view, the function below opens the InfoBox and pans the map to the appropriate location.
    
    self.viewFavoritesItem = function(item) {
      self.toggleMap();
      item.infobox.open(item.pinpoint.get('map'), item.pinpoint);
      self.moveMap(item.pinpoint.position, 16);
    };
    
    // TOGGLE "UH-OH" MODAL
    // Normally, the "Uh-Oh" modal is toggled by a change to the "modalVisible" observable. However, the user can dismiss the modal manually (by clicking a button).
    // This function simply changes the value of the obersvable to "False" when the user clicks "Dismiss."

    self.toggleModal = function() {
        self.modalVisible(false);
    };

    // TOGGLE MOBILE SEARCH LIST VISIBILITY
    // In the Mobile view of the application, menu icons appear at the top right of the screen. The user can toggle between a Search list view, 
    // a Map view, and a Favorites list view. The three functions below update the observables that drive the menu UI elements when toggles occur.
    // NOTE: These functions do not impact the Desktop view

    self.toggleSearchList = function() {
        self.favoritesList(false);
        self.searchList(!self.searchList());
        if (self.searchList()===false) {
            self.searchImage('images/mn_list_gray.png');
            self.mapImage('images/mn_map.png');
        } else {
            self.searchImage('images/mn_list.png');
            self.mapImage('images/mn_map_gray.png');
            self.favoritesImage('images/mn_favorite_gray.png');
        }
    };
    self.toggleFavoritesList = function() {
        self.searchList(false);
        self.favoritesList(!self.favoritesList());
        if (self.favoritesList()===false) {
            self.favoritesImage('images/mn_favorite_gray.png');
            self.mapImage('images/mn_map.png');
        } else {
            self.favoritesImage('images/mn_favorite.png');
            self.mapImage('images/mn_map_gray.png');
            self.searchImage('images/mn_list_gray.png');
        }
    };
    self.toggleMap = function() {
        self.searchList(false);
        self.favoritesList(false);
        self.favoritesImage('images/mn_favorite_gray.png');
        self.searchImage('images/mn_list_gray.png');
        self.mapImage('images/mn_map.png');
    };
    self.toggleNeighborhoodList = function() {
        self.neighborhoodList(!self.neighborhoodList());
    };

    // CREATE WEATHER WIDGET HOVER-BOX
    // When the user hovers over a weather icon, more details about the weather appear in a pop-over box. 
    // Note that the appearance of the pop-over box is derived from the template in the dataModel.
        
    self.weatherTemplate = function() {
        var modifiedtemplate = dataModel.weatherTemplate; 
        modifiedtemplate = modifiedtemplate.replace("--TITLE--", self.alldata()[self.currentNeighborhood()].name);   
        modifiedtemplate = modifiedtemplate.replace("--DESC--", self.alldata()[self.currentNeighborhood()].weather().desc);  
        modifiedtemplate = modifiedtemplate.replace("--TEMP--", self.alldata()[self.currentNeighborhood()].weather().temp);  
        modifiedtemplate = modifiedtemplate.replace("--HUM--", self.alldata()[self.currentNeighborhood()].weather().hum);  
        modifiedtemplate = modifiedtemplate.replace("--WIND--", self.alldata()[self.currentNeighborhood()].weather().wind);  
        return modifiedtemplate;
    };

    // MOVE THE MAP
    // This function pans, zoom, or re-fits the map based on parameters provided
    
    self.moveMap = function(newcenter, zoom, fitb) {
        self.map.panTo(newcenter);
        if (zoom) self.map.setZoom(zoom);
        if (fitb) self.map.fitBounds(fitb);
    };
    
    // START THE APP!
    // When the app starts, the user's pre-existing favorites are refreshed. The weather pop-over is also activated.
    self.refreshFavorites();
    $('[data-toggle="popover"]').popover();

};

ko.applyBindings(new neighborhoodViewModel(dataModel.initialNeighborhoods.neighborhoods));
