import pngMarkerActors from "assets/markers/marker-actors.png";
import pngMarkerActorsActive from "assets/markers/marker-actors-active.png";
import pngMarkerProjects from "assets/markers/marker-projects.png";
import pngMarkerProjectsActive from "assets/markers/marker-projects-active.png";
import pngMarkerEvents from "assets/markers/marker-events.png";
import pngMarkerEventsActive from "assets/markers/marker-events-active.png";
import pngMarkerEducations from "assets/markers/marker-educations.png";
import pngMarkerEducationsActive from "assets/markers/marker-educations-active.png";
import pngMarkerCounselings from "assets/markers/marker-counselings.png";
import pngMarkerCounselingsActive from "assets/markers/marker-counselings-active.png";
import pngMarkerStores from "assets/markers/marker-stores.png";
import pngMarkerStoresActive from "assets/markers/marker-stores-active.png";
import pngMarker from "assets/markers/marker.png";
import pngMarkerActive from "assets/markers/marker-active.png";

export const getMarkerPng = (entityType: string) => {
  // console.log('entityType', entityType)
  let marker = {
    inactive: '',
    active: ''
  }

  switch (entityType) {
    case 'actor':
      marker.inactive = pngMarkerActors
      marker.active = pngMarkerActorsActive
      break;
    case 'project':
      marker.inactive = pngMarkerProjects
      marker.active = pngMarkerProjectsActive
      break;
    case 'event':
      marker.inactive = pngMarkerEvents
      marker.active = pngMarkerEventsActive
      break;
    case 'education':
      marker.inactive = pngMarkerEducations
      marker.active = pngMarkerEducationsActive
      break;
    case 'counseling':
      marker.inactive = pngMarkerCounselings
      marker.active = pngMarkerCounselingsActive
      break;
    case 'store':
      marker.inactive = pngMarkerStores
      marker.active = pngMarkerStoresActive
      break;
    default:
      marker.inactive = pngMarker
      marker.active = pngMarkerActive
      break;
  }

  return marker
}
