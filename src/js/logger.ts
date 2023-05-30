import Pino from 'pino';
import { PUBLIC_LOG_FILE } from '$env/static/public';

export class Logger {
	private static log_instance: Logger;
	private logger: Pino.Logger<Pino.LoggerOptions>;

	private constructor() {
		this.logger = Pino({
			level: 'debug',
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					ignore: 'pid,hostname',
					customColors: 'debug:green,info:yellow,warn:blue,error:bgRed',
					destination: PUBLIC_LOG_FILE,
					messageFormat: '{msg}\n',
					singleLine: true,
					hideObject: true,
					translateTime: 'yyyy-mm-dd-HH:MM:ss'
				}
			}
		});
	}

	public static getInstance(): Logger {
		if (!Logger.log_instance) {
			Logger.log_instance = new Logger();
		}
		return Logger.log_instance;
	}

	public debug(mex: string): void {
		this.logger?.debug({ msg: mex });
	}

	public info(mex: string): void {
		this.logger?.info({ msg: mex });
	}

	public warn(mex: string): void {
		this.logger?.warn({ msg: mex });
	}

	public error(mex: string): void {
		this.logger?.error({ msg: mex });
	}
}
