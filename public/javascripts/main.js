angular.module('ChatApp', [])

angular.module('ChatApp')
	.controller('mainController', ['$scope', function($scope){

		$scope.messages = []
		$scope.users = []

		socket.on('update', function(username, data){
			console.log(data)
			$scope.$apply(function(){$scope.messages.push(username + ' :  ' + data)})
		})

		socket.on('updateusers', function(data){
			$scope.users = []
			console.log(data)
			$scope.$apply(function(){$scope.users = data})
			// data.forEach(parseUser)
		})

		$scope.chatMessage = function(){
			console.log($scope.chatData)
			socket.emit('send', $scope.chatData.message)
			$scope.chatData = {}
		}
		
		$scope.usernameSubmit = function(){
			$scope.disableSubmit = true
			socket.emit('adduser', $scope.user.name)
		}

		// function parseUser(key, value){
		// 	$scope.users.push(key)
		// }

	}])