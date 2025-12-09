<template>
  <footer class="footer-minimal">
    <div class="footer-container">
      <div class="footer-row">
        <div class="brand">
          <span class="brand-name">PROSE</span>
          <span class="brand-dot">•</span>
          <span class="brand-year">© {{ currentYear }}</span>
        </div>

        <div class="telegram-section">
          <a href="https://t.me/+f-zklbsx0sU2M2Ji" target="_blank" class="tg-minimal">
            <img src="@/assets/tg.png" alt="Telegram" class="tg-minimal-icon" />
            <span>Наш канал</span>
          </a>
        </div>
      </div>

      <div class="footer-row bottom-row">
        <p class="rights-text">
          Все права защищены. Сертифицированная косметологическая клиника.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentYear = ref("");

onMounted(() => {
  currentYear.value = new Date().getFullYear();
});
</script>

<style scoped>
.footer-minimal {
  background: #f8f8f8;
  color: #555;
  padding: 25px 0;
  border-top: 1px solid #eaeaea;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

@media (min-width: 768px) {
  .footer-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.brand-name {
  font-weight: 600;
  color: #333;
  letter-spacing: 1px;
}

.brand-dot {
  color: #999;
  font-size: 20px;
}

.brand-year {
  color: #777;
  font-weight: 400;
}

.telegram-section {
  display: flex;
  align-items: center;
}

.tg-minimal {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #666;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.tg-minimal:hover {
  color: #333;
  background: rgba(0, 0, 0, 0.03);
  border-color: #e0e0e0;
}

.tg-minimal-icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.tg-minimal:hover .tg-minimal-icon {
  opacity: 1;
}

.bottom-row {
  padding-top: 15px;
  border-top: 1px solid #eee;
  margin-top: 10px;
  margin-bottom: 0;
}

.rights-text {
  font-size: 13px;
  color: #777;
  margin: 0;
  text-align: center;
}

@media (min-width: 768px) {
  .rights-text {
    text-align: left;
  }
}

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-link:hover {
  color: #333;
}

.legal-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #666;
  transition: width 0.2s ease;
}

.legal-link:hover::after {
  width: 100%;
}

@media (max-width: 767px) {
  .footer-minimal {
    padding: 20px 0;
  }

  .legal-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .tg-minimal span {
    display: none;
  }

  .tg-minimal {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .brand {
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }

  .brand-dot {
    display: none;
  }
}
</style>
Ы
