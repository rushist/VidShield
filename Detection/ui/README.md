# VidShield UI

VidShield includes a local FastAPI inference service with two detectors:

- Video detector - Video Swin Small, for a 16-frame video sequence.
- Image detector - ConvNeXt Tiny, for a single image.

## Run locally

From the `Detection` directory, create an environment and install the dependencies:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements.txt
uvicorn app:app --host 127.0.0.1 --port 8000
```

Then open `http://127.0.0.1:8000`. The same service hosts:

- `/` - landing page
- `/video.html` - Video Swin video detector and `/api/analyze`
- `/image.html` - ConvNeXt image detector and `/api/analyze-image`

## Connecting real inference

`app.py` loads `Videoswin_small/Videoswin_small_deepfake_detection_model.pth` and `ConvNeXt_tiny/ConvNeXt_tiny_deepfake_detection_model.pt`. Both routes resize their input to 224×224 and return the model's fake probability. The API keeps uploads only in a temporary file for the duration of one request.

The video detector is best for motion and cross-frame artifacts; the image detector is best for quick, single-frame review.
