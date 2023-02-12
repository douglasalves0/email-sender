import { Router } from "express";
import { Request, Response } from "express";
import { EmailData } from "../types/email.data";
import { RequestValidator } from "./request.validator";
import { Logger } from "../logger/logger";
import nodemailer from "nodemailer";
import env from "./../config/env";

const mainRouter: Router = Router();

mainRouter.post('/', async (req: Request, res: Response) => {

    const body: EmailData = req.body;
    console.log(body);

    if(!RequestValidator.validate(body)){
        res.status(400);
        res.send({
            error: "invalid body"
        });
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
        res.status(500);
        res.send({
            info: "Tried to send the email but some error ocurred!"
        });
        return;
    }

    Logger.log("Email sent successfully!");

    res.status(200);
    res.send({
        info: "Email sent successfully!",
        data: body    
    });
    return;

});

export { mainRouter };