function getApiBaseUrl() {
  if (window.VIDSHIELD_API_URL) return window.VIDSHIELD_API_URL;
  const stored = localStorage.getItem('vidshield_api_url');
  if (stored) return stored;
  return 'http://127.0.0.1:8000';
}

const mode = document.body.dataset.detector;
function getEndpoint() {
  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const path = mode === 'image' ? '/api/analyze-image' : '/api/analyze';
  return `${baseUrl}${path}`;
}
const config = mode === 'image'
  ? { noun: 'image', model: 'ConvNeXt Tiny', maximum: '25 MB' }
  : { noun: 'video', model: 'Video Swin Small', maximum: '500 MB' };


const fileInput = document.querySelector('#fileInput');
const dropzone = document.querySelector('#dropzone');
const browseButton = document.querySelector('#browseButton');
const resetButton = document.querySelector('#resetButton');
const downloadButton = document.querySelector('#downloadButton');
const idleState = document.querySelector('#idleState');
const processingState = document.querySelector('#processingState');
const resultState = document.querySelector('#resultState');
const fileName = document.querySelector('#fileName');
const progressText = document.querySelector('#progressText');
const progressBar = document.querySelector('#progressBar');
const scoreRing = document.querySelector('#scoreRing');
const scoreValue = document.querySelector('#scoreValue');
const verdictCard = document.querySelector('#verdictCard');
const verdictTitle = document.querySelector('#verdictTitle');
const verdictDetail = document.querySelector('#verdictDetail');
const resultNote = document.querySelector('#resultNote');
const signalLabel = document.querySelector('#signalLabel');
const signalMeta = document.querySelector('#signalMeta');
let currentResult = null;
let progressTimer = null;

function setProgress(value) {
  progressBar.style.width = `${value}%`;
  progressText.textContent = `${value}%`;
  document.querySelectorAll('.processing-state li').forEach((item, index) => item.classList.toggle('active', value >= [0, 38, 73][index]));
}

function reset() {
  clearInterval(progressTimer);
  fileInput.value = '';
  currentResult = null;
  downloadButton.disabled = true;
  processingState.classList.add('hidden');
  resultState.classList.add('hidden');
  idleState.classList.remove('hidden');
  setProgress(0);
}

function showResult(file, data) {
  const risk = Math.round(data.fake_probability * 100);
  const isFake = data.label === 'fake';
  currentResult = { ...data, fileName: file.name };
  downloadButton.disabled = false;
  resultState.classList.remove('hidden');
  scoreValue.textContent = `${risk}%`;
  scoreRing.style.background = `conic-gradient(${isFake ? 'var(--coral)' : 'var(--mint)'} ${risk * 3.6}deg, rgba(116,227,210,.12) 0deg)`;
  verdictCard.classList.toggle('risk', isFake);
  verdictTitle.textContent = isFake ? 'Potential deepfake signal' : 'Likely authentic signal';
  verdictDetail.textContent = `Model score is ${isFake ? 'above' : 'below'} the 50% review threshold.`;
  if (mode === 'video') { signalLabel.textContent = 'Sampled clip structure'; signalMeta.textContent = `${data.sampled_frames} frames`; }
  else { signalLabel.textContent = 'Input image'; signalMeta.textContent = `${data.width} × ${data.height}`; }
  resultNote.textContent = `${data.model} analyzed this ${config.noun} locally in ${(data.processing_time_ms / 1000).toFixed(1)}s. Treat this as an assistive signal, not proof of identity or authenticity.`;
}

function showError(message) {
  resultState.classList.remove('hidden');
  downloadButton.disabled = true;
  scoreValue.textContent = '—';
  scoreRing.style.background = 'conic-gradient(#66768e 0deg, rgba(116,227,210,.12) 0deg)';
  verdictCard.classList.add('risk');
  verdictTitle.textContent = `Could not analyze this ${config.noun}`;
  verdictDetail.textContent = message;
  resultNote.textContent = 'Confirm the local VidShield server is running and upload a supported file.';
}

async function analyze(file) {
  if (!file) return;
  clearInterval(progressTimer);
  fileName.textContent = file.name;
  idleState.classList.add('hidden');
  resultState.classList.add('hidden');
  processingState.classList.remove('hidden');
  let progress = 7;
  setProgress(progress);
  progressTimer = setInterval(() => { progress = Math.min(progress + Math.max(1, Math.round((90 - progress) / 8)), 90); setProgress(progress); }, 260);
  try {
    const form = new FormData(); form.append('file', file);
    const endpoint = getEndpoint();
    const response = await fetch(endpoint, { method: 'POST', body: form });
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(`API server at ${endpoint} returned a non-JSON response (404/HTML). Make sure the FastAPI backend server is running.`);
    }
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || 'The analysis API returned an error.');
    clearInterval(progressTimer); setProgress(100);
    setTimeout(() => { processingState.classList.add('hidden'); showResult(file, data); }, 220);
  } catch (error) {
    clearInterval(progressTimer); processingState.classList.add('hidden');
    let msg = error.message;
    if (error.name === 'TypeError' && msg.includes('fetch')) {
      msg = `Unable to connect to the backend server at ${getEndpoint()}. Ensure the FastAPI server is running (uvicorn main:app --port 8000).`;
    }
    showError(msg);
  }
}

function chooseFile() { fileInput.click(); }
dropzone.addEventListener('click', chooseFile);
dropzone.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); chooseFile(); } });
browseButton.addEventListener('click', event => { event.stopPropagation(); chooseFile(); });
fileInput.addEventListener('change', event => analyze(event.target.files[0]));
['dragenter', 'dragover'].forEach(eventName => dropzone.addEventListener(eventName, event => { event.preventDefault(); dropzone.classList.add('dragover'); }));
['dragleave', 'drop'].forEach(eventName => dropzone.addEventListener(eventName, event => { event.preventDefault(); dropzone.classList.remove('dragover'); }));
dropzone.addEventListener('drop', event => analyze(event.dataTransfer.files[0]));
resetButton.addEventListener('click', reset);
downloadButton.addEventListener('click', () => {
  if (!currentResult) return;
  const text = `VIDSHIELD ${mode.toUpperCase()} ANALYSIS REPORT\n\nFile: ${currentResult.fileName}\nModel: ${currentResult.model}\nResult: ${currentResult.label.toUpperCase()}\nDeepfake probability: ${(currentResult.fake_probability * 100).toFixed(2)}%\nAuthentic probability: ${(currentResult.authentic_probability * 100).toFixed(2)}%\nProcessing time: ${(currentResult.processing_time_ms / 1000).toFixed(2)} seconds\n\nThis result is an assistive signal, not proof of identity or authenticity.`;
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' })); link.download = `vidshield-${mode}-report.txt`; link.click(); URL.revokeObjectURL(link.href);
});
reset();
