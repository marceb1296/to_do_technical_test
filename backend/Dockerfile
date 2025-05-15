# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.13-slim

EXPOSE 8000

# Install OS dependencies for psycopg2 (PostgreSQL) and gcc for building
RUN apt-get update \
    && apt-get -y install libpq-dev gcc git \
    && rm -rf /var/lib/apt/lists/*

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .

RUN python -m pip install --upgrade pip setuptools wheel  # Upgrade pip first
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app
