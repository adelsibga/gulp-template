document.addEventListener('DOMContentLoaded', () => {
  const googleMap = document.querySelector('#googleMap')

  if (googleMap.length > 0) {

  }
})

function loadGoogleMapsApi() {
  const script = document.createElement('script')
  script.src = ''
  document.body.appendChild(script)
}

function toggleClose() {
  const sliderLink = document.querySelector('.slider_link')
  sliderLink.addEventListener('click', () => {
    let item, patemt, sidebar
    item = this.data('name')
    parent =
      sidebar =
        sidebar.click
    sidebar.html(item + '<span>&nbsp;</span><span>&nbsp;</span>')
  })
}

function initMap() {
  const map = new google.maps.Map(document.getElementById('googleMap'), {
    center: {
      lat: 55.763729,
      lng: 37.654583,
    },
    zoom: 18,
    scrollwheel: true,
    disableDefaultUI: true,
    styles: {

    }
  })
}
