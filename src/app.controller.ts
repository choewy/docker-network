import { Controller, Get, Inject, Logger, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(@Inject(Logger) private readonly logger: Logger) {}

  @Get()
  swaggerDocs(@Res() res: Response) {
    this.logger.log('Swagger documents', this.swaggerDocs.name);
    return res.redirect('/docs');
  }
}
