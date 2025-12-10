<template>
  <div class="contact-page">
    <!-- Кнопка назад -->
    <button @click="$router.back()" class="back-btn">← Вернуться назад</button>

    <h1 class="page-title">Связаться с нами</h1>

    <p class="description">
      Для записи на услугу создайте аккаунт или просто введите данные (если уже
      зарегистрированы)
    </p>

    <div class="form-container">
      <form @submit.prevent="handleSubmit" class="simple-form">
        <div class="input-group">
          <label>Имя *</label>
          <input v-model="form.name" type="text" placeholder="Ваше имя" required />
        </div>

        <div class="input-group">
          <label>Номер телефона *</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+7 (999) 123-45-67"
            required
          />
        </div>

        <div class="input-group">
          <label>Почтовый адрес *</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            required
          />
        </div>

        <div class="input-group">
          <label>Выберите услугу</label>
          <select v-model="form.service" class="service-select">
            <option value="">-- Выберите услугу --</option>
            <option value="Лазерная эпиляция">Лазерная эпиляция (от 5000₽)</option>
            <option value="Rf-лифтинг лица">Rf-лифтинг лица (от 35000₽)</option>
            <option value="Ультразвуковая кавитация">
              Ультразвуковая кавитация (от 1500₽)
            </option>
            <option value="Вакуумно-роликовый массаж">
              Вакуумно-роликовый массаж (от 1500₽)
            </option>
            <option value="Консультация">Консультация специалиста</option>
            <option value="Другое">Другая услуга</option>
          </select>

          <div v-if="form.service === 'Другое'" class="other-service">
            <input
              v-model="form.otherService"
              type="text"
              placeholder="Укажите вашу услугу"
              class="other-input"
            />
          </div>
        </div>

        <button type="submit" class="submit-btn">Отправить заявку</button>
      </form>

      <div class="login-section">
        <p>Уже есть аккаунт?</p>
        <router-link to="/login" class="login-link"> Войти </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  name: "",
  phone: "",
  email: "",
  service: "",
  otherService: "",
  comment: "",
});

onMounted(() => {
  const selectedService = localStorage.getItem("selectedService");

  if (selectedService) {
    try {
      const serviceData = JSON.parse(selectedService);
      form.value.service = serviceData.name || "";
      console.log("Услуга выбрана из прайс-листа:", form.value.service);
    } catch (e) {
      form.value.service = selectedService;
    }
  }

  const savedData = localStorage.getItem("userData");
  if (savedData) {
    try {
      const userData = JSON.parse(savedData);
      form.value.name = userData.name || "";
      form.value.phone = userData.phone || "";
      form.value.email = userData.email || "";
    } catch (e) {
      console.log("Не удалось загрузить сохраненные данные");
    }
  }
});

function handleSubmit() {
  if (!form.value.name || !form.value.phone || !form.value.email) {
    alert("Пожалуйста, заполните обязательные поля (Имя, Телефон, Email)");
    return;
  }

  let serviceName = form.value.service;
  if (serviceName === "Другое" && form.value.otherService) {
    serviceName = form.value.otherService;
  }

  const formData = {
    ...form.value,
    service: serviceName,
    timestamp: new Date().toISOString(),
  };

  console.log("Отправка формы:", formData);

  localStorage.setItem("contactForm", JSON.stringify(formData));

  const userData = {
    name: form.value.name,
    phone: form.value.phone,
    email: form.value.email,
    lastUpdate: new Date().toISOString(),
  };
  localStorage.setItem("userData", JSON.stringify(userData));

  localStorage.removeItem("selectedService");

  if (serviceName) {
    alert(
      `Спасибо, ${form.value.name}! Вы записаны на "${serviceName}". Мы скоро с вами свяжемся.`
    );
  } else {
    alert(`Спасибо, ${form.value.name}! Мы скоро с вами свяжемся.`);
  }

  router.push("/");
}

function validatePhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}
</script>

<style scoped>
.contact-page {
  max-width: 500px;
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
}

.back-btn:hover {
  color: #333;
}

.page-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
  font-weight: 400;
}

.description {
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40px;
}

.form-container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.simple-form {
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
}

.input-group label::after {
  content: "*";
  color: #ff4081;
  margin-left: 4px;
}

.input-group label:has(~ .service-select)::after {
  content: "";
}

.input-group input,
.service-select,
.comment-textarea {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  font-family: "Source Serif Pro", serif;
  transition: border-color 0.3s;
}

.input-group input:focus,
.service-select:focus,
.comment-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.input-group input::placeholder {
  color: #aaa;
}

.service-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 15px;
  padding-right: 40px;
  cursor: pointer;
}

.other-service {
  margin-top: 10px;
}

.other-input {
  width: 100%;
}

.comment-textarea {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  line-height: 1.5;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Source Serif Pro", serif;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(102, 126, 234, 0.3);
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
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 20px 15px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .form-container {
    padding: 25px 20px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.6rem;
  }

  .description {
    font-size: 0.95rem;
  }
}
</style>
