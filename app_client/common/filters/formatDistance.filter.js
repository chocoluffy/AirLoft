(function(){
	angular
		.module('airloft')
		.filter('formatDistance', formatDistance);

	function formatDistance(){
		return function(distance){
			var numDistance, unit
			if(distance > 1000 && distance <= 100* 1000){
				numDistance = parseFloat(distance / 1000).toFixed(1);
				unit = 'km';
			}else if(distance > 100 * 1000){
				numDistance = '> 100';
				unit = 'km';
			}
			else{
				numDistance = parseInt(distance, 10);
				unit = 'm';
			}
			return numDistance + unit;
		};
	};
})();

	