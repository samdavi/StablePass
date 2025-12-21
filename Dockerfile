# We use 3.9 because Flask 1.1.4 breaks on Python 3.10+
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy dependencies first (better caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose Flask port - REQUIRED for mapping
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]