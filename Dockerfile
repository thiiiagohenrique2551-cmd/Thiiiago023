FROM python:3.11-slim

WORKDIR /app

# Backend
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Frontend build
COPY frontend ./frontend
WORKDIR /frontend
RUN npm install && npm run build

WORKDIR /app

COPY backend ./backend

EXPOSE 5000

CMD ["python", "backend/app.py"]
