// Получение случайного изображения из Unsplash
async function getRandomImage() {
    const apiKey = 'G_31A0Te3Hq5or9mxxgVLgzFL5ZwF0JUsq-z78du3I8';
    const apiUrl = 'https://api.unsplash.com/photos/random';
    try {
      const response = await fetch(`${apiUrl}?client_id=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Отображение информации о фотографе
  function displayPhotographerInfo(photographerName) {
    const photographerElement = document.getElementById('photographerName');
    photographerElement.textContent = `Photographer: ${photographerName}`;
  }
  
  // Обновление счетчика лайков
  function updateLikeCount(likeCount) {
    const likeCountElement = document.getElementById('likeCount');
    likeCountElement.textContent = likeCount;
  }
  
  // Проверка, лайкнул ли пользователь уже текущее изображение
  function isLiked(imageId) {
    const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
    return likedImages.includes(imageId);
  }
  
  // Добавление или удаление лайка
  function toggleLike(imageId) {
    let likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
    if (isLiked(imageId)) {
      likedImages = likedImages.filter(id => id !== imageId);
    } else {
      likedImages.push(imageId);
    }
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
  }
  
  // Обновление состояния кнопки "лайк"
  function updateLikeButton(imageId) {
    const likeButton = document.getElementById('likeButton');
    likeButton.textContent = isLiked(imageId) ? 'Unlike' : 'Like';
  }
  
  // Добавление фотографии в историю просмотров
  function addToHistory(imageData) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(imageData);
    localStorage.setItem('history', JSON.stringify(history));
  }
  
  // Загрузка случайного изображения и отображение информации о фотографе
  async function loadRandomImage() {
    const randomImage = await getRandomImage();
    const imageElement = document.getElementById('randomImage');
    imageElement.src = randomImage.urls.regular;
    displayPhotographerInfo(randomImage.user.name);
    updateLikeCount(randomImage.likes);
    updateLikeButton(randomImage.id);
    localStorage.setItem('currentImageId', randomImage.id);
    // Добавление фотографии в историю просмотров
    addToHistory(randomImage);
  }
  
  // Обработчик события для кнопки "лайк"
  document.getElementById('likeButton').addEventListener('click', () => {
    const currentImageId = localStorage.getItem('currentImageId');
    toggleLike(currentImageId);
    updateLikeButton(currentImageId);
    const likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
    updateLikeCount(likedImages.length);
  });
  
  // Инициализация
  const initialLikeCount = JSON.parse(localStorage.getItem('likedImages'))?.length || 0;
  updateLikeCount(initialLikeCount);
  loadRandomImage();
  