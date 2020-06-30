import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import {resolve} from 'path';
import mailConfig from '../config/mail';

class Mail {
    constructor() {
        const { host, port, secure, auth, debug, logger} = mailConfig;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            debug,
            logger,
            auth: auth.user ? auth : null,
        });
        this.configureTemplates();
    }

    configureTemplates() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
        this.transporter.use('compile', nodemailerhbs({
            viewEngine: exphbs.create({
                layoutsDir: resolve(viewPath, 'layouts'),
                partialsDir: resolve(viewPath, 'partials'),
                defaultLayout: 'default',
                extname: '.hbs'
            }),
            viewPath,
            extName: '.hbs'
        }))
    }

    sendMail(message) {
        return this.transporter.sendMail({ ...mailConfig.default, ...message });
    }
}

export default new Mail();