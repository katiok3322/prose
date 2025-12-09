<template>
  <header class="header">
    <nav class="navbar">
      <div class="nav-container">
        <router-link
          to="/"
          class="logo"
          @mouseenter="logoHover = true"
          @mouseleave="logoHover = false"
        >
          PROSE
          <span v-if="logoHover" class="logo-hint">На главную</span>
        </router-link>

        <div class="nav-links">
          <router-link to="/">Главная</router-link>
          <router-link to="/price">Услуги</router-link>
          <router-link to="/about">О нас</router-link>
          <router-link to="/contact">Контакты</router-link>
          <router-link to="/login" class="login-btn">Вход</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const logoHover = ref(false);

function goHome() {
  router.push("/");
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 2px;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.logo:hover {
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.logo-hint {
  font-size: 0.7rem;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 0.7;
    transform: translateX(-50%) translateY(0);
  }
}
.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-links a.router-link-active {
  background: white;
  color: #667eea;
  font-weight: 500;
}

.login-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
}

.login-btn:hover {
  background: white;
  color: #667eea;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .nav-links a {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .logo-hint {
    display: none;
  }
}
</style>
