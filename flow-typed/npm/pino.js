// @flow

declare module 'pino' {

    declare type Pino = {
        (optionsOrStream?: LoggerOptions | stream$Writable | stream$Duplex): Logger,
        (options: LoggerOptions, stream: stream$Writable | stream$Duplex): Logger,
        final (Logger, (Error, Logger) => void): void,
        levels: {
            values: LevelLabelsToValues,
            labels: LevelValuesToLabels
        },
        LOG_VERSION: number
    };

    declare function pretty (
        opts?: {
            timeTransOnly?: boolean,
            levelFirst?: boolean,
            formatter?: (log: IPinoLog) => string
        }
    ): stream$Transform;

    declare type Level = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';

    declare interface Headers {
        [header: string]: string
    }

    declare interface IPinoLog {
        pid: number,
        hostname: string,
        level: number,
        time: string,
        msg: string,
        v: number
    }

    declare interface LevelLabelsToValues {
        [level: string]: number
    }

    declare interface LevelValuesToLabels {
        [level: number]: string
    }

    declare interface Serializers {
        req?: (req: any) => any,
        res?: (res: any) => any,
        err?: (error: Error) => any
    }

    declare interface LoggerOptions {
        // avoid error causes by circular references in the object tree, default true
        safe?: boolean,
        // the name of the logger, default undefined
        name?: string,
        // an object containing functions for custom serialization of objects.
        // These functions should return an JSONifiable object and they should never throw
        serializers?: Serializers,
        // Outputs ISO time stamps ('2016-03-09T15:18:53.889Z') instead of Epoch time stamps (1457536759176).
        // WARNING: This option carries a 25% performance drop, we recommend using default Epoch timestamps and transforming logs after if required.
        // The pino -t command will do this for you (see CLI). default false.
        slowtime?: boolean,
        // Enables extreme mode, yields an additional 60% performance (from 250ms down to 100ms per 10000 ops).
        // There are trade-off's should be understood before usage. See Extreme mode explained. default false
        extreme?: boolean,
        // enables logging, defaults to true.
        enabled?: boolean,
        level?: Level | string,
        levelVal?: number
    }


    declare type LevelChangeEventListener = (lvl: string, val: number, prevLvl: string, prevVal: number) => void;
    declare type LevelChangeEvent = 'level-change';

    declare interface Logger {
        child (bindings: {}): Logger,
        level: Level,
        levelVal: number,
        on (event: LevelChangeEvent, listener: LevelChangeEventListener): void,
        fatal (...args: any[]): void,
        error (...args: any[]): void,
        warn (...args: any[]): void,
        info (...args: any[]): void,
        debug (...args: any[]): void,
        trace (...args: any[]): void,
        levels: {
            values: LevelLabelsToValues,
            labels: LevelValuesToLabels
        },
        LOG_VERSION: number,
        stdSerializers: Serializers
    }

    declare export default Pino;
}
