# Projeto Front-end – Analista de TI

## 👤 Identificação
- **Nome:** Kaique de Oliveira Antonio
- **CPF:** 458.252.558-00
- **Perfil:** Front-end
- **Repositório:** https://github.com/kaique-oliveira/kaique-de-oliveira-antonio-458252

---

## 🎯 Objetivo
Desenvolver uma **SPA** em **React + TypeScript**, consumindo a **API oficial do edital**, com autenticação JWT, arquitetura em camadas (Facade), testes unitários e containerização com Docker.

---

## 🔗 API
Swagger oficial:  
https://pet-manager-api.geia.vip/q/swagger-ui/

Usuário de teste:
```
login: admin
senha: admin
```

---

## 🧱 Arquitetura
- **Pages:** camada de apresentação  
- **Facade:** regras de negócio e orquestração  
- **Services:** comunicação com API  
- **State:** RxJS (`BehaviorSubject`)  
- **Shared:** infraestrutura e componentes  

Padrões:
- Facade Pattern  
- State reativo com RxJS  
- Lazy Loading de rotas  
- Interceptors JWT + refresh  

---

## 🛠️ Tecnologias
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- RxJS
- Vitest + Testing Library
- Docker
- Yarn (Berry)

---

## 🔐 Autenticação
- Login JWT
- Refresh automático
- Rotas protegidas
- Logout em falha de refresh

---

## 🐾 Funcionalidades
- Login
- Listagem de pets (paginação e busca)
- Detalhe do pet
- Upload e exibição de foto
- Facade + RxJS
- Health Check
- Docker

---

## 🧪 Testes
Rodar testes:
```bash
yarn vitest
```

Cobertura:
- Service
- Facade
- Page

---

## 🩺 Health Check
Endpoint:
```
GET /health
```
Resposta:
```
OK
```

Usado no `HEALTHCHECK` do Docker.

---

## 🐳 Docker

### Scripts
```bash
yarn docker:build
yarn docker:run
yarn docker:restart
```

### Subir com Docker
```bash
yarn docker:build
yarn docker:run
```

App:
```
http://localhost:4173
```

Health:
```
http://localhost:4173/health
```

---

## ▶️ Executar localmente
```bash
yarn install
yarn dev
```

---

## 📌 Observações
- Projeto alinhado ao edital
- Commits organizados
- Arquitetura preparada para avaliação técnica
