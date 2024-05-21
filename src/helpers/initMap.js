//// Инициализация работы карты Yandex.Maps API

// Создаём асинхронную функцию определения Яндес.Карты
export async function initMap(longitude, latitude, mapBlock) {
  //Дожидаемся получения всего промиса карты после чего он будет автоматически зарезолвен
  await ymaps3.ready;
  // Создаём переменные экземпляров объектов, которые доступны только в глобальном объекте ymaps3
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;

  // Инициализируем первоначальную курту, в которую передаём полученные координаты и задаём свойства доступные из API
  const map = new YMap(mapBlock, {
    location: {
      center: [longitude, latitude],
      zoom: 11,
    },
  });

  // Инициализируем слои при помощи экзмепляра объекта YMapDefaultSchemeLayer()
  map.addChild(new YMapDefaultSchemeLayer());
  // Инициализируем слои и геообъекты при помощи экзмепляра объекта YMapDefaultFeaturesLayer()
  map.addChild(new YMapDefaultFeaturesLayer());

  // Инициализируем маркер YMapMarker, создаём под него элемент для кастомизации (можно закастомить через html/css), переданные полученные координаты для отрисовки маркера
  const contentMarker = document.createElement('section');
  const marker = new YMapMarker(
    {
      coordinates: [longitude, latitude],
      draggable: true,
    },
    contentMarker
  );

  map.addChild(marker);
  // Задаём название маркера
  contentMarker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`;

  // Выбираем NodeList всех блоков карты из DOM
  const contentYAMP = document.querySelectorAll('.ymaps3x0--map-container');
  // Преобразуем NodeList в массив
  const contentYAMPAray = [...contentYAMP];
  if (contentYAMPAray.length > 1) {
    contentYAMPAray[0].remove();
  }
  // console.log(contentYAMPAray);
}
