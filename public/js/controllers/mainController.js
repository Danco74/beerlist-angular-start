app.controller('mainController', function ($scope, beerFactory) {
    $scope.beers = [];

    $scope.isReadonly = false; // default test value
    $scope.changeOnHover = true; // default test value 
    $scope.maxValue = 10; // default test value
    $scope.ratingValue = 5; // default test value

    $scope.addBeer = function () {
        var newBeer = {
            name: $scope.name,
            style: $scope.style,
            image_url: $scope.image
        };


        beerFactory.addBeer(newBeer).then(function (beer) {
            $scope.beers.push(beer);
        });
    }

    $scope.removeBeer = function() {
        var beerId = this.beer._id
        beerFactory.removeBeer(beerId)
          .then(function(beer) {
            for (var i = 0; i < $scope.beers.length; i++) {
              if ($scope.beers[i]._id === beer._id) {
                $scope.beers.splice(i, 1);
                break;
              }
            }
         })
         .catch(function(error) {
            console.log(error)
         });
      }

    beerFactory.getBeers().then(function (beers) {
        $scope.beers = beers;
    }).catch(function (error) {
        console.log(error)
    });
});