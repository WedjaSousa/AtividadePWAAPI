// Citações de fallback em português
const fallbackQuotes = [
  { text: "A vida é feita de momentos especiais." },
  { text: "Cada foto conta uma história única." },
  { text: "Capture o momento, guarde a memória." },
  { text: "A beleza está nos pequenos detalhes." },
  { text: "Viva o presente, fotografe o momento." },
  { text: "Memórias são tesouros que guardamos no coração." },
  { text: "Cada dia é uma nova oportunidade para criar."},
  { text: "A vida é uma coleção de momentos."},
  { text: "Sorria, você está criando memórias." },
  { text: "O melhor momento é agora."},
]

// Estado da aplicação
let photos = []
let stream = null
let currentQuote = null
let capturedImageData = null
let deferredPrompt = null

// Elementos do DOM
const elements = {
  emptyState: document.getElementById("emptyState"),
  photoFeed: document.getElementById("photoFeed"),
  photoCount: document.getElementById("photoCount"),
  cameraView: document.getElementById("cameraView"),
  video: document.getElementById("video"),
  canvas: document.getElementById("canvas"),
  preview: document.getElementById("preview"),
  previewImage: document.getElementById("previewImage"),
  quoteText: document.getElementById("quoteText"),
  quoteAuthor: document.getElementById("quoteAuthor"),
  errorMessage: document.getElementById("errorMessage"),
  captureBtn: document.getElementById("captureBtn"),
  previewControls: document.getElementById("previewControls"),
  cameraTitle: document.getElementById("cameraTitle"),
  fabBtn: document.getElementById("fabBtn"),
  installPrompt: document.getElementById("installPrompt"),
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadPhotos()
  setupEventListeners()
  registerServiceWorker()
  setupPWAInstall()
})

// Carregar fotos do localStorage
function loadPhotos() {
  const saved = localStorage.getItem("photoJournalPhotos")
  if (saved) {
    photos = JSON.parse(saved)
    updateUI()
  }
}

// Salvar fotos no localStorage
function savePhotos() {
  localStorage.setItem("photoJournalPhotos", JSON.stringify(photos))
}

// Event Listeners
function setupEventListeners() {
  document.getElementById("startBtn").addEventListener("click", openCamera)
  document.getElementById("fabBtn").addEventListener("click", openCamera)
  document.getElementById("closeCamera").addEventListener("click", closeCamera)
  document.getElementById("captureBtn").addEventListener("click", capturePhoto)
  document.getElementById("retakeBtn").addEventListener("click", retakePhoto)
  document.getElementById("saveBtn").addEventListener("click", savePhoto)
  document.getElementById("retryCamera").addEventListener("click", startCamera)
  document.getElementById("installBtn").addEventListener("click", installPWA)
  document.getElementById("dismissBtn").addEventListener("click", dismissInstall)
}

// Buscar citação da API
async function fetchQuote() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch("https://api.quotable.io/random?tags=inspirational|wisdom|life", {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) throw new Error("API error")

    const data = await response.json()
    return { text: data.content, author: data.author }
  } catch (error) {
    console.log("Usando citação de fallback")
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)]
  }
}

// Abrir câmera
async function openCamera() {
  elements.cameraView.classList.remove("hidden")
  elements.cameraTitle.textContent = "Tirar Foto"
  await startCamera()
}

// Iniciar câmera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: false,
    })

    elements.video.srcObject = stream
    elements.video.classList.remove("hidden")
    elements.preview.classList.add("hidden")
    elements.errorMessage.classList.add("hidden")
    elements.captureBtn.classList.remove("hidden")
    elements.previewControls.classList.add("hidden")
  } catch (error) {
    console.error("Erro ao acessar câmera:", error)
    elements.video.classList.add("hidden")
    elements.errorMessage.classList.remove("hidden")
  }
}

// Parar câmera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }
}

// Capturar foto
async function capturePhoto() {
  const canvas = elements.canvas
  const video = elements.video

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const ctx = canvas.getContext("2d")
  ctx.drawImage(video, 0, 0)

  capturedImageData = canvas.toDataURL("image/jpeg", 0.9)
  elements.previewImage.src = capturedImageData

  // Buscar citação
  currentQuote = await fetchQuote()
  elements.quoteText.textContent = `"${currentQuote.text}"`
  elements.quoteAuthor.textContent = `— ${currentQuote.author}`

  // Mostrar preview
  elements.video.classList.add("hidden")
  elements.preview.classList.remove("hidden")
  elements.captureBtn.classList.add("hidden")
  elements.previewControls.classList.remove("hidden")
  elements.cameraTitle.textContent = "Sua Foto"

  stopCamera()
}

// Refazer foto
function retakePhoto() {
  capturedImageData = null
  currentQuote = null
  elements.cameraTitle.textContent = "Tirar Foto"
  startCamera()
}

// Salvar foto
function savePhoto() {
  if (!capturedImageData || !currentQuote) return

  const photo = {
    id: Date.now().toString(),
    imageData: capturedImageData,
    quote: currentQuote.text,
    author: currentQuote.author,
    timestamp: Date.now(),
  }

  photos.unshift(photo)
  savePhotos()
  updateUI()
  closeCamera()
}

// Fechar câmera
function closeCamera() {
  stopCamera()
  elements.cameraView.classList.add("hidden")
  capturedImageData = null
  currentQuote = null
}

// Deletar foto
function deletePhoto(id) {
  if (!confirm("Tem certeza que deseja excluir esta foto?")) return

  photos = photos.filter((photo) => photo.id !== id)
  savePhotos()
  updateUI()
}

// Atualizar UI
function updateUI() {
  elements.photoCount.textContent = photos.length

  if (photos.length === 0) {
    elements.emptyState.classList.remove("hidden")
    elements.photoFeed.classList.add("hidden")
    elements.fabBtn.classList.add("hidden")
  } else {
    elements.emptyState.classList.add("hidden")
    elements.photoFeed.classList.remove("hidden")
    elements.fabBtn.classList.remove("hidden")
    renderPhotos()
  }
}

// Renderizar fotos
function renderPhotos() {
  elements.photoFeed.innerHTML = photos
    .map(
      (photo) => `
        <article class="photo-card">
            <img src="${photo.imageData}" alt="Foto capturada">
            <div class="photo-content">
                <div class="photo-quote">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <blockquote>"${photo.quote}"</blockquote>
                    <p>— ${photo.author}</p>
                </div>
                <div class="photo-footer">
                    <time class="photo-date">${formatDate(photo.timestamp)}</time>
                    <button class="btn-delete" onclick="deletePhoto('${photo.id}')">
                        <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        </article>
    `,
    )
    .join("")
}

// Formatar data
function formatDate(timestamp) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp))
}

// PWA Install
function setupPWAInstall() {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault()
    deferredPrompt = e

    const dismissed = localStorage.getItem("pwaInstallDismissed")
    if (!dismissed) {
      elements.installPrompt.classList.remove("hidden")
    }
  })
}

async function installPWA() {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice

  if (outcome === "accepted") {
    console.log("PWA instalado")
  }

  deferredPrompt = null
  elements.installPrompt.classList.add("hidden")
}

function dismissInstall() {
  localStorage.setItem("pwaInstallDismissed", "true")
  elements.installPrompt.classList.add("hidden")
}

// Service Worker
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("Service Worker registrado"))
      .catch((err) => console.log("Erro ao registrar Service Worker:", err))
  }
}
