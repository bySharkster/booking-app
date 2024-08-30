import nodemailer from 'nodemailer';
// import { NextResponse } from "next/server";
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'gregor.gr20@gmail.com',  // un email provicional que envie emails a otro email
    pass: 'pelo wgrn sgdf ihqx', // generated password by google example (for google: https://myaccount.google.com/apppasswords)
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, phone, corte, silla, reservationId } = await req.json();

    const mailOptions = {
    from: 'gregor.gr20@gmail.com',
    to: 'fernandoaponte0609@gmail.com',
    subject: 'A client booked a haircut',
    text: `You got an order from ${name} \n
     his email is: ${email} & his phone
     number:${phone} \n \n
     he wants ${corte} & wants barber #${silla}. \n \n
     The reservation id is: ${reservationId}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        throw new Error('Error sending email');
      } else {
        // console.log('Email sent: ' + info.response);
      }
    });
    return new Response('Email sent', { status: 200 });
    // return NextResponse.redirect(`/booking`);
  }
  catch (error) {
    console.log(error);
    throw new Error('Error sending email');
  }
}