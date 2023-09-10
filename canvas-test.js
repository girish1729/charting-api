const { createCanvas, loadImage } = require('canvas')
const fs = require('fs');

/*
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)
 
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()
 
loadImage('./imgs.jpg').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)
 
  console.log('<img src="' + canvas.toDataURL() + '" />')
})
*/


const width = 1200
const height = 600

//choose here were your file must be saved
let imagepath = "images/photo.png"

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')


//ctx.fillStyle = '#f9e79f'
ctx.fillRect(0, 0, width, height)
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)
 

//here is the new part that saves the image to a path
const out = fs.createWriteStream(imagepath),
stream = canvas.createPNGStream();
stream.pipe(out);

