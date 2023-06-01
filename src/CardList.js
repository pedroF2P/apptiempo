import { Card } from './Card';

export const CardList = () => {

  const $ = (selector) => document.createElement(selector);
  const $$ = (root, child) => root.append(child);

  const $app = document.querySelector('#app');

  const $header = $('header');
  const $main = $('main');

  $$($app, $header);
  $$($app, $main);

  const $input = $('input');

  const $btn = $('button');
  $btn.textContent = 'Añadir ciudad';

  const $btnReset = $('button');
  $btnReset.textContent = 'Borrar ciudades';

  $$($header, $input);
  $$($header, $btn);
  $$($header, $btnReset);

  $btn.addEventListener('click', () => {
    const city = $input.value;
    Card(city).then(city => {
      if (!city) return;

      $$($main, city);
      $input.value = '';
      $input.focus();
    });
  });
  $input.addEventListener('keydown', (e) => {
    if (e.keyCode !== 13) return;

    const city = $input.value;
    Card(city).then(city => {
      if (!city) return;

      $$($main, city);
      $input.value = '';
      $input.focus();
    });
  });

  $btnReset.addEventListener('click', () => {
    $main.textContent = '';
    $input.value = '';
    $input.focus();
  });

};