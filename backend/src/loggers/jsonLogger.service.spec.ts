import { JsonLogger } from './jsonLogger.service';

describe('DevLogger', () => {
  let jsonLoggerService: JsonLogger;

  beforeEach(() => {
    jsonLoggerService = new JsonLogger();
  });

  it('.log() should call log method of the service', () => {
    const mockTextConsole = {
      level: 'log',
      message: 'test message',
      optionalParams: [null],
    };
    jest
      .spyOn(jsonLoggerService, 'log')
      .mockImplementation((message, optionalParams) =>
        jsonLoggerService.formatMessage('log', message, optionalParams),
      );
    expect(jsonLoggerService.log('test message')).toEqual(
      JSON.stringify(mockTextConsole),
    );
  });

  it('.error() should call error method of the service', () => {
    const mockTextConsole = {
      level: 'error',
      message: 'test message',
      optionalParams: [null],
    };
    jest
      .spyOn(jsonLoggerService, 'error')
      .mockImplementation((message, optionalParams) =>
        jsonLoggerService.formatMessage('error', message, optionalParams),
      );
    expect(jsonLoggerService.error('test message')).toEqual(
      JSON.stringify(mockTextConsole),
    );
  });

  it('.debug() should call debug method of the service', () => {
    const mockTextConsole = {
      level: 'debug',
      message: 'test message',
      optionalParams: [null],
    };
    jest
      .spyOn(jsonLoggerService, 'debug')
      .mockImplementation((message, optionalParams) =>
        jsonLoggerService.formatMessage('debug', message, optionalParams),
      );
    expect(jsonLoggerService.debug('test message')).toEqual(
      JSON.stringify(mockTextConsole),
    );
  });

  it('.fatal() should call fatal method of the service', () => {
    const mockTextConsole = {
      level: 'fatal',
      message: 'test message',
      optionalParams: [null],
    };
    jest
      .spyOn(jsonLoggerService, 'fatal')
      .mockImplementation((message, optionalParams) =>
        jsonLoggerService.formatMessage('fatal', message, optionalParams),
      );
    expect(jsonLoggerService.fatal('test message')).toEqual(
      JSON.stringify(mockTextConsole),
    );
  });
});