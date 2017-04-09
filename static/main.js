var map;
var markers = {};
$(document).ready(function(){
  map = new GMaps({
    el: '#map',
    lng: 10.385417,
    lat: 55.395425
  });
  setInterval(checkSensors, 10000);
  checkSensors();
});

function emptyTrash(id) {
  console.log('sending', id);
  $.post( "/empty", { id: id } );
  markers[id].setIcon('https://www.google.com/mapfiles/marker_green.png');
}

function checkSensors() {
  $.get( "/", function( data ) {
    console.log('data', data.length, Object.keys(markers).length);
    for (var i = 0; i < data.length; i++) {
      if (Object.keys(markers).length < data.length) {
        var empty = data[i].status === 'empty';
        markers[data[i].id] = map.addMarker({
          lat: data[i].lat,
          lng: data[i].lng,
          title: data[i].name,
          icon: empty ? 'https://www.google.com/mapfiles/marker_green.png' : '',
          infoWindow: {
            content:"<div class='marker'>" +
                "<div>ID:" + data[i].name + "</div>" +
                "<div>Last Check: " + new Date(data[i].lastCheck*1000).toString() + "</div>" +
                "<div onClick='emptyTrash(\x22"+data[i].id+"\x22)' class='clear'>Clear trash</div>" +
              "</div>"
          }
        });
      } else {
        if (markers.hasOwnProperty(data[i].id)) {
          console.log('status', data[i].status);
          icon = data[i].status === 'empty' ? 'https://www.google.com/mapfiles/marker_green.png' : '';
          markers[data[i].id].setIcon(icon);
        }
      }
    }
  });
}
