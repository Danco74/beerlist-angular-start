app.factory('beerFactory', function($http) {
    var beerFactory = {};
    
      beerFactory.getBeers = function() {
        return $http.get('/beers')
        .then(function(response) {
          return angular.copy(response.data);
        });
      };
    
      beerFactory.addBeer = function(newBeer) {
        return $http.post('/beers',newBeer)
        .then(function(response) {
          return angular.copy(response.data);
        });
      };
    
      beerFactory.removeBeer = function(id) {
        return $http.delete('/beers/' + id)
          .then(function(response) {
            return angular.copy(response.data);
          });
      };

      beerFactory.addRating = function(id,rating) {
        return $http.post('/beers/' + id + '/ratings',{
          rating: rating
        })
          .then(function(response) {
            return angular.copy(response.data);
          });
      };

      beerFactory.updateBeer = function(id,updateObj) {
        return $http.put('/beers/' + id,updateObj)
          .then(function(response) {
            return angular.copy(response.data);
          });
      };

      beerFactory.getBeer = function(id) {
        return $http.get('/beers/' + id)
          .then(function(response) {
            return response.data
          }, function(err) {
            console.error(err)
          });
      };

      beerFactory.addReview = function(id,review){
        return $http.post('/beers/' + id + '/reviews', {
          name: "guest",
          text: review
        }).
          then(function(response){
            return angular.copy(response.data);
      });
    };
    
    
      return beerFactory;
});