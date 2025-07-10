import { TskvLogger } from './tskvLogger.service';

describe('DevLogger', () => {
  let tskvLoggerService: TskvLogger;

  beforeEach(() => {
    tskvLoggerService = new TskvLogger();
  });

  it('.log() should call log method of the service', () => {
    const mockTextConsole =
      'level=log\tmessage=test message\toptionalParams=\n';
    jest
      .spyOn(tskvLoggerService, 'log')
      .mockImplementation((message, optionalParams) =>
        tskvLoggerService.formatMessage('log', message, optionalParams),
      );
    expect(tskvLoggerService.log('test message')).toEqual(mockTextConsole);
  });

  it('.error() should call error method of the service', () => {
    const mockTextConsole =
      'level=error\tmessage=test message\toptionalParams=\n';
    jest
      .spyOn(tskvLoggerService, 'error')
      .mockImplementation((message, optionalParams) =>
        tskvLoggerService.formatMessage('error', message, optionalParams),
      );
    expect(tskvLoggerService.error('test message')).toEqual(mockTextConsole);
  });

  it('.debug() should call debug method of the service', () => {
    const mockTextConsole =
      'level=debug\tmessage=test message\toptionalParams=\n';
    jest
      .spyOn(tskvLoggerService, 'debug')
      .mockImplementation((message, optionalParams) =>
        tskvLoggerService.formatMessage('debug', message, optionalParams),
      );
    expect(tskvLoggerService.debug('test message')).toEqual(mockTextConsole);
  });

  it('.fatal() should call fatal method of the service', () => {
    const mockTextConsole =
      'level=fatal\tmessage=test message\toptionalParams=\n';
    jest
      .spyOn(tskvLoggerService, 'fatal')
      .mockImplementation((message, optionalParams) =>
        tskvLoggerService.formatMessage('fatal', message, optionalParams),
      );
    expect(tskvLoggerService.fatal('test message')).toEqual(mockTextConsole);
  });
});