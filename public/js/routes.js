// Function to fetch data from /routes
function fetchRoutes() {
  return $.ajax({
    url: '/api/v1/routes',
    method: 'GET',
    dataType: 'json'
  });
}

// Function to populate the table with fetched data
function populateRoutesTable() {
    fetchRoutes().done(function(data) {
      const tableBody = $('#routes tbody');
      tableBody.empty(); // Clear existing rows
  
      data.forEach(function(route) {
        const row = $('<tr></tr>');
  
        const nameCell = $('<td></td>').text(route.name);
        row.append(nameCell);
  
        const descriptionCell = $('<td></td>').text(route.description);
        row.append(descriptionCell);
  
        const distanceCell = $('<td></td>').text(route.distance);
        row.append(distanceCell);
  
        const durationCell = $('<td></td>').text(route.duration);
        row.append(durationCell);
  
        // Format places with nested tags and coordinates
        const placesCell = $('<td></td>');
        route.places.forEach(function(place) {
          const placeInfo = $('<div></div>').text(`Place: ${place.name}`);
          
          const tagsInfo = $('<div></div>').text(`Tags: ${place.tags.map(tag => tag.name).join(', ')}`);
          placeInfo.append(tagsInfo);
  
          const coordinatesInfo = $('<div></div>').text(`Coordinates: (${place.coordinates.latitude}, ${place.coordinates.longitude})`);
          placeInfo.append(coordinatesInfo);
          
          placeInfo.addClass('border-bottom');
          placesCell.append(placeInfo);
        });
        row.append(placesCell);
  
        // Format tags
        const tagsCell = $('<td></td>').text(route.tags.map(tag => tag.name).join(', '));
        row.append(tagsCell);
  
        tableBody.append(row);
      });
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error fetching routes:', textStatus, errorThrown);
    });
  }

// Event listener for DOMContentLoaded to populate the table
$(document).ready(function() {
    populateRoutesTable()
});