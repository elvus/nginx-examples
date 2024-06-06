Here’s an improved version of your README with better structure, clarity, and formatting:

# Nginx Proxy Reverse

This example demonstrates how to configure a reverse proxy using Nginx.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone git@github.com:elvus/nginx-examples.git
    ```

2. **Navigate to the example directory:**

    ```bash
    cd nginx-examples/Nginx-Reverse-Proxy
    ```

3. **Start the Nginx container:**

    ```bash
    docker-compose up -d
    ```

4. **Open a browser and navigate to `http://localhost:8080` to see the reverse proxy in action.**

## Nginx Configuration

The Nginx configuration for this example is as follows:

```nginx
server {
    listen 80;
    server_name google.com;

    location / {
        # If the request has the header "X-Conditional-Proxy: true"
        if ($http_x_conditional_proxy = "true") {
            proxy_pass https://api.github.com;
            break;
        }
        
        return 301 https://$server_name;
    }
}
```

### Explanation

- **listen 80;**: This directive tells Nginx to listen on port 80.
- **server_name google.com;**: This sets the server name to `google.com`.
- **location /**: This block defines how to process requests to the root URL.
    - **if ($http_x_conditional_proxy = "true")**: This condition checks if the request header `X-Conditional-Proxy` is set to `true`.
        - **proxy_pass https://api.github.com;**: If the condition is met, the request is proxied to `https://api.github.com`.
        - **break;**: Stops processing further rewrite directives in the current request.
    - **return 301 https://$server_name;**: If the condition is not met, the request is redirected to `https://google.com` with a 301 status code (permanent redirect).

## Notes

- Ensure that Docker and Docker Compose are installed on your system before running the example.