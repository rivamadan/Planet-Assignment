# Tracts Project

## Requirements

- Python 3
- Node >= 14.0.0
- npm >= 5.6

## Structure

The backend server is in `server`  
The frontend client is in `client`

## Setup

To set up the backend, cd into `server` subdirectory and run

```
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

To setup the frontend, cd into `client` subdirectory and run `npm install`

## Run server

In `server` subdirectory, run

```
. venv/bin/activate
flask run
```

## Run client

In `client` subdirectory, run `npm start`
