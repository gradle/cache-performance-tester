(function () {
	var app = angular.module("org.gradle.profiler.listener", [
		"org.gradle.profile.listener.processor"
	]);

	app.controller("ConnectionController", function ($scope, gradleEnterpriseServer) {
		$scope.gradleEnterprise = null;
		$scope.url = "https://e.grdev.net"
		$scope.output = "";
		$scope.connect = function () {
			$scope.gradleEnterprise = gradleEnterpriseServer($scope.url, "now", function () {
				console.log("Found one", arguments);
				$scope.$apply(() => {
					$scope.output += Array.prototype.join.call(arguments, "\t") + "\n";
				});
			});
		};
		$scope.process = function () {
        	const urlRegex = /(https?:\/\/\S+\/s\/(\w+))/g;
        	const text = $scope.buildsToProcess;
        	while (true) {
        		const match = urlRegex.exec(text);
        		if (match === null) {
        			break;
        		}
        		$scope.gradleEnterprise.processBuild({ buildId: match[2] });
        	}
		};
	});
})();
