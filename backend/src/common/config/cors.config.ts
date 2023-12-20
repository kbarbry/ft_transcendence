export const corsConfig = {
  origin: [
    process.env.COMPUTER_ADRESS || '', // Assurez-vous que la valeur n'est jamais undefined
    process.env.COMPUTER_ADRESS_CORS || '' // Assurez-vous que la valeur n'est jamais undefined
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
