const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USER,
        pass: process.env.ETHEREAL_PASS
    }
});

const sendAccountCreationEmail = async (to, name) => {
    const mailOptions = {
        from: process.env.ETHEREAL_USER,
        to: to,
        subject: 'Welcome to Our Service',
        text: `Hello ${name},\n\nWelcome to our service! We're glad to have you with us.\n\nBest regards,\nThe Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
const sendFilmAdditionEmail = async (to, filmTitle) => {
    const mailOptions = {
        from: process.env.ETHEREAL_USER,
        to: to,
        subject: 'New Film Available!',
        text: `Hello,\n\nA new film titled "${filmTitle}" has been added to our collection. Check it out!\n\nBest regards,\nThe Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Film addition email sent successfully');
    } catch (error) {
        console.error('Error sending film addition email:', error);
    }
};

const sendFavoriteFilmGotUpdatedEmail = async (to, filmTitle) => {
    const mailOptions = {
        from: process.env.ETHEREAL_USER,
        to: to,
        subject: 'Your Favorite Film Got Updated!',
        text: `Hello,\n\nThe film "${filmTitle}" in your favorites list has been updated. Check out the new details!\n\nBest regards,\nThe Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Favorite film update email sent successfully');
    } catch (error) {
        console.error('Error sending favorite film update email:', error);
    }
};

const sendFilmsCSVByEmail = async (to, csvStream) => {
    const mailOptions = {
        from: process.env.ETHEREAL_USER,
        to: to,
        subject: 'List of Films',
        text: 'Attached is the list of films in CSV format.',
        attachments: [{
            filename: 'films.csv',
            content: csvStream
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Films CSV email sent successfully');
    } catch (error) {
        console.error('Error sending films CSV email:', error);
    }
};

module.exports = {
    sendAccountCreationEmail,
    sendFilmAdditionEmail,
    sendFavoriteFilmGotUpdatedEmail,
    sendFilmsCSVByEmail
};