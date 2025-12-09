<template>
  <div class="price-page">
    <button @click="goBack" class="back-button">
      <span class="arrow">←</span> Вернуться назад
    </button>

    <h1 class="page-title">Прайс-лист</h1>

    <p class="page-description">
      Выбирайте из нашего каталога услуг. Все процедуры проводятся сертифицированными
      специалистами на современном оборудовании.
    </p>

    <div class="services-container">
      <div class="service-card">
        <div class="service-image-container">
          <img
            src="@/assets/price/1.png"
            alt="Лазерная эпиляция"
            class="service-image"
            @error="handleImageError"
          />
          <div class="service-badge">Популярно</div>
        </div>

        <div class="service-content">
          <div class="service-header">
            <h3 class="service-name">Лазерная эпиляция</h3>
            <div class="service-price">
              <span class="price-amount">от 5000Р</span>
              <span class="price-note">за процедуру</span>
            </div>
          </div>

          <div class="service-details">
            <p class="service-description">
              Безбопасное и безболезненное удаление нежелательных волос лазером. Результат
              заметен уже после первой процедуры.
            </p>

            <div class="service-info">
              <h4>Что входит:</h4>
              <ul>
                <li>Консультация специалиста</li>
                <li>Обезболивающий гель</li>
                <li>Обработка после процедуры</li>
                <li>Рекомендации по уходу</li>
              </ul>
            </div>
          </div>

          <button @click="bookService('Лазерная эпиляция', 5000)" class="book-button">
            Записаться на услугу
            <span class="button-icon">→</span>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-image-container">
          <img
            src="@/assets/price/2.png"
            alt="Rf-лифтинг лица"
            class="service-image"
            @error="handleImageError"
          />
        </div>

        <div class="service-content">
          <div class="service-header">
            <h3 class="service-name">Rf-лифтинг лица</h3>
            <div class="service-price">
              <span class="price-amount">от 35000Р</span>
              <span class="price-note">за курс</span>
            </div>
          </div>

          <div class="service-details">
            <p class="service-description">
              Омоложение кожи с помощью радиочастотного воздействия. Улучшает тонус,
              разглаживает морщины, подтягивает контур лица.
            </p>

            <div class="service-info">
              <h4>Результат:</h4>
              <ul>
                <li>Улучшение тонуса кожи</li>
                <li>Разглаживание морщин</li>
                <li>Лифтинг-эффект</li>
                <li>Увлажнение и питание</li>
              </ul>
            </div>
          </div>

          <button @click="bookService('Rf-лифтинг лица', 35000)" class="book-button">
            Записаться на услугу
            <span class="button-icon">→</span>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-image-container">
          <img
            src="@/assets/price/3.png"
            alt="Ультразвуковая кавитация"
            class="service-image"
            @error="handleImageError"
          />
        </div>

        <div class="service-content">
          <div class="service-header">
            <h3 class="service-name">Ультразвуковая кавитация</h3>
            <div class="service-price">
              <span class="price-amount">от 1500Р</span>
              <span class="price-note">за процедуру</span>
            </div>
          </div>

          <div class="service-details">
            <p class="service-description">
              Безоперационная коррекция фигуры ультразвуком. Уменьшает объемы, борется с
              целлюлитом, моделирует силуэт.
            </p>

            <div class="service-info">
              <h4>Эффект:</h4>
              <ul>
                <li>Уменьшение объемов</li>
                <li>Борьба с целлюлитом</li>
                <li>Улучшение контуров тела</li>
                <li>Выведение токсинов</li>
              </ul>
            </div>
          </div>

          <button
            @click="bookService('Ультразвуковая кавитация', 1500)"
            class="book-button"
          >
            Записаться на услугу
            <span class="button-icon">→</span>
          </button>
        </div>
      </div>

      <div class="service-card">
        <div class="service-image-container">
          <img
            src="@/assets/price/4.png"
            alt="Вакуумно-роликовый массаж"
            class="service-image"
            @error="handleImageError"
          />
        </div>

        <div class="service-content">
          <div class="service-header">
            <h3 class="service-name">Вакуумно-роликовый массаж</h3>
            <div class="service-price">
              <span class="price-amount">от 1500Р</span>
              <span class="price-note">за процедуру</span>
            </div>
          </div>

          <div class="service-details">
            <p class="service-description">
              LPG-массаж для коррекции фигуры и борьбы с целлюлитом. Улучшает
              кровообращение, лимфоток и тонус кожи.
            </p>

            <div class="service-info">
              <h4>Преимущества:</h4>
              <ul>
                <li>Антицеллюлитный эффект</li>
                <li>Улучшение лимфодренажа</li>
                <li>Повышение упругости кожи</li>
                <li>Общее расслабление</li>
              </ul>
            </div>
          </div>

          <button
            @click="bookService('Вакуумно-роликовый массаж', 1500)"
            class="book-button"
          >
            Записаться на услугу
            <span class="button-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const imageErrors = ref({});

function goBack() {
  router.back();
}

function bookService(serviceName, price) {
  const serviceData = {
    name: serviceName,
    price: price,
    date: new Date().toLocaleDateString("ru-RU"),
  };

  localStorage.setItem("selectedService", JSON.stringify(serviceData));

  router.push("/contact");
}

function goToContacts() {
  router.push("/contact");
}

function handleImageError(event) {
  const imgSrc = event.target.src;
  const serviceName = event.target.alt;

  console.error(`Ошибка загрузки изображения: ${serviceName} (${imgSrc})`);

  event.target.src =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f0f0f0"/><text x="200" y="150" font-family="Arial" font-size="20" text-anchor="middle" fill="%23666">' +
    serviceName +
    "</text></svg>";

  imageErrors.value[serviceName] = true;
}
function checkImages() {
  const services = [
    { src: "@/assets/price/1.png", alt: "Лазерная эпиляция" },
    { src: "@/assets/price/2.png", alt: "Rf-лифтинг лица" },
    { src: "@/assets/price/3.png", alt: "Ультразвуковая кавитация" },
    { src: "@/assets/price/4.png", alt: "Вакуумно-роликовый массаж" },
  ];

  services.forEach((service) => {
    const img = new Image();
    img.src = service.src;
    img.onload = () => console.log(`✅ Изображение загружено: ${service.alt}`);
    img.onerror = () => console.error(`❌ Ошибка загрузки: ${service.alt}`);
  });
}

checkImages();
</script>

<style scoped>
.price-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;
}

.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  font-family: "Source Serif Pro", serif;
  cursor: pointer;
  padding: 12px 0;
  margin-bottom: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;
}

.back-button:hover {
  color: #333;
}

.arrow {
  font-size: 18px;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 300;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
  letter-spacing: 0.5px;
}

.page-description {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
  line-height: 1.6;
}

.services-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 60px;
}

.service-card {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #eee;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.service-image-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 300px;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.service-card:hover .service-image {
  transform: scale(1.03);
}

.service-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff4081;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.service-content {
  padding: 30px 30px 30px 0;
  display: flex;
  flex-direction: column;
}

.service-header {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f5f5f5;
}

.service-name {
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 10px 0;
  font-weight: 600;
  line-height: 1.3;
}

.service-price {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.price-amount {
  font-size: 2.2rem;
  font-weight: 700;
  color: #ff4081;
  background: linear-gradient(45deg, #ff4081, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.price-note {
  font-size: 1rem;
  color: #888;
}

.service-details {
  flex: 1;
}

.service-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 25px;
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
}

.feature-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f8f9ff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  color: #667eea;
  border: 1px solid #e6e9ff;
}

.feature-icon {
  font-size: 1.1rem;
}

.service-info {
  margin-bottom: 30px;
}

.service-info h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
}

.service-info ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-info li {
  padding: 6px 0;
  color: #666;
  position: relative;
  padding-left: 24px;
}

.service-info li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}
.book-button {
  margin-top: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Source Serif Pro", serif;
}

.book-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.button-icon {
  font-size: 1.2rem;
  transition: transform 0.3s;
}

.book-button:hover .button-icon {
  transform: translateX(5px);
}

.cta-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Source Serif Pro", serif;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.2);
}

@media (max-width: 1024px) {
  .service-card {
    grid-template-columns: 350px 1fr;
    gap: 30px;
  }
}

@media (max-width: 900px) {
  .service-card {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .service-image-container {
    height: 250px;
  }

  .service-content {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .price-page {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .services-container {
    gap: 30px;
  }

  .service-name {
    font-size: 1.5rem;
  }

  .price-amount {
    font-size: 1.8rem;
  }

  .call-to-action {
    padding: 30px 20px;
  }

  .call-to-action h2 {
    font-size: 1.7rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .service-features {
    flex-direction: column;
    align-items: flex-start;
  }

  .book-button {
    padding: 14px 24px;
    font-size: 1rem;
  }

  .cta-button {
    padding: 14px 30px;
    font-size: 1rem;
  }
}
</style>
