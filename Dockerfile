# Dockerfile for StablePass Flask Application
# This Dockerfile builds a containerized version of the StablePass password generator app.
# It uses Python 3.9 (Flask 1.1.4 compatibility) and installs dependencies for the app.

# Use Python 3.9 slim base image (smaller size, essential for Flask compatibility)
FROM python:3.9-slim

# Set the working directory inside the container to /app
WORKDIR /app

# Install git (required for some dependencies like search_that_hash)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt first (optimizes Docker layer caching - dependencies change less often than code)
COPY requirements.txt .
# Install Python dependencies without caching to keep image small
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code into the container
COPY . .

# Expose port 5000 (Flask default port, required for external access)
EXPOSE 5000

# Command to run the Flask app (starts the web server)
CMD ["python", "app.py"]
CMD ["python", "app.py"]