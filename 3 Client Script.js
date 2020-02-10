function($scope) {
  /* widget controller */
  var c = this;
	//client controler send info that button clicked to the server side
	
	
	
	$scope.showRec = function()  {
		c.amount = c.data.requestNumb;
		$("#tbl a").remove();
		for(var i = 0; i < c.data.requestNumb; i++) {
					var number = $scope.data.requests[i].number;
					var sys = $scope.data.requests[i].sys_id;
					var item = $scope.data.requests[i].item;
					$("#tbl").append("<a href='?sys_id="+sys+"&id=sc_request&table=sc_request' class='list-group-item'>"+number+"<span> • </span>"+item+"</a>")
		}	
	};
	
	$scope.showInc = function()  {
		c.amount = c.data.incidentNumb;
		$("#tbl a").remove();
		for(var i = 0; i < c.data.incidentNumb; i++) {
					var number = $scope.data.incidents[i].number;
					var sys = $scope.data.incidents[i].sys_id;
					var shortDesc = $scope.data.incidents[i].short_description;
					$("#tbl").append("<a href='?sys_id="+sys+"&view=sp&id=ticket&table=incident' class='list-group-item'>"+number+"<span> • </span>"+shortDesc+"</a>")
		}	
	};

}