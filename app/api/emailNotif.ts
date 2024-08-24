import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'barber@gmail.com',
    pass: 'falm svij kkzl qwoi', // generated password by google example
  },
});

export default async function handler(req: { body: { name: any; email: any; phone: any; address: any; corte: any; silla: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) {
    const { name, email, phone, address, corte, silla } = req.body;

    const mailOptions = {
    from: 'from.dev.trip@gmail.com',
    to: 'from.the.trip@gmail.com',
    subject: 'You got an order',
    text: `You got an order from ${name} with email ${email} and additional information ${phone}, ${address}, ${corte}, ${silla}.`,
    };

    try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent' });
      }
    });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error sending email' });
    }
    return res.status(200).json({ message: 'Email sent' });
}