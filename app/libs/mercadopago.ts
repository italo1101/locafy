
import { MercadoPagoConfig } from 'mercadopago';

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
});

export default mercadopago;
