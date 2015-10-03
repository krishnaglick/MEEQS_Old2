
$.ajax({
	url: 'http://localhost:1337/api/v1/user',
	type: 'POST',
	data: {users: {username: 'potato', password: 'potato12'}}
})
.complete(function() {
	$.ajax({
		url: 'http://localhost:1337/api/v1/tagCategory',
		type: 'POST',
		data: {tagCategories: {name: 'tagCategory1', description: 'tcat1'}}
	})
	.complete(function() {
		$.ajax({
			url: 'http://localhost:1337/api/v1/tagCategory',
			type: 'POST',
			data: {tagCategories: {name: 'tagCategory2', description: 'tcat2'}}
		})
		.complete(function() {
			$.ajax({
				url: 'http://localhost:1337/api/v1/tag',
				type: 'POST',
				data: {tags: {name: 'tag1', tagCategories: 1}}
			})
			.complete(function() {
				$.ajax({
					url: 'http://localhost:1337/api/v1/restaurantLocation',
					type: 'POST',
					data: {restaurantLocations: {name: 'Mellow Mushroom', place_id: 'ChIJq6qq6jauEmsRJAf7FjrKnXI', tags: 1}}
				})
				.complete(function() {
					$.ajax({
						url: 'http://localhost:1337/api/v1/restaurantLocation',
						type: 'POST',
						data: {restaurantLocations: {name: 'Tijuana Flats', place_id: 'ChIJ5xQ7szeuEmsRs6Kj7YFZE9k', tags: 1}}
					})
					.complete(function() {
						$.ajax({
							url: 'http://localhost:1337/api/v1/rating',
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

