(function () {
	var app = angular.module("org.gradle.profiler.listener", [
		"org.gradle.profile.listener.processor"
	]);

	app.controller("MainController", function ($scope, gradleEnterpriseServer) {
		$scope.buildProcessor = gradleEnterpriseServer(function () {
			$scope.$apply(() => {
				$scope.output += Array.prototype.join.call(arguments, "\t") + "\n";
			});
		});
		$scope.url = "https://e.grdev.net"
		$scope.output = "";
		$scope.listen = function () {
			$scope.buildProcessor.start($scope.url, "now");
		};
		$scope.process = function () {
        	const urlRegex = /(https?:\/\/\S+)\/s\/(\w+)/g;
        	const text = $scope.buildsToProcess;
        	while (true) {
        		const match = urlRegex.exec(text);
        		if (match === null) {
        			break;
        		}
        		$scope.buildProcessor.processBuild({
        			gradleEnterpriseServerUrl: match[1],
        			buildId: match[2]
        		});
        	}
		};
	});
})();
