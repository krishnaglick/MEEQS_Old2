$(function() {
	$.ajax({
		url: 'http://localhost:1337/api/v1/users',
		type: 'POST',
		data: {user: {username: 'potato', password: 'potato12', displayName: 'testuser'}}
	})
	.complete(function() {
		$.ajax({
			url: 'http://localhost:1337/api/v1/tagCategories',
			type: 'POST',
			data: {tagCategory: {name: 'tagCategory1', description: 'tcat1'}}
		})
		.complete(function() {
			$.ajax({
				url: 'http://localhost:1337/api/v1/tagCategories',
				type: 'POST',
				data: {tagCategory: {name: 'tagCategory2', description: 'tcat2'}}
			})
			.complete(function() {
				$.ajax({
					url: 'http://localhost:1337/api/v1/tags',
					type: 'POST',
					data: {tag: {name: 'tag1', tagCategories: 1}}
				})
				.complete(function() {
					$.ajax({
						url: 'http://localhost:1337/api/v1/restaurantLocations',
						type: 'POST',
						data: {restaurantLocation: {name: 'Mellow Mushroom', place_id: 'ChIJq6qq6jauEmsRJAf7FjrKnXI', tags: 1}}
					})
					.complete(function() {
						$.ajax({
							url: 'http://localhost:1337/api/v1/restaurantLocations',
							type: 'POST',
							data: {restaurantLocation: {name: 'Tijuana Flats', place_id: 'ChIJ4V5dQhm35YgRv4kgtMzyjLo', tags: 1}}
						})
						.complete(function() {
							$.ajax({
								url: 'http://localhost:1337/api/v1/ratings',
								type: 'POST',
								data: {rating: {
									restaurantLocation: 4,
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
