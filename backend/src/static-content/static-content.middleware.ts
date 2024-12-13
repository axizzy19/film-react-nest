import { Injectable, NestMiddleware } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class StaticContentMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const filePath = path.join(__dirname, '..', '..', 'public', req.url);
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  }
}
