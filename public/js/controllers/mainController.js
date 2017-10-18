app.controller('mainController', function ($scope, beerFactory) {
    $scope.beers = [];

    $scope.edit = false;


    $scope.isReadonly = false; // default test value
    $scope.changeOnHover = false; // default test value 
    $scope.maxValue = 5; // default test value
    $scope.ratingValue = 0; // default test value
    $scope.reverse = false;

    $scope.addBeer = function () {
        var newBeer = {
            name: $scope.name,
            style: $scope.style,
            image_url: $scope.image
        };


        beerFactory.addBeer(newBeer).then(function (beer) {
            $scope.beers.push(beer);
        }).catch(function(error) {
            console.log(error)
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

    $scope.toggleReverse = function() {
        $scope.reverse = !$scope.reverse;
    }

    $scope.toggleEdit = function (beer) {
        $scope.edit = !$scope.edit;
        $scope.name = beer.name;
        $scope.style = beer.style;
        $scope.image = beer.image_url;
        $scope.id = beer._id;
    }

    $scope.updateBeer = function() {
        $scope.edit = !$scope.edit;
        var updateObj = {
            name: $scope.name,
            style: $scope.style,
            image_url: $scope.image
        };
        beerFactory.updateBeer($scope.id,updateObj)
        .then(function(beer) {
            for (var i = 0; i < $scope.beers.length; i++) {
              if ($scope.beers[i]._id === beer._id) {
                $scope.beers[i].name = beer.name;
                $scope.beers[i].style = beer.style;
                $scope.beers[i].image_url = beer.image_url;
                break;
              }
            }
         }).catch(function (error){
             console.log(error);
         });
    }

    beerFactory.getBeers().then(function (beers) {
        $scope.beers = beers;
    }).catch(function (error) {
        console.log(error)
    });


});