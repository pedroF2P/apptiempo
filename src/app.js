import ColorThief from 'colorthief/dist/color-thief.modern.mjs'

const colorThief = new ColorThief();

const clima = async (lugar) => {
  const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + lugar;
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '1592e28623msha1546bdbbb37bf4p1bec8djsn65cf0e56a3df',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
  } catch (error) {
    return error.mensaje;
  }
}


const $ = ( selector ) => document.createElement(selector)


export const card = () => {
  const $card = $('div')
  const $h1 = $('h1');
  const $h2 = $('h2');
  const $h3 = $('h3');
  const $p = $('p');
  const $img = $('img')
  const $pre = $('pre')

  $card.style.width = '350px'
  $card.style.margin = '20px auto'
  $card.style.padding = '50px'
  $card.style.borderRadius = '30px'
  $card.style.boxSizing = 'border-box'
  $card.style.boxShadow = '10px 10px 20px rgba(0,0,0,.5)'

  const $clima = clima('campeche');

  $clima.then( ( data ) =>  {
    const {location, current} = JSON.parse(data)
    console.log(location, current)
    $h1.textContent = current.temp_c + 'º'
    $h2.textContent = location.name
    $h3.textContent = current.feelslike_c + 'º'
    $p.textContent = current.condition.text
    $img.src = current.condition.icon;
    $img.crossOrigin = 'Anonymous';
    $pre.textContent = JSON.stringify(JSON.parse(data), null, 2)


    $img.addEventListener('load', function() {

      // colorColor
      const [r,g,b] = colorThief.getColor($img);
      $card.style.backgroundColor = `rgba(${r},${g},${b},0.2)`


      // colorPalette
      const colorPalette = colorThief.getPalette($img)

      colorPalette.forEach( ([r,g,b]) => {
        const $box = $('div')
        $box.classList.add('box')
        $box.style.width = '50px'
        $box.style.height = '50px'
        $box.style.border = '1px solid black'
        $box.style.backgroundColor = `rgb(${r},${g},${b})`
        // $card.append($box)
      })
    });

  })


  $card.append($h1);
  $card.append($h2);
  $card.append($h3);
  $card.append($p);
  $card.append($img);
  // $card.append($pre);

  return $card;
}



