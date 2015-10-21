angular.module('ChatApp', [])

angular.module('ChatApp')
	.controller('mainController', ['$scope', function($scope){

		$scope.messages = []

		socket.on('message', function(data){
			console.log(data)
			$scope.$apply(function(){$scope.messages.push(data)})
		})

		$scope.chatMessage = function(){
			console.log($scope.chatData)
			socket.emit('message', $scope.chatData.message)
			$scope.chatData = {}
		}
		
	}])