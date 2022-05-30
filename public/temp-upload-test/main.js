let videoPlayer = document.querySelector('#player');
let canvasElement = document.querySelector('#canvas');
let captureButton = document.querySelector('#capture-btn');
let newCaptureButton = document.querySelector('#new-capture-btn');
let imagePicker = document.querySelector('#image-picker');
let imagePickerArea = document.querySelector('#pick-image');
let picture;

let locationBtn = document.querySelector('#location-btn');
let locationDisplay = document.querySelector('#location-display');
let locationLoader = document.querySelector('#location-loader');
let fetchedLocation = { lat: 0, lng: 0 };
let address;

let postBtn = document.querySelector('#post-btn');
let savedPicture = document.querySelector('#saved-picture');

// click listeners
newCaptureButton.addEventListener('click', initializeMedia)
locationBtn.addEventListener('click', getGeolocation);
postBtn.addEventListener('click', uploadPicture)
captureButton.addEventListener('click', captureImage);


initializeMedia()

// function to start the camera, and stream it to
// a video-element. When 'Capture'-button is clicked
// the video stops, and the image gets loaded into 
// a canvas-element. This is to enable the image
// to be converted into a file
async function initializeMedia() {
  captureButton.style.display = 'block';
  newCaptureButton.style.display = 'none';

  if (!('mediaDevices' in navigator)) {
    navigator.mediaDevices = {};
  }
  // handle different browser implementations
  if (!('getUserMedia' in navigator.mediaDevices)) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented!'));
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }

  // this prompts the user to enable the camera
  let stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user" // front-camera (back-camera is 'environment')
    }
  }).catch(() => {
    imagePickerArea.style.display = 'block';
  });

  // stream the camera-image to the video
  videoPlayer.srcObject = stream;
  videoPlayer.style.display = 'block';
  canvasElement.style.display = 'none';
}

function captureImage() {
  // replace video player with canvas showing the picture
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  captureButton.style.display = 'none';
  newCaptureButton.style.display = 'block';

  // take the image from the videoplayer and add to the canvas
  // to enable converting the image to a blob (file)
  let context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));

  // stop player
  videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
    track.stop();
  });

  // store picture blob in variable, and set quality to 80%
  // to decrease file-size
  picture = dataURItoBlob(canvasElement.toDataURL('image/jpeg', 0.8));
}

// load image from file-picker
imagePicker.addEventListener('change', (event) => {
  picture = event.target.files[0];
});


function getGeolocation() {
  locationDisplay.innerHTML = ''

  if (!('geolocation' in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    fetchedLocation = { lat: position.coords.latitude, lng: position.coords.longitude };

    address = await fetch(`https://geocode.xyz/${fetchedLocation.lat},${fetchedLocation.lng}?geoit=json`)
    address = await address.json()
    console.log('address', address);

    locationDisplay.insertAdjacentHTML('beforeend', `
      lat: ${fetchedLocation.lat}
      <br>
      lng: ${fetchedLocation.lng}
      <br><br>
      city: ${address.city}
      <br>
      street: ${address.staddress}
    `)
  },
    function (err) {
      console.log('error on fecthing location', err);
      alert('Couldn\'t fetch location!');
      fetchedLocation = { lat: 0, lng: 0 };

      // timeout: amount of time before the error callback is invoked
    }, { timeout: 7000 });
}


// function that stores file and address 
// in FormData, and then sends it to the server
async function uploadPicture() {
  let formData = new FormData()

  formData.append('file', picture, Date.now() + '.jpg')
  formData.append('location', JSON.stringify(fetchedLocation))
  formData.append('address', JSON.stringify(address))
  formData.append('id', 17);

  let res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })

  res = await res.json()
  console.log('result of upload', res);

  // display uploaded picture
  savedPicture.src = '/images/products/17.jpg'
}

// helper function to convert canvas image to file
function dataURItoBlob(dataURI) {
  let byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ab], { type: mimeString });
  return blob;
}