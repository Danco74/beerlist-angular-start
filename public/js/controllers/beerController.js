app.controller('beerController', function($scope, $stateParams,beerFactory) {

    



    $scope.submitReview = function(){
        beerFactory.addReview($scope.beer._id,$scope.review).then(function (beers) {
            console.log("stope here");
        }).catch(function (error) {
            console.log(error)
        });
    }

    $scope.getReviews = function(){
        beerFactory.getReviews($scope.beer._id).then(function (beers) {
            console.log("stope here");
        }).catch(function (error) {
            console.log(error)
        });
    }


 


    if (!$stateParams.beerParam) {
        beerFactory.getBeer($stateParams.id)
          .then(function(beer) {
            $scope.beer = beer;
            $scope.reviews = beer.reviews;
          })
      } else {
        $scope.beer = $stateParams.beerParam;
        $scope.reviews = $stateParams.beerParam.reviews;
      }

      
  });