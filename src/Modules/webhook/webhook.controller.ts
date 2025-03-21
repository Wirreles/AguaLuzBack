import { Controller, Post, Get, Body, Query, Res, Req, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  private readonly VERIFY_TOKEN = 'token-agualuz-back'; // Define aquí tu token de verificación
  constructor(private readonly webhookService: WebhookService) {}
  // Endpoint para enviar mensajes a través del webhook de Make
  @Post('send-message')
  async sendMessage(@Body() body: any) {
    const makeWebhookUrl = 'https://hook.us2.make.com/vx4o475rrtf9g9ahyyl4j87q52soypi5';

    console.log('Enviando datos al webhook:', body);

    try {
      const response = await axios.post(makeWebhookUrl, body);
      console.log('Respuesta de Make:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al enviar mensaje:', error.response?.data || error.message);
      throw error;
    }
  }

  @Post('receive-message')
  async receiveMessage(@Body() body: any, @Res() res: Response) {
    try {
      const mensaje = body?.messages?.[0]?.text?.body;
      if (!mensaje) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Mensaje no válido',
        });
      }
  
      const telefonoCliente = body?.messages?.[0]?.from; // Número de quien envió el mensaje
      const zonaId = "b182c391-b236-4bc5-acd4-5e9696d4a485"; // ID de la zona
  
      // Crear el pedido
      const pedido = await this.webhookService.createOrderFromMessage(telefonoCliente, mensaje);
  
      return res.status(HttpStatus.OK).json({
        success: true,
        message: `Pedido creado exitosamente: ${pedido.nroPedido}`,
        pedido,
      });
    } catch (error) {
      console.error('Error al procesar el mensaje:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error procesando el mensaje',
      });
    }
  }
  
  
  @Post()
  async handleIncomingWebhook(@Body() body: any, @Res() res: Response) {
    try {
      if (!body || !body.entry?.[0]?.changes?.[0]?.value) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Estructura inválida.' });
      }

      const changes = body.entry[0].changes[0].value;
      const message = changes.messages?.[0];

      if (!message || !message.text?.body) {
        return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'No se encontró un mensaje válido.' });
      }

      const from = message.from;
      const text = message.text.body;

      const pedido = await this.webhookService.createOrderFromMessage(from, text);

      return res.status(HttpStatus.OK).json({
        success: true,
        message: `Pedido creado exitosamente: ${pedido.nroPedido}`,
        pedido,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Error procesando el mensaje: ${error.message}`,
      });
    }
  }
  
  


  // Endpoint para la verificación del token del webhook
  @Get()
  async verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') token: string,
    @Res() res: Response,
  ) {
    console.log('Solicitud de verificación recibida:', { mode, challenge, token });

    if (mode === 'subscribe' && token === this.VERIFY_TOKEN) {
      console.log('Webhook verificado correctamente');
      return res.status(HttpStatus.OK).send(challenge); // Responde con el challenge
    } else {
      console.error('Error en la verificación del webhook');
      return res.status(HttpStatus.FORBIDDEN).send('Forbidden'); // Responde con error si no coincide el token
    }
  }
}



