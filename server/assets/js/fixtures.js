
$.ajax({
	url: 'http://localhost:1337/api/v1/user',
	type: 'POST',
	data: {user: {username: 'potato', password: 'potato12', displayName: 'testuser'}}
})
.complete(function() {
	$.ajax({
		url: 'http://localhost:1337/api/v1/tagCategory',
		type: 'POST',
		data: {TagCategory: {name: 'tagCategory1', description: 'tcat1'}}
	})
	.complete(function() {
		$.ajax({
			url: 'http://localhost:1337/api/v1/tagCategory',
			type: 'POST',
			data: {tagCategory: {name: 'tagCategory2', description: 'tcat2'}}
		})
		.complete(function() {
			$.ajax({
				url: 'http://localhost:1337/api/v1/tag',
				type: 'POST',
				data: {tag: {name: 'tag1', tagCategories: 1}}
			})
			.complete(function() {
				$.ajax({
					url: 'http://localhost:1337/api/v1/restaurantLocation',
					type: 'POST',
					data: {restaurantLocation: {name: 'Mellow Mushroom', place_id: 'ChIJq6qq6jauEmsRJAf7FjrKnXI', tags: 1}}
				})
				.complete(function() {
					$.ajax({
						url: 'http://localhost:1337/api/v1/restaurantLocation',
						type: 'POST',
						data: {restaurantLocation: {name: 'Tijuana Flats', place_id: 'ChIJ5xQ7szeuEmsRs6Kj7YFZE9k', tags: 1}}
					})
					.complete(function() {
						$.ajax({
							url: 'http://localhost:1337/api/v1/rating',
							type: 'POST',
							data: {rating: {
								restaurantLocation: 1,
								user: 1,
								comment: 'potato',
								menuSelection: 3,
								environment: 3,
								costEfficiency: 3,
								productQuality: 3,
								service: 3
							}}
						});
					});
				});
			});
		});
	});
});

