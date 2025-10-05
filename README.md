# 📸 Photo Journal PWA

> Um Progressive Web App moderno para capturar momentos especiais e transformá-los em memórias inspiradoras

![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🎯 Sobre o Projeto

**Photo Journal** é um Progressive Web App que permite capturar fotos usando a câmera do seu dispositivo e criar um diário visual único. Cada foto é automaticamente enriquecida com uma citação inspiradora obtida de uma API pública, criando uma experiência memorável e significativa.

Este projeto foi desenvolvido como atividade acadêmica para demonstrar o uso de:
- ✅ **PWA (Progressive Web App)** - Instalável e funciona offline
- ✅ **Recursos de Hardware** - Acesso à câmera do dispositivo
- ✅ **Consumo de API Pública** - Integração com API de citações

---

## ✨ Funcionalidades

### 📷 Captura de Fotos
- Acesso direto à câmera do dispositivo (frontal ou traseira)
- Interface intuitiva para tirar fotos
- Preview em tempo real antes de salvar
- Suporte para dispositivos móveis e desktop

### 💬 Citações Inspiradoras
- Integração com a API [Quotable](https://api.quotable.io/)
- Citações automáticas adicionadas a cada foto
- Sistema de fallback com citações em português caso a API falhe
- Variedade de temas: inspiração, sabedoria, vida

### 📱 Feed Visual
- Galeria organizada de todas as suas fotos
- Design responsivo e moderno
- Timestamps para cada memória capturada
- Opção de excluir fotos indesejadas

### 💾 Armazenamento Local
- Todas as fotos são salvas no navegador (localStorage)
- Funciona completamente offline após primeira visita
- Sem necessidade de cadastro ou login
- Privacidade total - seus dados ficam apenas no seu dispositivo

### 🚀 PWA Completo
- **Instalável** - Adicione à tela inicial como um app nativo
- **Offline First** - Funciona sem conexão com internet
- **Service Worker** - Cache inteligente de recursos
- **Manifest** - Configuração completa de PWA
- **Responsivo** - Adapta-se a qualquer tamanho de tela

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **HTML5** | Estrutura semântica e moderna |
| **CSS3** | Estilização com Flexbox e Grid |
| **JavaScript ES6+** | Lógica da aplicação |
| **MediaDevices API** | Acesso à câmera do dispositivo |
| **LocalStorage API** | Armazenamento persistente |
| **Service Worker** | Cache e funcionalidade offline |
| **Fetch API** | Consumo da API de citações |
| **Web App Manifest** | Configuração PWA |

---

## 🚀 Como Executar

### Opção 1: GitHub Codespaces (Recomendado)

1. **Clone ou crie o repositório no GitHub**

2. **Abra o Codespace**
   - Clique em "Code" → "Codespaces" → "Create codespace on main"

3. **Inicie um servidor HTTP**
   \`\`\`bash
   python3 -m http.server 8000
   \`\`\`

4. **Abra o preview**
   - Clique em "PORTS" na parte inferior
   - Clique no ícone de globo 🌐 ao lado da porta 8000

5. **Permita o acesso à câmera quando solicitado**

### Opção 2: Localmente

1. **Clone o repositório**
   \`\`\`bash
   git clone [seu-repositorio]
   cd photo-journal-pwa
   \`\`\`

2. **Inicie um servidor local**
   
   Com Python:
   \`\`\`bash
   python3 -m http.server 8000
   \`\`\`
   
   Ou com Node.js:
   \`\`\`bash
   npx http-server -p 8000
   \`\`\`

3. **Acesse no navegador**
   \`\`\`
   http://localhost:8000
   \`\`\`

### Opção 3: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

---

## 📋 Estrutura do Projeto

\`\`\`
photo-journal-pwa/
│
├── index.html          # Página principal do app
├── style.css           # Estilos e design responsivo
├── app.js              # Lógica da aplicação
├── manifest.json       # Configuração do PWA
├── sw.js               # Service Worker para cache
└── README.md           # Documentação (você está aqui!)
\`\`\`

**Simples assim!** Apenas 5 arquivos principais, sem dependências externas ou build tools.

---

## 🎨 Interface

### Tela Inicial
- Header elegante com contador de fotos
- Botão flutuante para captura rápida
- Estado vazio amigável para novos usuários

### Modo Câmera
- Visualização em tela cheia
- Controles intuitivos
- Feedback visual durante captura

### Feed de Fotos
- Layout tipo galeria
- Cards com foto + citação
- Informações de data e hora
- Ações rápidas (excluir)

---

## 🔒 Privacidade e Segurança

- ✅ Todas as fotos ficam armazenadas localmente no seu navegador
- ✅ Nenhum dado é enviado para servidores externos
- ✅ Acesso à câmera requer permissão explícita do usuário
- ✅ Você pode limpar todos os dados a qualquer momento
- ✅ Código aberto e auditável

---

## 📱 Instalação como App

### Android
1. Abra o site no Chrome
2. Toque no menu (⋮) → "Adicionar à tela inicial"
3. Confirme a instalação

### iOS
1. Abra o site no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"

### Desktop (Chrome/Edge)
1. Clique no ícone de instalação na barra de endereço
2. Ou vá em Menu → "Instalar Photo Journal"

---

## 🧪 Validação PWA

Para validar se o app atende aos requisitos de PWA:

1. **Lighthouse (Chrome DevTools)**
   - Abra DevTools (F12)
   - Vá em "Lighthouse"
   - Execute auditoria PWA
   - Deve obter pontuação alta

2. **PWA Builder**
   - Acesse [pwabuilder.com](https://www.pwabuilder.com/)
   - Insira a URL do seu app
   - Verifique os requisitos atendidos

---

## 📚 API Utilizada

### Quotable API
- **URL**: https://api.quotable.io/
- **Endpoint**: `/random?tags=inspirational|wisdom|life`
- **Gratuita**: Sim, sem necessidade de API key
- **Documentação**: [GitHub - Quotable](https://github.com/lukePeavey/quotable)

**Fallback**: O app inclui 20 citações em português que são usadas caso a API esteja indisponível.

---

## 🎓 Requisitos da Atividade

Este projeto atende completamente aos requisitos da atividade:

| Requisito | Status | Implementação |
|-----------|--------|---------------|
| PWA válido | ✅ | Manifest + Service Worker |
| Uso de Hardware | ✅ | MediaDevices API (câmera) |
| Consumo de API | ✅ | Quotable API (citações) |
| Funciona offline | ✅ | Service Worker + LocalStorage |
| Instalável | ✅ | Web App Manifest |

---

## 🐛 Solução de Problemas

### Câmera não funciona
- Verifique se deu permissão de acesso à câmera
- Use HTTPS ou localhost (HTTP não permite acesso à câmera)
- Teste em outro navegador

### Fotos não aparecem
- Verifique se o localStorage está habilitado
- Limpe o cache do navegador e tente novamente
- Verifique o console (F12) para erros

### API de citações falha
- O app usa citações locais automaticamente como fallback
- Verifique sua conexão com internet
- A API pode estar temporariamente indisponível

### PWA não instala
- Certifique-se de estar usando HTTPS
- Verifique se o manifest.json está acessível
- Teste em navegador compatível (Chrome, Edge, Safari)

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se livre para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Compartilhar o projeto

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte de atividade acadêmica.

---

## 👨‍💻 Autor

Desenvolvido com 💜 para a atividade de PWA + Hardware + API

---

## 🌟 Agradecimentos

- [Quotable API](https://github.com/lukePeavey/quotable) - Pela API gratuita de citações
- [MDN Web Docs](https://developer.mozilla.org/) - Pela documentação completa
- [PWA Builder](https://www.pwabuilder.com/) - Pelas ferramentas de validação

---

**Feito com ❤️ usando apenas HTML, CSS e JavaScript puro!**
