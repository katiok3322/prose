<template>
  <div class="register-page">
    <button @click="goBack" class="back-btn">← Вернуться назад</button>

    <h1 class="page-title">Регистрация</h1>

    <div class="register-container">
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="input-group">
          <label for="name">Имя *</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Введите ваше имя"
            required
            class="form-input"
          />
        </div>

        <div class="input-group">
          <label for="email">Email *</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="email@example.com"
            required
            class="form-input"
          />
        </div>

        <div class="input-group">
          <label for="phone">Телефон *</label>
          <input
            v-model="form.phone"
            type="tel"
            id="phone"
            placeholder="+7 (999) 123-45-67"
            required
            class="form-input"
          />
        </div>

        <div class="input-group">
          <label for="password">Пароль *</label>
          <div class="password-wrapper">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Придумайте пароль"
              required
              class="password-input"
            />
            <button type="button" class="toggle-password" @click="togglePassword">
              {{ showPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
        </div>

        <div class="input-group">
          <label for="confirmPassword">Подтвердите пароль *</label>
          <div class="password-wrapper">
            <input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              placeholder="Повторите пароль"
              required
              class="password-input"
            />
            <button type="button" class="toggle-password" @click="toggleConfirmPassword">
              {{ showConfirmPassword ? "👁️" : "👁️‍🗨️" }}
            </button>
          </div>
        </div>

        <div class="agreement">
          <input
            v-model="form.agreeTerms"
            type="checkbox"
            id="terms"
            class="checkbox"
            required
          />
          <label for="terms" class="agreement-label">
            Я согласен с условиями обработки данных
          </label>
        </div>

        <button type="submit" class="register-btn" :disabled="isLoading">
          {{ isLoading ? "Регистрация..." : "Зарегистрироваться" }}
        </button>

        <div class="login-section">
          <p>Уже есть аккаунт?</p>
          <router-link to="/login" class="login-link"> Войти </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const passwordsMatch = computed(() => {
  return form.value.password === form.value.confirmPassword;
});

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

function goBack() {
  router.back();
}

async function handleRegister() {
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.phone ||
    !form.value.password ||
    !form.value.confirmPassword
  ) {
    alert("Пожалуйста, заполните все обязательные поля");
    return;
  }

  if (!form.value.agreeTerms) {
    alert("Необходимо согласиться с условиями обработки данных");
    return;
  }

  if (!passwordsMatch.value) {
    alert("Пароли не совпадают");
    return;
  }

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userData = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      isRegistered: true,
      registrationDate: new Date().toISOString(),
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userLogin", form.value.email);

    alert(`✅ Регистрация прошла успешно!\nДобро пожаловать, ${form.value.name}!`);

    router.push("/");
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    alert("❌ Ошибка регистрации");
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.register-page {
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

.register-container {
  background: white;
  border-radius: 12px;
  padding: 35px 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.register-form {
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

.form-input,
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

.form-input:focus,
.password-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder,
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

.agreement {
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

.agreement-label {
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
}

.register-btn {
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

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-section {
  text-align: center;
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #eee;
}

.login-section p {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.login-link:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  .register-page {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .register-container {
    padding: 30px 25px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.6rem;
  }

  .register-container {
    padding: 25px 20px;
  }

  .form-input,
  .password-input {
    padding: 12px 14px;
    font-size: 15px;
  }

  .register-btn {
    padding: 14px;
    font-size: 15px;
  }
}
</style>
