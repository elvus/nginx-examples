# README

## Overview

This project sets up an Nginx server using Docker Compose. The Nginx server is configured to handle requests in two ways:
1. Serve a custom response at the `/main` endpoint.
2. Proxy requests to either `Google` or `Yahoo` based on the authorization header at the `/search` endpoint.

## Prerequisites

- Docker
- Docker Compose

## File Structure

- `docker-compose.yml`: Configuration file for Docker Compose.
- `nginx.conf`: Main configuration file for Nginx.
- `default.conf`: Additional Nginx configuration file.
- `main.js`: JavaScript file containing custom logic for Nginx.
- `logs/`: Directory to store Nginx logs.

## Configuration

### Docker Compose

The `docker-compose.yml` file sets up a single service:

- **nginx**
  - **Image**: `nginx:alpine`
  - **Container Name**: `nginx`
  - **Ports**: Maps port `8080` on the host to port `80` in the container.
  - **Volumes**:
    - `./nginx.conf` to `/etc/nginx/nginx.conf`
    - `./default.conf` to `/etc/nginx/conf.d/default.conf`
    - `./main.js` to `/etc/nginx/main.js`
    - `./logs` to `/var/log/nginx`

### Nginx Configuration (`nginx.conf` and `default.conf`)

The Nginx configuration includes:

- **JavaScript Import**: `js_import main.js;`
- **JavaScript Set**: `js_set $url main.setUrlByAuthorization;`
- **Server Block**:
  - Listens on port `80`.
  - **Location `/main`**:
    - Executes the `main` function from `main.js` to return "Hello, world!".
  - **Location `/search`**:
    - Uses a DNS resolver (`1.1.1.1`).
    - Proxies the request to a URL determined by the `setUrlByAuthorization` function in `main.js`.

### JavaScript (`main.js`)

- **main**: Returns a "Hello, world!" message.
- **setUrlByAuthorization**: Chooses the URL based on the `authorization` header:
  - `abc`: `https://google.com`
  - Otherwise: `https://yahoo.com`

## Usage

1. **Clone the repository:**

    ```bash
    git clone git@github.com:elvus/nginx-examples.git
    ```
2. **Navigate to the example directory:**

    ```bash
    cd nginx-examples/Nginx-NJS-Module
    ```
3. **Run Docker Compose**:
   ```sh
   docker-compose up
   ```
4. **Access the service**:
   - `http://localhost:8080/main`: Should return "Hello, world!".
   - `http://localhost:8080/api`:
     - With `authorization` header set to `Bearer Oct0c4t!`: Proxies to `http://http.cat/410`.
     - Otherwise: Proxies to `https://api.github.com/octocat`.

## Logs

Logs are stored in the `logs/` directory.

## Conclusion

This setup allows you to run an Nginx server in a Docker container with custom JavaScript logic to handle specific routes and proxy requests based on headers.