(function () {
	var app = angular.module("org.gradle.profiler.listener", [
		"org.gradle.profile.listener.processor",
		"data-table"
	]);

	app.controller("MainController", function ($scope, gradleEnterpriseServer) {
		$scope.url = null;
		$scope.builds = [];
		$scope.buildProcessor = gradleEnterpriseServer(function (build) {
			$scope.$apply(() => {
				$scope.builds.push(build);
			});
		});
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

		$scope.options = {
			// rowHeight: 50,
			// headerHeight: 50,
			footerHeight: false,
			scrollbarV: true,
			selectable: true,
			columns: [
				{
					name: "Scenario",
				}, {
					name: "Phase"
				}, {
					name: "Number"
				}, {
					name: "Step"
				}, {
					name: "Tasks"
				}, {
					name: "Execution time"
				}, {
					name: "Task execution time"
				}, {
					name: "GC time"
				}, {
					name: "Pack time"
				}, {
					name: "Unpack time"
				}, {
					name: "Build scan"
				}
			]
		};
	});
})();
