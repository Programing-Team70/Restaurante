'use strict';

export const helmets = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://api.cloudinary.com"],
            connectSrc: ["'self'"]
        }
    },
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true
};