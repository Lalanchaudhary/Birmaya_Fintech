import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, email, phone, coverLetter, jobTitle } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending to admin
            subject: `New Job Application for ${jobTitle}`,
            text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Job Title: ${jobTitle}
        
        Cover Letter:
        ${coverLetter}
      `,
            html: `
        <h3>New Job Application</h3>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr />
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter.replace(/\n/g, '<br>')}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 });
    }
}
