declare module 'http' {
    import * as stream from 'stream';
    import { URL } from 'url';
    import { Socket, Server as NetServer } from 'net';

    // incoming headers will never contain number
    interface IncomingHttpHeaders extends NodeJS.Dict<string | string[]> {
        'accept'?: string;
        'accept-language'?: string;
        'accept-patch'?: string;
        'accept-ranges'?: string;
        'access-control-allow-credentials'?: string;
        'access-control-allow-headers'?: string;
        'access-control-allow-methods'?: string;
        'access-control-allow-origin'?: string;
        'access-control-expose-headers'?: string;
        'access-control-max-age'?: string;
        'access-control-request-headers'?: string;
        'access-control-request-method'?: string;
        'age'?: string;
        'allow'?: string;
        'alt-svc'?: string;
        'authorization'?: string;
        'cache-control'?: string;
        'connection'?: string;
        'content-disposition'?: string;
        'content-encoding'?: string;
        'content-language'?: string;
        'content-length'?: string;
        'content-location'?: string;
        'content-range'?: string;
        'content-type'?: string;
        'cookie'?: string;
        'date'?: string;
        'etag'?: string;
        'expect'?: string;
        'expires'?: string;
        'forwarded'?: string;
        'from'?: string;
        'host'?: string;
        'if-match'?: string;
        'if-modified-since'?: string;
        'if-none-match'?: string;
        'if-unmodified-since'?: string;
        'last-modified'?: string;
        'location'?: string;
        'origin'?: string;
        'pragma'?: string;
        'proxy-authenticate'?: string;
        'proxy-authorization'?: string;
        'public-key-pins'?: string;
        'range'?: string;
        'referer'?: string;
        'retry-after'?: string;
        'sec-websocket-accept'?: string;
        'sec-websocket-extensions'?: string;
        'sec-websocket-key'?: string;
        'sec-websocket-protocol'?: string;
        'sec-websocket-version'?: string;
        'set-cookie'?: string[];
        'strict-transport-security'?: string;
        'tk'?: string;
        'trailer'?: string;
        'transfer-encoding'?: string;
        'upgrade'?: string;
        'user-agent'?: string;
        'vary'?: string;
        'via'?: string;
        'warning'?: string;
        'www-authenticate'?: string;
    }

    // outgoing headers allows numbers (as they are converted internally to strings)
    type OutgoingHttpHeader = number | string | string[];

    interface OutgoingHttpHeaders extends NodeJS.Dict<OutgoingHttpHeader> {
    }

    interface ClientRequestArgs {
        abort?: AbortSignal;
        protocol?: string | null;
        host?: string | null;
        hostname?: string | null;
        family?: number;
        port?: number | string | null;
        defaultPort?: number | string;
        localAddress?: string;
        socketPath?: string;
        /**
         * @default 8192
         */
        maxHeaderSize?: number;
        method?: string;
        path?: string | null;
        headers?: OutgoingHttpHeaders;
        auth?: string | null;
        agent?: Agent | boolean;
        _defaultAgent?: Agent;
        timeout?: number;
        setHost?: boolean;
        // https://github.com/nodejs/node/blob/master/lib/_http_client.js#L278
        createConnection?: (options: ClientRequestArgs, oncreate: (err: Error, socket: Socket) => void) => Socket;
    }

    interface ServerOptions {
        IncomingMessage?: typeof IncomingMessage;
        ServerResponse?: typeof ServerResponse;
        /**
         * Optionally overrides the value of
         * `--max-http-header-size` for requests received by this server, i.e.
         * the maximum length of request headers in bytes.
         * @default 8192
         */
        maxHeaderSize?: number;
        /**
         * Use an insecure HTTP parser that accepts invalid HTTP headers when true.
         * Using the insecure parser should be avoided.
         * See --insecure-http-parser for more information.
         * @default false
         */
        insecureHTTPParser?: boolean;
    }

    type RequestListener = (req: IncomingMessage, res: ServerResponse) => void;

    class Server extends NetServer {
        constructor(requestListener?: RequestListener);
        constructor(options: ServerOptions, requestListener?: RequestListener);
        setTimeout(msecs?: number, callback?: () => void): this;
        setTimeout(callback: () => void): this;
        /**
         * Limits maximum incoming headers count. If set to 0, no limit will be applied.
         * @default 2000
         * {@link https://nodejs.org/api/http.html#http_server_maxheaderscount}
         */
        maxHeadersCount: number | null;
        timeout: number;
        /**
         * Limit the amount of time the parser will wait to receive the complete HTTP headers.
         * @default 60000
         * {@link https://nodejs.org/api/http.html#http_server_headerstimeout}
         */
        headersTimeout: number;
        keepAliveTimeout: number;
        /**
         * Sets the timeout value in milliseconds for receiving the entire request from the client.
         * @default 0
         * {@link https://nodejs.org/api/http.html#http_server_requesttimeout}
         */
        requestTimeout: number;
        addListener(event: string, listener: (...args: any[]) => void): this;
        addListener(event: 'close', listener: () => void): this;
        addListener(event: 'connection', listener: (socket: Socket) => void): this;
        addListener(event: 'error', listener: (err: Error) => void): this;
        addListener(event: 'listening', listener: () => void): this;
        addListener(event: 'checkContinue', listener: RequestListener): this;
        addListener(event: 'checkExpectation', listener: RequestListener): this;
        addListener(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this;
        addListener(event: 'connect', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        addListener(event: 'request', listener: RequestListener): this;
        addListener(event: 'upgrade', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        emit(event: string, ...args: any[]): boolean;
        emit(event: 'close'): boolean;
        emit(event: 'connection', socket: Socket): boolean;
        emit(event: 'error', err: Error): boolean;
        emit(event: 'listening'): boolean;
        emit(event: 'checkContinue', req: IncomingMessage, res: ServerResponse): boolean;
        emit(event: 'checkExpectation', req: IncomingMessage, res: ServerResponse): boolean;
        emit(event: 'clientError', err: Error, socket: stream.Duplex): boolean;
        emit(event: 'connect', req: IncomingMessage, socket: stream.Duplex, head: Buffer): boolean;
        emit(event: 'request', req: IncomingMessage, res: ServerResponse): boolean;
        emit(event: 'upgrade', req: IncomingMessage, socket: stream.Duplex, head: Buffer): boolean;
        on(event: string, listener: (...args: any[]) => void): this;
        on(event: 'close', listener: () => void): this;
        on(event: 'connection', listener: (socket: Socket) => void): this;
        on(event: 'error', listener: (err: Error) => void): this;
        on(event: 'listening', listener: () => void): this;
        on(event: 'checkContinue', listener: RequestListener): this;
        on(event: 'checkExpectation', listener: RequestListener): this;
        on(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this;
        on(event: 'connect', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        on(event: 'request', listener: RequestListener): this;
        on(event: 'upgrade', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        once(event: string, listener: (...args: any[]) => void): this;
        once(event: 'close', listener: () => void): this;
        once(event: 'connection', listener: (socket: Socket) => void): this;
        once(event: 'error', listener: (err: Error) => void): this;
        once(event: 'listening', listener: () => void): this;
        once(event: 'checkContinue', listener: RequestListener): this;
        once(event: 'checkExpectation', listener: RequestListener): this;
        once(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this;
        once(event: 'connect', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        once(event: 'request', listener: RequestListener): this;
        once(event: 'upgrade', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        prependListener(event: string, listener: (...args: any[]) => void): this;
        prependListener(event: 'close', listener: () => void): this;
        prependListener(event: 'connection', listener: (socket: Socket) => void): this;
        prependListener(event: 'error', listener: (err: Error) => void): this;
        prependListener(event: 'listening', listener: () => void): this;
        prependListener(event: 'checkContinue', listener: RequestListener): this;
        prependListener(event: 'checkExpectation', listener: RequestListener): this;
        prependListener(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this;
        prependListener(event: 'connect', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        prependListener(event: 'request', listener: RequestListener): this;
        prependListener(event: 'upgrade', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        prependOnceListener(event: string, listener: (...args: any[]) => void): this;
        prependOnceListener(event: 'close', listener: () => void): this;
        prependOnceListener(event: 'connection', listener: (socket: Socket) => void): this;
        prependOnceListener(event: 'error', listener: (err: Error) => void): this;
        prependOnceListener(event: 'listening', listener: () => void): this;
        prependOnceListener(event: 'checkContinue', listener: RequestListener): this;
        prependOnceListener(event: 'checkExpectation', listener: RequestListener): this;
        prependOnceListener(event: 'clientError', listener: (err: Error, socket: stream.Duplex) => void): this;
        prependOnceListener(event: 'connect', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
        prependOnceListener(event: 'request', listener: RequestListener): this;
        prependOnceListener(event: 'upgrade', listener: (req: IncomingMessage, socket: stream.Duplex, head: Buffer) => void): this;
    }

    // https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js
    class OutgoingMessage extends stream.Writable {
        readonly req: IncomingMessage;

        chunkedEncoding: boolean;
        shouldKeepAlive: boolean;
        useChunkedEncodingByDefault: boolean;
        sendDate: boolean;
        /**
         * @deprecated Use `writableEnded` instead.
         */
        finished: boolean;
        readonly headersSent: boolean;
        /**
         * @deprecated Use `socket` instead.
         */
        readonly connection: Socket | null;
        readonly socket: Socket | null;

        constructor();

        setTimeout(msecs: number, callback?: () => void): this;
        setHeader(name: string, value: number | string | ReadonlyArray<string>): this;
        getHeader(name: string): number | string | string[] | undefined;
        getHeaders(): OutgoingHttpHeaders;
        getHeaderNames(): string[];
        hasHeader(name: string): boolean;
        removeHeader(name: string): void;
        addTrailers(headers: OutgoingHttpHeaders | ReadonlyArray<[string, string]>): void;
        flushHeaders(): void;
    }

    // https://github.com/nodejs/node/blob/master/lib/_http_server.js#L108-L256
    class ServerResponse extends OutgoingMessage {
        statusCode: number;
        statusMessage: string;

        constructor(req: IncomingMessage);

        assignSocket(socket: Socket): void;
        detachSocket(socket: Socket): void;
        // https://github.com/nodejs/node/blob/master/test/parallel/test-http-write-callbacks.js#L53
        // no args in writeContinue callback
        writeContinue(callback?: () => void): void;
        writeHead(statusCode: number, statusMessage?: string, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]): this;
        writeHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]): this;
        writeProcessing(): void;
    }

    interface InformationEvent {
        statusCode: number;
        statusMessage: string;
        httpVersion: string;
        httpVersionMajor: number;
        httpVersionMinor: number;
        headers: IncomingHttpHeaders;
        rawHeaders: string[];
    }

    // https://github.com/nodejs/node/blob/master/lib/_http_client.js#L77
    class ClientRequest extends OutgoingMessage {
        aborted: boolean;
        host: string;
        protocol: string;

        constructor(url: string | URL | ClientRequestArgs, cb?: (res: IncomingMessage) => void);

        method: string;
        path: string;
        /** @deprecated since v14.1.0 Use `request.destroy()` instead. */
        abort(): void;
        onSocket(socket: Socket): void;
        setTimeout(timeout: number, callback?: () => void): this;
        setNoDelay(noDelay?: boolean): void;
        setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;
        /**
         * Returns an array containing the unique names of the current outgoing raw headers.
         * Header names are returned with their exact casing being set.
         */
        getRawHeaderNames(): string[];

        addListener(event: 'abort', listener: () => void): this;
        addListener(event: 'connect', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        addListener(event: 'continue', listener: () => void): this;
        addListener(event: 'information', listener: (info: InformationEvent) => void): this;
        addListener(event: 'response', listener: (response: IncomingMessage) => void): this;
        addListener(event: 'socket', listener: (socket: Socket) => void): this;
        addListener(event: 'timeout', listener: () => void): this;
        addListener(event: 'upgrade', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        addListener(event: 'close', listener: () => void): this;
        addListener(event: 'drain', listener: () => void): this;
        addListener(event: 'error', listener: (err: Error) => void): this;
        addListener(event: 'finish', listener: () => void): this;
        addListener(event: 'pipe', listener: (src: stream.Readable) => void): this;
        addListener(event: 'unpipe', listener: (src: stream.Readable) => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;

        on(event: 'abort', listener: () => void): this;
        on(event: 'connect', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        on(event: 'continue', listener: () => void): this;
        on(event: 'information', listener: (info: InformationEvent) => void): this;
        on(event: 'response', listener: (response: IncomingMessage) => void): this;
        on(event: 'socket', listener: (socket: Socket) => void): this;
        on(event: 'timeout', listener: () => void): this;
        on(event: 'upgrade', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        on(event: 'close', listener: () => void): this;
        on(event: 'drain', listener: () => void): this;
        on(event: 'error', listener: (err: Error) => void): this;
        on(event: 'finish', listener: () => void): this;
        on(event: 'pipe', listener: (src: stream.Readable) => void): this;
        on(event: 'unpipe', listener: (src: stream.Readable) => void): this;
        on(event: string | symbol, listener: (...args: any[]) => void): this;

        once(event: 'abort', listener: () => void): this;
        once(event: 'connect', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        once(event: 'continue', listener: () => void): this;
        once(event: 'information', listener: (info: InformationEvent) => void): this;
        once(event: 'response', listener: (response: IncomingMessage) => void): this;
        once(event: 'socket', listener: (socket: Socket) => void): this;
        once(event: 'timeout', listener: () => void): this;
        once(event: 'upgrade', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        once(event: 'close', listener: () => void): this;
        once(event: 'drain', listener: () => void): this;
        once(event: 'error', listener: (err: Error) => void): this;
        once(event: 'finish', listener: () => void): this;
        once(event: 'pipe', listener: (src: stream.Readable) => void): this;
        once(event: 'unpipe', listener: (src: stream.Readable) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;

        prependListener(event: 'abort', listener: () => void): this;
        prependListener(event: 'connect', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        prependListener(event: 'continue', listener: () => void): this;
        prependListener(event: 'information', listener: (info: InformationEvent) => void): this;
        prependListener(event: 'response', listener: (response: IncomingMessage) => void): this;
        prependListener(event: 'socket', listener: (socket: Socket) => void): this;
        prependListener(event: 'timeout', listener: () => void): this;
        prependListener(event: 'upgrade', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        prependListener(event: 'close', listener: () => void): this;
        prependListener(event: 'drain', listener: () => void): this;
        prependListener(event: 'error', listener: (err: Error) => void): this;
        prependListener(event: 'finish', listener: () => void): this;
        prependListener(event: 'pipe', listener: (src: stream.Readable) => void): this;
        prependListener(event: 'unpipe', listener: (src: stream.Readable) => void): this;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this;

        prependOnceListener(event: 'abort', listener: () => void): this;
        prependOnceListener(event: 'connect', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        prependOnceListener(event: 'continue', listener: () => void): this;
        prependOnceListener(event: 'information', listener: (info: InformationEvent) => void): this;
        prependOnceListener(event: 'response', listener: (response: IncomingMessage) => void): this;
        prependOnceListener(event: 'socket', listener: (socket: Socket) => void): this;
        prependOnceListener(event: 'timeout', listener: () => void): this;
        prependOnceListener(event: 'upgrade', listener: (response: IncomingMessage, socket: Socket, head: Buffer) => void): this;
        prependOnceListener(event: 'close', listener: () => void): this;
        prependOnceListener(event: 'drain', listener: () => void): this;
        prependOnceListener(event: 'error', listener: (err: Error) => void): this;
        prependOnceListener(event: 'finish', listener: () => void): this;
        prependOnceListener(event: 'pipe', listener: (src: stream.Readable) => void): this;
        prependOnceListener(event: 'unpipe', listener: (src: stream.Readable) => void): this;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    }

    class IncomingMessage extends stream.Readable {
        constructor(socket: Socket);

        aborted: boolean;
        httpVersion: string;
        httpVersionMajor: number;
        httpVersionMinor: number;
        complete: boolean;
        /**
         * @deprecated since v13.0.0 - Use `socket` instead.
         */
        connection: Socket;
        socket: Socket;
        headers: IncomingHttpHeaders;
        rawHeaders: string[];
        trailers: NodeJS.Dict<string>;
        rawTrailers: string[];
        setTimeout(msecs: number, callback?: () => void): this;
        /**
         * Only valid for request obtained from http.Server.
         */
        method?: string;
        /**
         * Only valid for request obtained from http.Server.
         */
        url?: string;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusCode?: number;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusMessage?: string;
        destroy(error?: Error): void;
    }

    interface AgentOptions {
        /**
         * Keep sockets around in a pool to be used by other requests in the future. Default = false
         */
        keepAlive?: boolean;
        /**
         * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
         * Only relevant if keepAlive is set to true.
         */
        keepAliveMsecs?: number;
        /**
         * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
         */
        maxSockets?: number;
        /**
         * Maximum number of sockets allowed for all hosts in total. Each request will use a new socket until the maximum is reached. Default: Infinity.
         */
        maxTotalSockets?: number;
        /**
         * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Default = 256.
         */
        maxFreeSockets?: number;
        /**
         * Socket timeout in milliseconds. This will set the timeout after the socket is connected.
         */
        timeout?: number;
        /**
         * Scheduling strategy to apply when picking the next free socket to use.
         * @default `lifo`
         */
        scheduling?: 'fifo' | 'lifo';
    }

    class Agent {
        maxFreeSockets: number;
        maxSockets: number;
        maxTotalSockets: number;
        readonly freeSockets: NodeJS.ReadOnlyDict<Socket[]>;
        readonly sockets: NodeJS.ReadOnlyDict<Socket[]>;
        readonly requests: NodeJS.ReadOnlyDict<IncomingMessage[]>;

        constructor(opts?: AgentOptions);

        /**
         * Destroy any sockets that are currently in use by the agent.
         * It is usually not necessary to do this. However, if you are using an agent with KeepAlive enabled,
         * then it is best to explicitly shut down the agent when you know that it will no longer be used. Otherwise,
         * sockets may hang open for quite a long time before the server terminates them.
         */
        destroy(): void;
    }

    const METHODS: string[];

    const STATUS_CODES: {
        [errorCode: number]: string | undefined;
        [errorCode: string]: string | undefined;
    };

    function createServer(requestListener?: RequestListener): Server;
    function createServer(options: ServerOptions, requestListener?: RequestListener): Server;

    // although RequestOptions are passed as ClientRequestArgs to ClientRequest directly,
    // create interface RequestOptions would make the naming more clear to developers
    interface RequestOptions extends ClientRequestArgs { }
    function request(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
    function request(url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;
    function get(options: RequestOptions | string | URL, callback?: (res: IncomingMessage) => void): ClientRequest;
    function get(url: string | URL, options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;
    let globalAgent: Agent;

    /**
     * Read-only property specifying the maximum allowed size of HTTP headers in bytes.
     * Defaults to 16KB. Configurable using the `--max-http-header-size` CLI option.
     */
    const maxHeaderSize: number;

    /**
     *
     * This utility function converts a URL object into an ordinary options object as
     * expected by the `http.request()` and `https.request()` APIs.
     */
    function urlToHttpOptions(url: URL): ClientRequestArgs;
}
