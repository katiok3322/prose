<template>
  <div class="home-page">
    <div class="container">
      <section class="hero">
        <div class="hero-left">
          <h1 class="hero-title">
            Лучшая косметология
            <span class="hero-location">Владивостока</span>
          </h1>

          <div class="hero-image-wrap">
            <img src="@/assets/mainface.jpg" alt="face" class="hero-img" />

            <div class="cta-pill">
              <a
                href="https://t.me/+f-zklbsx0sU2M2Ji"
                target="_blank"
                rel="noopener noreferrer"
                class="telegram-widget"
              >
                <img src="@/assets/tg.png" alt="Telegram" class="tg-icon" />
                <div class="tg-text">
                  <span class="tg-title">Наш телеграм канал</span>
                  <span class="tg-subtitle">Подписаться →</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <h2 class="hero-claim">
            Улучшите баланс<br />
            между работой,<br />
            личной жизнью,<br />
            своим здоровьем
          </h2>

          <p class="hero-sub">знакомьтесь с нашими ← предложениями</p>

          <div class="hero-buttons">
            <router-link to="/price" class="btn-purple">наши</router-link>
            <router-link to="/price" class="btn-purple">программы</router-link>
          </div>
        </div>
      </section>

      <section class="three-cards">
        <article class="card">
          <div class="card-image-container">
            <img src="@/assets/card1.jpg" alt="service 1" />
            <div class="card-text-overlay">
              <div class="card-title">КОСМЕТОЛИСТИЯ.</div>
              <div class="card-subtitle">НАШИ УСЛУГИ</div>
            </div>
          </div>
          <router-link to="/price" class="card-badge-purple">перейти →</router-link>
        </article>

        <article class="card">
          <div class="card-image-container">
            <img src="@/assets/card2.jpg" alt="service 2" />
            <div class="card-text-overlay"></div>
          </div>
        </article>

        <article class="card">
          <div class="card-image-container">
            <img src="@/assets/card3.jpg" alt="service 3" />
            <div class="card-text-overlay">
              <div class="card-title">СПЕЦИАЛЬНЫЕ</div>
              <div class="card-subtitle">ПРЕДЛОЖЕНИЯ</div>
            </div>
          </div>
          <router-link to="/price" class="card-badge-purple">перейти →</router-link>
        </article>
      </section>

      <hr class="divider" />

      <section class="promo">
        <p class="promo-text">
          Заботьтесь о себе, доверяйте природе и выбирайте натуральные эко-решения для
          красоты и здоровья вместе с нами! (Продукция в подарок)
        </p>

        <div class="promo-grid">
          <div class="promo-left">
            <img src="@/assets/bottle1.jpg" alt="bottles" />
          </div>
          <div class="promo-right">
            <img src="@/assets/bottle2.jpg" alt="cream" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  width: 1440px;
  margin: 0 auto;
  padding: 30px 0 80px;
  font-family: "Source Serif Pro", serif;
  color: #111;
}

.hero {
  display: flex;
  gap: 280px;
  background: #efefef;
  border-radius: 14px;
  border: 2px solid #cfcfcf;
  padding: 35px;
  align-items: flex-start;
  font-size: 25px;
}

.hero-left {
  width: 49%;
}
.hero-title {
  margin: 6px 6px 18px 6px;
  font-size: 36px;
  line-height: 1.02;
  font-weight: 100;
}
.hero-location {
  display: block;
  font-weight: 700;
  font-size: 35px;
  margin-top: 6px;
}

.hero-image-wrap {
  position: relative;
  margin-top: 25px;
}
.hero-img {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.cta-pill {
  position: absolute;
  left: 1px;
  bottom: -20px;
  width: 320px;
  height: 70px;
  background: linear-gradient(135deg, #5f81ca 0%, #8249c4 100%); /* Фиолетовый градиент */
  border-radius: 28px;
  box-shadow: 0 4px 15px rgba(95, 129, 202, 0.3);
  display: flex;
  align-items: center;
  padding: 0 15px;
  transition: all 0.3s ease;
  border: none;
}

.cta-pill:hover {
  box-shadow: 0 8px 25px rgba(95, 129, 202, 0.4);
  transform: translateY(-3px);
  background: linear-gradient(135deg, #4d6fb0 0%, #7039a9 100%);
}

.telegram-widget {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.tg-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background: white;
  border-radius: 50%;
  padding: 6px;
}

.telegram-widget:hover .tg-icon {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.tg-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex-grow: 1;
}

.tg-title {
  font-size: 15px;
  font-weight: 600;
  color: white;
  letter-spacing: 0.3px;
}

.tg-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
  transition: color 0.3s;
}

.telegram-widget:hover .tg-subtitle {
  color: rgba(255, 255, 255, 1);
  transform: translateX(2px);
  transition: all 0.3s;
}

.hero-right {
  width: 30%;
  text-align: right;
  padding: 12px 20px;
}
.hero-claim {
  font-size: 45px;
  line-height: 1.08;
  margin: 0;
  font-weight: 100;
}
.hero-sub {
  margin-top: 18px;
  color: #666;
  font-weight: 300;
}
.hero-buttons {
  margin-top: 1px;
  display: flex;
  justify-content: flex-end;
  gap: 13px;
}

.btn-purple {
  display: inline-block;
  padding: 10px 22px;
  border-radius: 22px;
  background: linear-gradient(135deg, #5f81ca 0%, #8249c4 100%);
  text-decoration: none;
  color: white;
  font-weight: 700;
  transition: all 0.3s;
  border: none;
  box-shadow: 0 4px 10px rgba(95, 129, 202, 0.3);
}

.btn-purple:hover {
  background: linear-gradient(135deg, #4d6fb0 0%, #7039a9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(95, 129, 202, 0.4);
  color: white;
}

.three-cards {
  display: flex;
  gap: 45px;
  margin-top: 40px;
}
.card {
  width: calc((100% - 56px) / 3);
  background: #fff;
  border-radius: 18px;
  padding: 8px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.18);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  position: relative;
  width: 100%;
  height: 330px;
  overflow: hidden;
  border-radius: 14px;
}

.card-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-text-overlay {
  position: absolute;
  top: 60px;
  left: 20px;
  text-align: left;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.card-subtitle {
  font-size: 18px;
  font-weight: 600;
}

.card-badge-purple {
  position: absolute;
  left: 16px;
  top: 16px;
  background: linear-gradient(135deg, #5f81ca 0%, #8249c4 100%);
  border-radius: 14px;
  padding: 6px 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
  text-decoration: none;
  color: white;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(95, 129, 202, 0.3);
}

.card-badge-purple:hover {
  background: linear-gradient(135deg, #4d6fb0 0%, #7039a9 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(95, 129, 202, 0.4);
  color: white;
}

.divider {
  margin: 32px 0;
  border: none;
  height: 1px;
  background: #bfbfbf;
}

.promo-text {
  color: #666;
  font-size: 23px;
  line-height: 1.6;
  margin-bottom: 18px;
}
.promo-grid {
  display: flex;
  gap: 20px;
}

.promo-left,
.promo-right {
  background: #fff;
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: transform 0.3s;
}

.promo-left:hover,
.promo-right:hover {
  transform: translateY(-3px);
}

.promo-left img,
.promo-right img {
  width: 100%;
  height: 550px;
  object-fit: cover;
  border-radius: 12px;
}

@media (max-width: 1200px) {
  .container {
    width: 100%;
    padding: 20px;
    max-width: 100%;
  }
  .hero {
    flex-direction: column;
    gap: 30px;
  }
  .hero-left,
  .hero-right {
    width: 100%;
    text-align: left;
  }
  .hero-right {
    padding: 12px 0 0;
    text-align: center;
  }
  .hero-buttons {
    justify-content: center;
  }
  .three-cards {
    flex-direction: column;
    gap: 20px;
  }
  .card {
    width: 100%;
  }
  .card-text-overlay {
    top: 50px;
  }
  .promo-grid {
    flex-direction: column;
    gap: 20px;
  }
  .cta-pill {
    left: 50%;
    transform: translateX(-50%);
    width: 280px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 20px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-location {
    font-size: 26px;
  }

  .hero-claim {
    font-size: 32px;
  }

  .hero-sub {
    font-size: 18px;
  }

  .promo-text {
    font-size: 18px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-subtitle {
    font-size: 16px;
  }

  .card-image-container {
    height: 250px;
  }

  .card-text-overlay {
    top: 40px;
    left: 15px;
  }

  .promo-left img,
  .promo-right img {
    height: 300px;
  }

  .cta-pill {
    width: 250px;
    height: 60px;
    bottom: -15px;
  }

  .tg-title {
    font-size: 13px;
  }

  .tg-subtitle {
    font-size: 11px;
  }

  .tg-icon {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
  }

  .hero {
    padding: 15px;
  }

  .hero-title {
    font-size: 24px;
  }

  .hero-location {
    font-size: 22px;
  }

  .hero-claim {
    font-size: 26px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-subtitle {
    font-size: 14px;
  }

  .hero-img {
    max-height: 300px;
  }

  .card-image-container {
    height: 200px;
  }

  .card-text-overlay {
    top: 30px;
    left: 15px;
  }

  .cta-pill {
    width: 220px;
    height: 55px;
    padding: 0 10px;
  }

  .tg-icon {
    width: 26px;
    height: 26px;
  }
}
</style>
