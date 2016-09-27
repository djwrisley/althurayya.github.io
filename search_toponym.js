/**
 * Created by rostam on 25.09.16.
 * Search Toponym
 */
var prevSearchLabel;
function active_search() {
    $('#searchInput').on('keyup', function () {
        Object.keys(markers).forEach(function (key) {
            var searchTitle = marker_properties[key].searchTitle.toUpperCase();
            var cornuURI = marker_properties[key].cornu_URI;
            var arabicTitle = marker_properties[key].arabicTitle;
            var markerSearchTitle = [];
            markerSearchTitle.push(searchTitle, cornuURI, arabicTitle);
            var searchTerm = $('#searchInput').val().toUpperCase();
            if (searchTerm !== "" && searchTerm.length > 1) {
                if (markerSearchTitle.join('').indexOf(searchTerm) != -1) {
                    customMarkerStyle(markers[key], "red", 0.8);
                    if(prevSearchLabel != undefined) {
                        prevSearchLabel.label._container.style.color = "black";
                        prevSearchLabel.label._container.style.fontSize = "20px";
                        prevSearchLabel.setLabelNoHide(false);
                    }
                    markers[key].setLabelNoHide(true);
                    //markers[key].label._container.style.color = "red";
                    //markers[key].label._container.style.fontSize = "24px";
                    prevSearchLabel = markers[key];
                }
                else {
                    customMarkerStyle(markers[key], colorLookup[marker_properties[key].region], 0.2)
                }
            }
            else if (searchTerm === "") {
                myzoom();
                customMarkerStyle(markers[key], colorLookup[marker_properties[key].region], 1)
            }
        })
    });
}

function active_autocomp(auto_list) {
    /*
     * Autocomplete the search input
     */
    $("#searchInput").autocomplete({
        appendTo: "#searchPane",
        source: auto_list,
        minLength: 4,
        select: function (e, ui) {
            var selected = ui.item.value.toUpperCase();
            var selectedMarker;
            Object.keys(markers).forEach(function (key) {
                markerLabels[key].setLabelNoHide(false);
                var markerSearchTitle = marker_properties[key].searchTitle.toUpperCase();
                var markerTopURI = marker_properties[key].cornu_URI;
                var markerArabicTitle = marker_properties[key].arabicTitle;
                // Change the circle marker color to red if it matches the selected search value
                if (markerSearchTitle == selected || markerArabicTitle == selected
                    || markerTopURI == selected) {
                    selectedMarker = markers[key];
                    customMarkerStyle(markers[key], "red", 0.8);
                    if(prevSearchLabel != undefined) {
                        prevSearchLabel.label._container.style.color = "black";
                        prevSearchLabel.label._container.style.fontSize = "20px";
                        prevSearchLabel.setLabelNoHide(false);
                    }
                    markers[key].setLabelNoHide(true);
                    markers[key].label._container.style.color = "red";
                    markers[key].label._container.style.fontSize = "24px";
                    prevSearchLabel = markers[key];
                }
                // else, make them pale
                else {
                    customMarkerStyle(markers[key], colorLookup[marker_properties[key].region], 0.2)
                }
            })
            // re-center the map if the selected item exist!
            if (selectedMarker !== undefined) {
                map.panTo(selectedMarker.getLatLng());
            }
        }
    });
}