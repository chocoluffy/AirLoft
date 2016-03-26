$("#addReview").submit(function(e){
	$(".alert.alert-danger").hide();
	if(!$("input#name").val() || !$("select#rating").val() || !$("textarea#review").val()){
		if($(".alert.alert-danger").length){
			$(".alert.alert-danger").show("slow");
			console.log("jquery!");
		}else{
			$(this).prepend('<div role="alert" class="alert alert-danger text-center">All fields required, please try again!</div>');
			$(".alert.alert-danger").hide();
			$(".alert.alert-danger").show("slow");
		}
		return false;
	}
});