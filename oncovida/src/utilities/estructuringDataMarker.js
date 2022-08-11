const square_icon = {
  icon: {
    url: 'square',
    size: {width: 200, height: 200, j: "px", f: "px"},
    origin: {x: 0, y: 0},
    anchor: {x: 100, y: 200},
    scaledSize: {width: 50, height: 50, j: "px", f: "px"}
  },
  shape: {
    coords: [34,0,166,0,166,130,120,135,100,200,80,135,34,130,34,0],
    type: 'poly'
  }
};
const circular_icon = {
  icon: {
    url: 'cirular',
    size: {width: 200, height: 200, j: "px", f: "px"},
    origin: {x: 0, y: 0},
    anchor: {x: 100, y: 200},
    scaledSize: {width: 50, height: 50, j: "px", f: "px"}
  },
  shape: {
    coords: [100,200,161,73,161,29,125,0,75,0,38,29,38,73,100,200],
    type: 'poly'
  }
};

export default function estructuringDataMarker(markers) {

  const square_icon_resizable = resizableIcon(square_icon.icon, square_icon.shape, square_icon.icon.scaledSize);
  const circular_icon_resizable = resizableIcon(circular_icon.icon, circular_icon.shape, circular_icon.icon.scaledSize);

  let _markers = Object.assign({}, markers);
  for (var i in _markers){
    const marker = Object.assign({}, _markers[i]);

    const url_type = addIconByType(marker);

    if(url_type.type == 'square_icon'){

      marker.icon = Object.assign({},square_icon_resizable.icon);
      marker.shape = Object.assign({},square_icon_resizable.shape);
    }
    if(url_type.type == 'circular_icon'){
      marker.icon = Object.assign({},circular_icon_resizable.icon);
      marker.shape = Object.assign({},circular_icon_resizable.shape);
    }

    marker.icon.url = url_type.url;
    marker['url']=url_type.url;

    marker['position'] = {
      lat: marker.location.coordinates[0],
      lng: marker.location.coordinates[1]
    };
    marker['zIndex'] =  url_type.zIndex;
    _markers[i] = marker;
  }
  return _markers;
}

function addIconByType(marker) {
  let url = '';
  let serviceType = '';
  let currentStatus = '';
  let type = '';
  let zIndex = 1;
  if(marker.serviceType || marker.attentionType){
    serviceType = marker.serviceType || marker.attentionType;
    switch (serviceType) {
      case 'MEDICINE':
        url += '/img/medicine';
        break;
      case 'DOCTOR':
        url += '/img/doctor';
        break;
      case 'AMBULANCE':
        url += '/img/ambulance';
        break;
      case 'BLOODEXAM':
        url += '/img/blodexamen';
        break;
      case 'NUTRICIONISTA':
        url += '/img/blodexamen';
        break;
      default:
        url += '/img/'+serviceType;
    }
    currentStatus = marker.currentStatus;
    switch (currentStatus){
      case 'AVAILABLE':
        url += '/disponible.png';
        type = 'circular_icon';
        zIndex = 2;
        break;
      case 'IN_ATTENTION':
        url += '/en_atencion.png';
        type = 'circular_icon';
        zIndex = 3;
        break;
      case 'UNAVAILABLE':
        url += '/inactivo.png';
        type = 'circular_icon';
        break;
      case 'SCHEDULED':
        url += '/por_asignar.png';
        type = 'square_icon';
        break;
      case 'NEW':
        url += '/creada.png';
        type = 'square_icon';
        break;
      case 'SENT':
        url += '/por_asignar.png';
        type = 'square_icon';
        break;
      case 'ASSIGNED':
        url += '/asignada.png';
        type = 'square_icon';
        break;
      case 'CONFIRMED':
        url += '/confirmada.png';
        type = 'square_icon';
        break;
      case 'ATTENDED':
        url += '/por_asignar.png';
        type = 'square_icon';
        break;
      case 'UNATTENDED':
        url += '/por_asignar.png';
        type = 'square_icon';
        break;
      case 'CANCELLED':
        url += '/por_asignar.png';
        type = 'square_icon';
        break;
      case 'REJECTED':
        url += '/abortada.png';
        type = 'square_icon';
        break;
      case 'ARRIVED':
        url += '/encontrada.png';
        type = 'square_icon';
        break;
      case 'MOBILIZED':
        url += '/movilizada.png';
        type = 'square_icon';
        break;
      case 'CLOSED':
        url += '/cerrada.png';
        type = 'square_icon';
        zIndex = 2;
        break;
      case 'ABORTED':
        url += '/abortada.png';
        type = 'square_icon';
        break;
      default:
        url += '/default.png'
        type = 'square_icon';
    }
  }
  return {url , type , zIndex};
}

function resizableIcon(fromIcon, shapeIcon, scaledSize) {
  let icon = {};
  let shape = {};
  if(scaledSize){
    const widthScaledSize = fromIcon.size.width/scaledSize.width;
    const heightScaledSize = fromIcon.size.height/scaledSize.height;

    icon = {
      url: fromIcon.url,
      size: {
        width: fromIcon.size.width/widthScaledSize,
        height: fromIcon.size.height/heightScaledSize,
        j: fromIcon.size.j,
        f: fromIcon.size.f,
      },
      origin: {
        x: fromIcon.origin.x/widthScaledSize,
        y: fromIcon.origin.y/heightScaledSize,
      },
      anchor: {
        x: fromIcon.anchor.x/widthScaledSize,
        y: fromIcon.anchor.y/heightScaledSize,
      },
      scaledSize: {
        width: scaledSize.width,
        height: scaledSize.height,
        j: scaledSize.j,
        f: scaledSize.f,
      }
    };
    shape = {
      coords: [],
      type: 'poly'
    }
    for (var i in shapeIcon.coords){
        shape.coords[i] = (i%2)==0 ? shapeIcon.coords[i]/widthScaledSize : shapeIcon.coords[i]/heightScaledSize;
    }
  }else{
     icon = fromIcon;
     shape = shapeIcon;
  }
  return {icon,shape};
}
