import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs/promises';
import crypto from "crypto";
import * as path from 'path';
import "dotenv/config";

const PORT: number = parseInt(process.env.PORT as string);
const CACHE_FOLDER: string = process.env.CACHE_FOLDER;
const PROXY_HOST: string = process.env.PROXY_HOST;
const PROXY_PORT: number = parseInt(process.env.PROXY_PORT as string);
const PROXY_PROTOCOL: string = process.env.PROXY_PROTOCOL;

interface RequestOptions {
    hostname: string;
    port: number;
    path: string;
    method: string;
    headers: http.OutgoingHttpHeaders;
}

const requestInProgress = {};

const checkIfDirectoryExists = async (dirPath: string): Promise<void> => {
    try {
        await fs.access(dirPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(dirPath, {recursive: true});
        }
    }
};

checkIfDirectoryExists(CACHE_FOLDER);

const getFilePath = (url: string): string => {
    const hash: string = crypto.createHash("sha256").update(url).digest("hex");
    return path.join(CACHE_FOLDER, `${hash}.json`);
};

const readCacheFile = async (filePath: string): Promise<string | null> => {
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error: any) {
        return null;
    }
};

const serveCachedResponse = (clientRes: http.ServerResponse, cachedResponse: string): void => {
    clientRes.writeHead(200, { 'Content-Type': 'application/json' });
    clientRes.end(cachedResponse);
    console.log('Response served from cache');
};

const prepareRequestOptions = (clientReq: http.IncomingMessage): RequestOptions => {
    return {
        hostname: PROXY_HOST,
        port: PROXY_PORT,
        path: clientReq.url!,
        method: clientReq.method!,
        headers: {
            ...clientReq.headers,
            'User-Agent': clientReq.headers['user-agent'],
        },
    };
};

const makeProxyRequest = (clientProtocol, options: RequestOptions, clientReq: http.IncomingMessage) => {
    const proxyReq = clientProtocol.request(options, (proxyRes: http.IncomingMessage): void => {
        const contentType = proxyRes.headers['content-type'] || '';

        let responseData = '';

        proxyRes.on('data', (chunk: string) => {
            responseData += chunk;
        });

        proxyRes.on('end', () => {
            if (proxyRes.statusCode < 200 || proxyRes.statusCode > 299) return;

            // Cache the response in a file for future GET requests
            if (clientReq.method === 'GET') {
                const cacheFilePath = getFilePath(clientReq.url);
                try {
                    fs.writeFile(cacheFilePath, responseData, 'utf-8');
                    console.log('Response cached');
                } catch (error) {
                    console.error('Failed to write cache file:', error);
                }
            }

            // Pipe the response data to the client
            requestInProgress[clientReq.url].forEach(res => {
                res.writeHead(proxyRes.statusCode!, { 'Content-Type': contentType });
                res.end(responseData);
            });
            delete requestInProgress[clientReq.url];
        });
    });

    // Forward the client request body to the target server
    clientReq.pipe(proxyReq, { end: true });

    // Log errors if any
    proxyReq.on('error', (err: Error): void => {
        console.error('Proxy error:', err);
        requestInProgress[clientReq.url].forEach((res: http.ServerResponse): void => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Proxy error');
        });
        delete requestInProgress[clientReq.url];
    });

    proxyReq.end();
}

const onRequest = async (clientReq: http.IncomingMessage, clientRes: http.ServerResponse) => {
    //On GET request check whether the response for this URL was already cached
    //If yes, then read the cached file and send it back to client
    if (clientReq.method === 'GET') {
        const cacheFilePath = getFilePath(clientReq.url);
        const cachedResponse = await readCacheFile(cacheFilePath);

        if (cachedResponse) {
            serveCachedResponse(clientRes, cachedResponse);
            return;
        }
    }

    if (!requestInProgress[clientReq.url]) {
        requestInProgress[clientReq.url] = [clientRes];
        const options: RequestOptions = prepareRequestOptions(clientReq);
        const clientProtocol = PROXY_PROTOCOL === 'http' ? http : https;
        makeProxyRequest(clientProtocol, options, clientReq);
    } else {
        requestInProgress[clientReq.url].push(clientRes);
    }

    clientReq.on('error', (err) => {
        console.error('Client request error:', err);
    });
}

http.createServer(onRequest).listen(PORT, () => {
    console.log(`Proxy Server listening on port ${PORT}`);
});
