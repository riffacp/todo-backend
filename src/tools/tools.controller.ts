import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('tools')
export class ToolsController {
  @Post('count')
  async countWords(@Body() body: any) {
    const response = await axios.post('http://127.0.0.1:8000/word-count', {
      text: body.text,
    });

    return response.data;
  }
}
