/*
 * This file is for simple helper fuctions such as transforms
 */

export function transformToMarker(data) {
	var transform = []
	data.forEach((item)=>{
		transform.push({
			position: {
			  lat: item.geo.lat,
			  lng: item.geo.lng,
			},
			key: item.id,
			defaultAnimation: 2,
		})
	})
	return transform;
}