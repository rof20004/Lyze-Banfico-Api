// @flow

declare module 'request' {
    declare type Headers = {
        [string]: string
    };

    declare type Uri = {
        protocol: string,
        slashes: boolean,
        auth?: ?string,
        host: string,
        port: number,
        hostname: string,
        hash?: ?string,
        search?: ?string,
        query?: ?string,
        pathname?: ?string,
        path: string,
        href: string
    };

    declare type Options = {
        uri: string,
        method?: string,
        form?: Object,
        body?: Object,
        headers?: Headers,
        json?: boolean
    };

    declare type Response = {
        headers: Headers,
        statusCode: number,
        statusMessage: string,
        body?: Object | string,
        request: {
            uri: Uri,
            method: string,
            headers: Headers,
            body: Object | string
        }
    };

    declare function request (Options, (
        err?: Error,
        res: Response,
        body?: Object
    ) => void): void;

    declare export default typeof request
}