# VidShield Backend Service

FastAPI backend for VidShield deepfake detection powered by `ConvNeXt Tiny` and `Video Swin Small`.

## Features
- **Hugging Face Model Fetching**: Automatically checks `rushist/vidshi` on startup for model weights.
- **Graceful Fallback / Mock Mode**: If models are not yet uploaded to Hugging Face, the service runs out-of-the-box with lightweight mock analysis so deployment and frontend testing never fail.
- **Render Ready**: Configured with `render.yaml`, `Procfile`, and dynamic `$PORT` binding.
- **CORS Enabled**: Configured to support frontend deployments on Vercel, GitHub Pages, or Netlify.

---

## Deploying to Render

1. Push your repository to GitHub / GitLab.
2. Log into [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Web Service**.
4. Configure settings:
   - **Root Directory**: `Detection/backend` (or `backend` if your repository root starts at Detection)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**: *None needed! Everything works out of the box.*


6. Click **Deploy Web Service**.

---

## Local Testing

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload --port 8000
```

Access API Documentation at: `http://localhost:8000/docs`
