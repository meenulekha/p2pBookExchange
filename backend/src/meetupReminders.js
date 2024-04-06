const cron = require('node-cron');
const nodemailer = require('nodemailer');

function sendMeetupReminders() {
    // example data
    const upcomingMeetups = [
        { 
            title: "Book exchange",
            date: "2024-04-07",
            time: "15:00",
            location: "Tampines"
        },
        {
            title: "Book exchange",
            date: "2024-04-10",
            time: "10:00",
            location: "Marina Bay Sands"
        },
        {
            title: "Book exchange",
            date: "2024-04-15",
            time: "18:00",
            location: "Jurong"
        }
    ];

    upcomingMeetups.forEach(meetup => {
        // mock implementation for sending email reminders
        console.log(`Sending reminder for ${meetup.title} on ${meetup.date} at ${meetup.time}`);
    });
}

cron.schedule('0 9 * * *', () => {
    sendMeetupReminders();
});
