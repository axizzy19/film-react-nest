import { DevLogger } from './devLogger.service';

describe('DevLogger', () => {
  let devLoggerService: DevLogger;

  beforeEach(() => {
    devLoggerService = new DevLogger();
  });

  it('.log() should call log method of the service', () => {
    const mockTextConsole =
      '[Nest] 33552  - 18.12.2024, 14:33:50     LOG [DevLogger]';
    jest
      .spyOn(devLoggerService, 'log')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.log('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });

  it('.error() should call error method of the service', () => {
    const mockTextConsole =
      '[Nest] 23884  - 18.12.2024, 15:04:00   ERROR [DevLogger]';
    jest
      .spyOn(devLoggerService, 'error')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.error('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });

  it('.debug() should call debug method of the service', () => {
    const mockTextConsole =
      '[Nest] 32948  - 18.12.2024, 15:06:20   DEBUG [DevLogger]';
    jest
      .spyOn(devLoggerService, 'debug')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.debug('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });

  it('.fatal() should call fatal method of the service', () => {
    const mockTextConsole =
      '[Nest] 32144  - 18.12.2024, 15:09:14   FATAL [DevLogger]';
    jest
      .spyOn(devLoggerService, 'fatal')
      .mockImplementation((message) => `${mockTextConsole} ${message}`);
    expect(devLoggerService.fatal('test message')).toEqual(
      `${mockTextConsole} test message`,
    );
  });
});