const square_icon = {
  icon: {
    url: 'square',
    size: {width: 200, height: 200, j: "px", f: "px"},
    origin: {x: 0, y: 0},
    anchor: {x: 50, y: 50},
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
    anchor: {x: 50, y: 50},
    scaledSize: {width: 50, height: 50, j: "px", f: "px"}
  },
  shape: {
    coords: [100,200,161,73,161,29,125,0,75,0,38,29,38,73,100,200],
    type: 'poly'
  }
};
const circular_icon_rider = {
  icon: {
    url: 'cirular',
    size: {width: 101, height: 149, j: "px", f: "px"},
    origin: {x: 0, y: 0},
    anchor: {x: 101, y: 149},
    scaledSize: {width: 50, height: 75, j: "px", f: "px"}
  },
  shape: {
    coords: [ //Icons Rider 
      50,148,
      100,50,
      91,18,
      66,0,
      33,0,
      8,18,
      0,50,
      50,148,
    ],
    type: 'poly'
  }
};
const circular_icon_request_in_process = {
  icon: {
    url: 'cirular',
    size: {width: 120, height: 150, j: "px", f: "px"},
    origin: {x: 0, y: 0},
    anchor: {x: 120, y: 150},
    scaledSize: {width: 50, height: 62, j: "px", f: "px"}
  },
  shape: {
    coords: [ //Icons Service Process
      61,149,
      119,58,
      102,17,
      74,0,
      44,0,
      14,19,
      0,58,
      61,149,
    ],
    type: 'poly'
  }
};
const circular_icon_request_new = {
  icon: {
    url: 'cirular',
    size: {width: 185, height: 150, j: "px", f: "px"},
    origin: {x: 0, y: 0},
    anchor: {x: 185, y: 150},
    scaledSize: {width: 75, height: 62, j: "px", f: "px"}
  },
  shape: {
    coords: [ //Icons Service New
      93,149,
      152,60,
      139,22,
      109,0,
      75,0,
      44,22,
      32,60,
      93,149,
    ],
    type: 'poly'
  }
};



    

    

    



export default function estructuringDataMarker(markers) {

  console.log('estructuringDataMarker ')  
  const square_icon_resizable = resizableIcon(square_icon.icon, square_icon.shape, square_icon.icon.scaledSize);
  const circular_icon_resizable = resizableIcon(circular_icon.icon, circular_icon.shape, circular_icon.icon.scaledSize);
  const circular_icon_rider_resizable = resizableIcon(circular_icon_rider.icon, circular_icon_rider.shape, circular_icon_rider.icon.scaledSize);
  const circular_icon_request_in_process_resizable = resizableIcon(circular_icon_request_in_process.icon, circular_icon_request_in_process.shape, circular_icon_request_in_process.icon.scaledSize);
  const circular_icon_request_new_resizable = resizableIcon(circular_icon_request_new.icon, circular_icon_request_new.shape, circular_icon_request_new.icon.scaledSize);

  let _markers = Object.assign({}, markers);
  for (var i in _markers){
    const marker = Object.assign({}, _markers[i]);
    marker.anchor={ x: 0.5, y: 0.40 }
    const url_type = addIconByType(marker);

    if(url_type.type == 'square_icon'){
      marker.icon = Object.assign({},square_icon_resizable.icon);
      marker.shape = Object.assign({},square_icon_resizable.shape);
    }
    if(url_type.type == 'circular_icon'){
      marker.icon = Object.assign({},circular_icon_resizable.icon);
      marker.shape = Object.assign({},circular_icon_resizable.shape);
    }

    if(url_type.type == 'circular_icon_rider'){
      marker.icon = Object.assign({},circular_icon_rider_resizable.icon);
      marker.shape = Object.assign({},circular_icon_rider_resizable.shape);
    }

    if(url_type.type == 'circular_icon_request_in_process'){
      marker.icon = Object.assign({},circular_icon_request_in_process_resizable.icon);
      marker.shape = Object.assign({},circular_icon_request_in_process_resizable.shape);
    }

    if(url_type.type == 'circular_icon_request_new'){
      marker.icon = Object.assign({},circular_icon_request_new_resizable.icon);
      marker.shape = Object.assign({},circular_icon_request_new_resizable.shape);
    }

    marker.icon.url = url_type.url;
    marker['url']=url_type.url;

    marker['position'] = {
      lat: marker.latitude,
      lng: marker.longitude
    };
    marker['zIndex'] =  url_type.zIndex;
    _markers[i] = marker;
  }
  return _markers;
}

function addIconByType(marker) {
  // console.log('addIconByType', marker)
  let url = '';
  let type = '';
  let status = '';
  let zIndex = 1;
  if(marker.type){
    type = marker.type;
    // console.log('show type marker',type)
    switch (type) {
      case 'RIDER':
        url += '/images/markers/rider';
        break;
      case 'REQUEST':
        url += '/images/markers/request';
        break;
      case 'ADDRESS':
        url += '/images/markers/address';
        break;
      default:
        url += '/images/markers/'+type;
    }
    status = `${type}-${marker.status}`;
    // console.log('nuevo status', status)
    switch (status){
      case 'RIDER-DELIVERING': //Para Rider
        url += '/marker-rider-in-process.png';
        type = 'circular_icon_rider';
        zIndex = 2;
        break;
      case 'RIDER-CHECKOUT': //Para Rider
        url += '/marker-rider-in-process.png';
        type = 'circular_icon_rider';
        zIndex = 2;
        break;
      case 'RIDER-ACTIVE': //Para Rider
        url += '/marker-rider-available.png';
        type = 'circular_icon_rider';
        zIndex = 2;
        break;

      case 'ADDRESS-FROM-ADDRESS': //Para dirección inicio
        url += '/add-from.png';
        type = 'circular_icon_rider';
        zIndex = 2;
        break;
      case 'ADDRESS-TO-ADDRESS': //Para dirección fin
        url += '/add-to.png';
        type = 'circular_icon_rider';
        zIndex = 2;
        break;

      case 'REQUEST-ARRIVED': //Para Request
        url += '/marker-service-in-process.png';
        type = 'circular_icon_request_in_process';
        break;
      case 'REQUEST-PICKINGUP': //Para Request
        url += '/marker-service-in-process.png';
        type = 'circular_icon_request_in_process';
         break;
      case 'REQUEST-DELIVERING': //Para Request
        url += '/marker-service-in-process.png';
        type = 'circular_icon_request_in_process';
        break;
      case 'REQUEST-NEW': //Para Request
        url += '/marker-service-new.png';
        type = 'circular_icon_request_new';
        break;
      default:
        url += '/default.png'
        type = 'square_icon';
    }
  }
  return {url , type , zIndex};
}

function resizableIcon(fromIcon, shapeIcon, scaledSize) {
  console.log('a',fromIcon )
  console.log('b',shapeIcon )
  console.log('c',scaledSize )
  let icon = {};
  let shape = {};
  if(scaledSize){
    const widthScaledSize = fromIcon.size.width/scaledSize.width;
    const heightScaledSize = fromIcon.size.height/scaledSize.height;

    icon = {
      url: fromIcon.url,
      // scaledSize: new google.maps.Size(50, 100),
      // iconAnchor: [25,100],
      // size: {
      //   width: fromIcon.size.width/widthScaledSize,
      //   height: fromIcon.size.height/heightScaledSize,
      //   j: fromIcon.size.j,
      //   f: fromIcon.size.f,
      // },
      // origin: {
      //   x: fromIcon.origin.x/widthScaledSize,
      //   y: fromIcon.origin.y/heightScaledSize,
      // },
      // anchor: {
      //   x: fromIcon.anchor.x/widthScaledSize,
      //   y: fromIcon.anchor.y/heightScaledSize,
      // },
      scaledSize: {
        width: scaledSize.width,
        height: scaledSize.height,
        j: scaledSize.j,
        f: scaledSize.f,
      },
      iconAnchor: [scaledSize.width/2,scaledSize.height]
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