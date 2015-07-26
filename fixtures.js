$.ajax({
	url: 'http://localhost:1337/api/v1/restaurants',
	type: 'POST',
	data: {restaurants: {name: 'potato', description: 'swordfish'}}
})
.complete(function() {
	$.ajax({
		url: 'http://localhost:1337/api/v1/users',
		type: 'POST',
		data: {users: {username: 'potato', password: 'potato12'}}
	})
	.complete(function() {
		$.ajax({
			url: 'http://localhost:1337/api/v1/tagCategories',
			type: 'POST',
			data: {tagCategories: {name: 'tagCategory1', description: 'tcat1'}}
		})
		.complete(function() {
			$.ajax({
				url: 'http://localhost:1337/api/v1/tagCategories',
				type: 'POST',
				data: {tagCategories: {name: 'tagCategory2', description: 'tcat2'}}
			})
			.complete(function() {
				$.ajax({
					url: 'http://localhost:1337/api/v1/tags',
					type: 'POST',
					data: {tags: {name: 'tag1', tagCategories: 1}}
				})
				.complete(function() {
					$.ajax({
						url: 'http://localhost:1337/api/v1/restaurantLocations',
						type: 'POST',
						data: {restaurantLocations: {restaurant: 1, place_id: 'ChIJq6qq6jauEmsRJAf7FjrKnXI', tags: 1}}
					})
					.complete(function() {
						$.ajax({
							url: 'http://localhost:1337/api/v1/restaurantLocations',
							type: 'POST',
							data: {restaurantLocations: {restaurant: 2, place_id: 'ChIJt9trB0euEmsRHdhhqjr37n4', tags: 1}}
						})
						.complete(function() {
							$.ajax({
								url: 'http://localhost:1337/api/v1/ratings',
								type: 'POST',
								data: {ratings: {
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
});

