app.directive('starRating', ['beerFactory', function (beerFactory) {
    return {
        restrict: 'EA',
        scope: {
            'value': '=value',
            'max': '=max',
            'hover': '=hover',
            'isReadonly': '=isReadonly',
            'id': '<beerId'
        },
        link: function (scope, element, attrs, ctrl) {

            console.log(scope);
            scope.beerFactory = beerFactory;

            function renderValue() {
                scope.renderAry = [];
                for (var i = 0; i < scope.max; i++) {
                    if (i < scope.value) {
                        scope.renderAry.push({
                            'fa fa-star fa-2x': true
                        });
                    } else {
                        scope.renderAry.push({
                            'fa fa-star-o fa-2x': true
                        });
                    }
                }
            }

            scope.setValue = function (index) {
                if (!scope.isReadonly && scope.isReadonly !== undefined) {
                    scope.value = index + 1;
                    renderValue();
                }
            };

            scope.changeValue = function (index) {
                if (scope.hover) {
                    scope.setValue(index);
                } else {
                    // !scope.changeOnhover && scope.changeOnhover != undefined
                }
            };

            scope.rate = function () {
                scope.beerFactory.addRating(scope.id, scope.value)
                    .then(function (response) {

                        var beers = scope.$parent.$parent.beers;
                        for (var i=0; i<beers.length; i++){
                            if (beers[i]._id == response._id){
                                beers[i].rating = response.rating;
                            }
                        }

                        scope.value = Math.round(response.rating);
                        scope.isReadonly = true;
                        renderValue();
                    });

            }

            // scope.$watch('value', function (newValue, oldValue, scope){

            //     if (newValue) {
            //         scope.beerFactory.addRating(scope.id,newValue)
            //         .then(function (response) {
            //             scope.isReadonly = true;
            //         });
            //         renderValue();
            //     }
            // });
            scope.$watch('max', function (newValue, oldValue) {
                if (newValue) {
                    renderValue();
                }
            });

        },
        template: '<div>' +
            '<span ng-class="{isReadonly: isReadonly}">' +
            '<i ng-class="renderObj" ' +
            'ng-repeat="renderObj in renderAry" ' +
            'ng-click="setValue($index)" ' +
            'ng-mouseenter="changeValue($index, changeOnHover )" >' +
            '</i>' +
            '</span>' +
            '<div>' +
            '<button class="rate-button" ng-click="rate()" ng-hide="isReadonly"> Rate! </button>' +
            '</div>' + 
            '</div>',
        replace: true
    };
}]);