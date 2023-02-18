function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = e => reject(new Error(e));
      image.src = src;
    });
  }
  async function main() {
    const src = 'images/unsplash/makhmutova-dina-1580313-unsplash.jpg';
    const options = {
      width: 100,
      height: 100
    };
    const image = await loadImage(src);
    const crops = await smartcrop.crop(image, options);
    console.log('crops', crops);
    showCroppedImage(src, crops.topCrop, options)
  }
  function showCroppedImage(src, crop, options) {
    const div = document.createElement('div');
    const style = div.style;
    style.backgroundImage = `url('${src}')`;
    const scale = options.width / crop.width;
    style.backgroundPositionX = crop.x * scale + 'px';
    style.backgroundPositionY = -crop.y * scale + 'px';
    style.backgroundSize = '100%';
    style.width = options.width + 'px';
    style.height = options.height + 'px';
    document.body.appendChild(div);
  }
  main();