
# ### **Task Management – Frontend (Vue.js com Vite)**

Este é o frontend da aplicação **Task Management**, desenvolvido em **Vue.js 3** utilizando **Vite** para otimização e velocidade.

## Repositorio do Backend

Link: 

## Tecnologias Utilizadas

- **Vue 3 (Composition API)**
- **Vite (Build Rápido e Hot Reload)**
- **Vue Router (Gerenciamento de Rotas)**
- **Pinia (Gerenciamento de Estado)**
- **Axios (Consumo da API)**
- **TailwindCSS 4 (Estilização e Responsividade)**
- **Date-fns (Manipulação de Datas)**
- **Lucide Vue Next (Ícones)**
- **Vue Toastification (Notificações Toast)**

## Funcionalidades


### **Gerenciamento de Tarefas**

- Criar, editar e excluir tarefas
- Filtragem em tempo real
- Filtro dinâmico por titulo e descrição
- Filtro por status
- Ordenação por data de vencimento ( crescente e descrescente)


### **Autenticação**

- Registro de usuários (Nome, E-mail, Senha)
- Login e Logout
- Proteção de rotas autenticadas e deslogando usuario quando token esta expirado

### **Responsividade**

- Layout totalmente adaptado para dispositivos móveis usando **TailwindCSS v4**


## Por que Vite?
O **Vite** foi escolhido para este projeto por oferecer:
- **Build ultrarrápido**: utiliza **ESBuild** para compilar arquivos rapidamente.
- **Hot Module Replacement (HMR)** eficiente: atualiza apenas os módulos alterados, sem reiniciar o servidor.
- **Otimização de dependências**: carrega módulos sob demanda para inicialização instantânea.
- **Melhor experiência para desenvolvimento Vue 3**.


## Como Executar o Frontend

### **1 - Pré-requisitos**

- **Node.js 22.14.0** (versão homologada)
- **NPM** ou **Yarn**


### **2 - Configuração do Ambiente**
Crie um arquivo **`.env`** na raiz do projeto e adicione:

```sh

VITE_BASE_URL="http://localhost:8080/"

```


### **3 - Instalação**

Dentro da pasta do frontend, instale as dependências:

```sh
npm install
```

### **4 - Rodando o Frontend**
Para iniciar o ambiente de desenvolvimento:

```sh
npm run dev
```

O frontend estará disponível em: http://localhost:5173
