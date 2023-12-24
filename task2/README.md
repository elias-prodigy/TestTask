## Task 2: Create an HTTP Proxy Server

Implement an HTTP proxy server using Node.js and the built-in http module. The server should handle incoming requests and forward them to the specified target server, then return the target server's response to the client. The proxy server should support both HTTP and HTTPS requests.

For testing the integration, you may use [ApiPheny](https://apipheny.io/free-api/) as a reference point. It will be employed, among others, to test this proxy server.

### Features to Implement:

1. **Configuration Options**: Provide options for configuring the target server's host, port, and protocol.

2. **Support for Concurrent Requests**: Implement support for handling multiple concurrent requests to enhance server responsiveness.

3. **Basic Error Handling and Logging**: Ensure basic error handling mechanisms and logging for improved diagnostics.

4. **GET Request Caching**: Implement caching for GET requests using the file-based caching system developed in Task 1.