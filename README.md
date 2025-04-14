
# 📊 Invesight — Painel de Análise de Ativos da Bolsa de Valores (Frontend)

Bem-vindo ao repositório **frontend** do projeto **Invesight**, uma plataforma moderna e responsiva para análise de ativos da bolsa de valores brasileira. Com um foco especial em investidores iniciantes, o sistema oferece uma visualização clara e inteligente de indicadores financeiros, aliando design fluido com informações relevantes para facilitar a tomada de decisão.

## 🚀 Tecnologias Principais

- **Angular** 19.2.0
- **PrimeNG** 19.0.10
- **PrimeIcons** 7.0.0
- **SCSS Modularizado**
- **TypeScript Estruturado**

---

## 🧠 Objetivo do Projeto

O **Invesight** visa entregar uma experiência simplificada, porém poderosa, para quem deseja entender e analisar ativos da bolsa de forma clara, mesmo sem domínio técnico avançado. A aplicação destaca:

- Indicadores financeiros essenciais de ações e FIIs.
- Uma nota de resistência para cada ativo, baseada em fundamentos buy and hold e cenário global.
- Um sistema visual por cores para facilitar a leitura e avaliação de cada indicador.

---

## 🖼️ Funcionalidades

- 🔍 **Pesquisa Inteligente** com input rápido e responsivo.
- 🧮 **Análise de Indicadores** com foco em buy and hold.
- 💹 **Nota de Resistência** automatizada para cada ativo.
- 🎨 **Sistema de Temas Dinâmicos** (alteráveis em tempo real).
- 📱 **Totalmente Responsivo** — ideal para desktop, tablets e celulares.
- 🔀 **Sistema Completo de Rotas** com navegação fluida.
- 🧩 **Arquitetura Modularizada** (pages, components, services, interfaces).
- 🔗 Integração com **API própria** para alimentação dos dados em tempo real.

---

## 🏗️ Estrutura Atual

Atualmente o painel cobre:

- 📈 **Ações (B3)**
- 🏢 **Fundos Imobiliários (FIIs)**

🔜 Futuras versões incluirão:
- 🏦 Tesouro Direto
- 💰 Produtos de Renda Fixa em geral

---

## 📂 Estrutura do Projeto

Organização modular baseada em escalabilidade e boas práticas Angular:

```
src/
└── app/
    ├── modules/global/
    │   ├── components/
    │   ├── interfaces/
    │   ├── pages/
    │   └── services/
    ├── services/
    ├── app.routes.ts
    └── app.config.ts
```

---

## 🔧 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/Drarlian/invesight-front.git

# Acesse o diretório
cd invesight-front

# Instale as dependências
npm install

# Rode a aplicação
ng serve
```

---

## 📌 Requisitos

- Node.js 18+
- Angular CLI
- Navegador

---

## 📬 Contato

Criado por **Witor Oliveira**  
🔗 [LinkedIn](https://www.linkedin.com/in/witoroliveira/)  
📫 [Contato por e-mail](mailto:witoredson@gmail.com)

---

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](./LICENSE).
