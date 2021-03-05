const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API
const count = 10
const API_KEY='57rrnd4vocz0Q87mVkB9W6ICep6_aoii7fq_w8seZ0s'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

// Images Array
let imageArray = []
let ready = false
let imageLoad = 0
let totalImages = 0

// Check if all images is loaded
const imageLoaded = () => {
    imageLoad++
    if (imageLoad === totalImages) {
        ready = true
        loader.hidden=true
    }
}

const setAttributes = (elem, attr) => {
    for (const key in attr) {
        elem.setAttribute(key,attr[key])
    }
}


// Create Elements For Links & Photos, Add to DOM
const displayImage = () => {
    totalImages = imageArray.length
    imageLoad=0
    // Run func for each elements
    imageArray.forEach(photo => {
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            title: photo.alt_discription,
            alt: photo.alt_discription
        })

        // check the image loaded conpletely
        img.addEventListener('load', () => {
            imageLoaded()
        })
        
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Get photos from Unsplash API
const getImages = async () => {
    try {
        loader.hidden=false
        const response = await fetch(apiUrl)
        imageArray = await response.json()
        displayImage()
    } catch (error) {
    }
    
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready=false
        getImages()
    }
})

// On Load
getImages()