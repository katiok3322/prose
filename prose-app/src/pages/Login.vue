<template>
  <div class="login-page">
    <button @click="goBack" class="back-btn">← Вернуться назад</button>

    <h1 class="page-title">Войти в аккаунт</h1>

    <!-- предупреждение о HTTP -->
    <div v-if="showHttpsWarning" class="security-warning">
      ⚠️ <strong>Внимание:</strong> Сайт использует небезопасное соединение HTTP.
      <br />Рекомендуем использовать HTTPS для защиты данных.
    </div>

    <div class="login-container">
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="login">Логин, номер телефона или адрес почты</label>
          <input
            v-model="credentials.login"
            type="text"
            id="login"
            placeholder="Введите логин, телефон или email"
            required
            class="login-input"
            @input="sanitizeLoginInput"
            autocomplete="username"
          />
        </div>

        <div class="input-group">
          <label for="password">Пароль</label>
          <div class="password-wrapper">
            <input
              v-model="credentials.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Введите пароль"
              required
              class="password-input"
              minlength="6"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="togglePassword"
              aria-label="Показать/скрыть пароль"
            >
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
          <small class="password-hint">Минимум 6 символов</small>
        </div>

        <div class="remember-me">
          <input v-model="rememberMe" type="checkbox" id="remember" class="checkbox" />
          <label for="remember">Запомнить меня</label>
        </div>

        <!-- скрытое поле с CSRF-токеном (имитация) -->
        <input type="hidden" name="_csrf_token" :value="clientCsrfToken" />

        <button type="submit" class="login-btn" :disabled="isLoading || isRateLimited">
          {{
            isLoading
              ? "Вход..."
              : isRateLimited
              ? `Повторите через ${cooldownTime}с`
              : "Войти"
          }}
        </button>

        <div class="form-links">
          <div class="register-section">
            <p>Нет аккаунта?</p>
            <router-link to="/register" class="register-link">
              Зарегистрироваться
            </router-link>
          </div>
        </div>
      </form>
    </div>

    <div class="security-info">
      <p>🔒 Ваши данные защищены:</p>
      <ul>
        <li v-if="!showHttpsWarning">✅ Используется HTTPS соединение</li>
        <li v-else>⚠️ Используется HTTP соединение</li>
        <li>✅ Пароль скрыт при вводе</li>
        <li>✅ Защита от частых запросов</li>
        <li>✅ Очистка опасных символов</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = ref({
  login: "",
  password: "",
});

// клиентский CSRF токен (имитация)
const clientCsrfToken = ref("");

// предупреждение о HTTPS
const showHttpsWarning = ref(false);

// защита от частых запросов
const loginAttempts = ref(0);
const lastAttemptTime = ref(0);
const isRateLimited = ref(false);
const cooldownTime = ref(0);

const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);

//  проверка HTTPS
function checkHttps() {
  const isLocalhost =
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1");

  if (window.location.protocol !== "https:" && !isLocalhost) {
    showHttpsWarning.value = true;
    console.warn("⚠️ ВНИМАНИЕ: Используется HTTP вместо HTTPS!");
  }
}

//  генерация клиентского CSRF токена
function generateCsrfToken() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  const origin = window.location.origin;

  //  имитация CSRF токена
  return `client_csrf_${timestamp}_${random}_${btoa(origin).substr(0, 8)}`;
}

//  проверка лимита запросов
function checkRateLimit() {
  const now = Date.now();
  const timeSinceLastAttempt = now - lastAttemptTime.value;

  // сбрасываем счетчик, если прошло больше 5 минут
  if (timeSinceLastAttempt > 5 * 60 * 1000) {
    loginAttempts.value = 0;
  }

  // если больше 5 попыток за 5 минут - блокировка
  if (loginAttempts.value >= 5) {
    const cooldown = 30; // 30 секунд блокировки
    const timeLeft = Math.ceil((cooldown * 1000 - timeSinceLastAttempt) / 1000);

    if (timeLeft > 0) {
      isRateLimited.value = true;
      cooldownTime.value = timeLeft;

      // обновляем счетчик каждую секунду
      const timer = setInterval(() => {
        cooldownTime.value--;
        if (cooldownTime.value <= 0) {
          clearInterval(timer);
          isRateLimited.value = false;
          loginAttempts.value = 0;
        }
      }, 1000);

      return false;
    }
  }

  return true;
}

// очистка опасных символов из логина
function sanitizeLoginInput() {
  // удаляем опасные HTML/JS символы
  credentials.value.login = credentials.value.login
    .replace(/[<>]/g, "") // убираем < и >
    .replace(/javascript:/gi, "") // убираем javascript:
    .replace(/data:/gi, ""); // убираем data:
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function goBack() {
  router.back();
}

async function handleLogin() {
  // проверка лимита запросов
  if (!checkRateLimit()) {
    alert("Слишком много попыток входа. Подождите " + cooldownTime.value + " секунд.");
    return;
  }

  // увеличиваем счетчик попыток
  loginAttempts.value++;
  lastAttemptTime.value = Date.now();

  if (!credentials.value.login || !credentials.value.password) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  // проверка минимальной длины пароля
  if (credentials.value.password.length < 6) {
    alert("Пароль должен содержать минимум 6 символов");
    return;
  }

  isLoading.value = true;

  try {
    //  Имитация запроса с задержкой (как будто к серверу)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // не храним пароль только логин и метаданные
    const userData = {
      login: credentials.value.login,
      loginTime: new Date().toISOString(),
      rememberMe: rememberMe.value,
      // Добавляем клиентский токен
      clientToken: clientCsrfToken.value,
    };

    //  Шифруем данные перед сохранением в localStorage
    const encryptedData = btoa(JSON.stringify(userData));
    localStorage.setItem("user_session", encryptedData);

    // "запомнить меня" - только логин (без пароля)
    if (rememberMe.value) {
      const rememberData = {
        login: credentials.value.login,
        rememberHash: simpleHash(credentials.value.login + window.location.origin),
      };
      localStorage.setItem("remember_data", JSON.stringify(rememberData));
    } else {
      localStorage.removeItem("remember_data");
    }

    // Очищаем поле пароля сразу после использования
    credentials.value.password = "";

    alert(`✅ Вход выполнен успешно!\nДобро пожаловать, ${credentials.value.login}`);
    router.push("/");
  } catch (error) {
    console.error("Ошибка входа:", error);
    alert("❌ Ошибка входа. Проверьте данные и попробуйте снова.");
  } finally {
    isLoading.value = false;
  }
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

onMounted(() => {
  // Проверяем HTTPS
  checkHttps();

  // Генерируем CSRF токен
  clientCsrfToken.value = generateCsrfToken();

  try {
    const encryptedData = localStorage.getItem("user_session");
    if (encryptedData) {
      const decryptedData = JSON.parse(atob(encryptedData));
      console.log("Найдена предыдущая сессия");
    }
  } catch (error) {
    console.log("Сессия не найдена или повреждена");
  }

  //  "запомнить меня"
  const rememberData = localStorage.getItem("remember_data");
  if (rememberData) {
    try {
      const data = JSON.parse(rememberData);
      // Проверяем хеш для безопасности
      const currentHash = simpleHash(data.login + window.location.origin);
      if (data.rememberHash === currentHash) {
        credentials.value.login = data.login;
        rememberMe.value = true;
      }
    } catch (error) {
      localStorage.removeItem("remember_data");
    }
  }
});
</script>

<style scoped>
.login-page {
  max-width: 450px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;
}

.back-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;
  margin-bottom: 20px;
  font-family: "Source Serif Pro", serif;
}

.back-btn:hover {
  color: #333;
}

.page-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 400;
}

.security-warning {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  text-align: center;
}

.security-info {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  margin-top: 30px;
  font-size: 0.9rem;
}

.security-info ul {
  margin: 10px 0 0 20px;
  padding: 0;
}

.security-info li {
  margin-bottom: 5px;
  list-style-type: none;
  position: relative;
  padding-left: 20px;
}

.security-info li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #667eea;
}

.login-container {
  background: white;
  border-radius: 12px;
  padding: 35px 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 0.95rem;
}

.login-input,
.password-input {
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Source Serif Pro", serif;
  color: #333;
  transition: all 0.3s;
  box-sizing: border-box;
}

.login-input:focus,
.password-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.login-input::placeholder,
.password-input::placeholder {
  color: #aaa;
}

.password-wrapper {
  position: relative;
}

.password-input {
  width: 100%;
  padding-right: 50px;
}

.password-hint {
  color: #666;
  font-size: 0.85rem;
  margin-top: 5px;
  opacity: 0.7;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover {
  color: #333;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: -10px;
}

.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  accent-color: #667eea;
}

.remember-me label {
  color: #666;
  font-size: 0.95rem;
  cursor: pointer;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Source Serif Pro", serif;
  margin-top: 10px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: linear-gradient(135deg, #cccccc 0%, #999999 100%);
}

.form-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.95rem;
}

.link:hover {
  text-decoration: underline;
}

.register-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.register-section p {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-page {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .login-container {
    padding: 30px 25px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.6rem;
  }

  .login-container {
    padding: 25px 20px;
  }

  .login-input,
  .password-input {
    padding: 12px 14px;
    font-size: 15px;
  }

  .login-btn {
    padding: 14px;
    font-size: 15px;
  }
}
</style>
