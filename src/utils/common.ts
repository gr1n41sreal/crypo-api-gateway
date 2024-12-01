export const prettifyFromEnum = (propName, enumEntity, ...availableValues) => {
    return `**${propName}** possible values: ${Object.entries(enumEntity)
      .filter(([key, value]) =>
        availableValues.length > 0
          ? Number.isNaN(Number(key)) && availableValues.includes(value)
          : Number.isNaN(Number(key)),
      )
      .map(([key, value]) => `${key} = ${value}`)
      .join(', ')}.`;
};

export const emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/;
export const phoneRegex = /^\+\d{5,15}$/;

export const CORS_OPTIONS = {
    origin: [
      '*',
    ],
    allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Accept',
        'Content-Type',
        'Authorization',
        'Fingerprint',
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'OPTIONS', 'POST', 'DELETE'],
};