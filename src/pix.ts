/** Payload transcrito literalmente do material fornecido. Não é uma URL. */
export const PIX_PAYLOAD = '00020101021126500014br.gov.bcb.pix0111002859630740213Mentoria RAIZ52040000530398654071997.005802BR5919PRISCILA V DOMINGOS6012PORTO ALEGRE62070503***6304A0D6';

export const pixPayment = {
  amount: 'R$ 1.997,00',
  beneficiary: 'PRISCILA V DOMINGOS',
  qrImage: '/assets/pix-raiz-qr.png',
  // QR lido da imagem por Apple Vision; conteúdo idêntico ao payload e CRC A0D6 válido.
  instructions: [
    'Abra o aplicativo do seu banco.',
    'Acesse a opção Pix.',
    'Escaneie o QR Code ou escolha Pix Copia e Cola.',
    'Confira o valor de R$ 1.997,00 e os dados da beneficiária.',
    'Confirme o pagamento no aplicativo bancário.',
  ],
} as const;
