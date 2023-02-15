import { Router } from "express";
import { Request, Response } from "express";
import { EmailData } from "../types/email.data";
import { RequestValidator } from "./request.validator";
import { Logger } from "../logger/logger";
import nodemailer from "nodemailer";
import env from "./../config/env";

const mainRouter: Router = Router();

mainRouter.post('/', async (request: Request, response: Response) => {

    const body: EmailData = request.body;

    if(!RequestValidator.validate(body)){
        response.status(400);
        response.send({
            info: "invalid body"
        });
        return;
    }

    if(body.secret != env.APP.SECRET_KEY){
        response.status(401);
        response.send({
            info: "Unauthorized, invalid token"
        });
        return;
    }

    const transporter: any = nodemailer.createTransport({
        service: env.EMAIL.SERVICE,
        auth: {
            user: env.EMAIL.USER,
            pass: env.EMAIL.PASSWORD
        },
    });

    const options: any = {
        from: env.EMAIL.USER,
        to: body.to,
        subject: body.subject,
        text: body.text
    };

    try{
        Logger.emphasis("Trying to send email: ");
        console.log({
            to: body.to,
            subject: body.subject,
            text: body.text
        });
        await transporter.sendMail(options);
    }catch(e){
        Logger.error("Error trying to send email");
        console.log(e);
        response.status(500);
        response.send({
            info: "Tried to send the email but some error ocurred!"
        });
        return;
    }

    Logger.log("Email sent successfully!");

    response.status(200);
    response.send({
        info: "Email sent successfully!",
        data: body    
    });
    return;

});

export { mainRouter };