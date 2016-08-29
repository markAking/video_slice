'use strict';

describe('myApp.view1 module', function() {

    beforeEach(module('myApp.view1'));
    var scope, view1Ctrl, AgeFactory, Funfactory;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        view1Ctrl = $controller('View1Ctrl', {
            $scope: scope
        });
        AgeFactory = angular.injector(['myApp.view1']).get('AgeFactory');
        Funfactory = angular.injector(['myApp.view1']).get('Funfactory');
    }));

    describe('view1 controller', function(){

        it('should be defined', inject(function($controller) {
            expect(view1Ctrl).toBeDefined();
        }));

  });
});