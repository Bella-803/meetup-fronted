import jspdf from "jspdf";
import "jspdf-autotable";
import {format} from "date-fns";

const pdfGenerator = (meetups) => {

    const doc = new jspdf();

    const tableColumn = [
        "Meetup Title",
        "Description",
        "Group Name",
        "Category Name",
        "Location",
        "Date and Time",
        "No of Attendees",
        ];

        const tableRow = [];
        const date = new Date();
        const dateToDisplay = format(date, "MMM dd yyyy");

        meetups.forEach(meetup => {
            const meetupData = [
                meetup.meetingTitle,
                meetup.description,
                meetup.meetupGroup.groupName,
                meetup.meetupGroup.category.categoryName,
                meetup.location,
                meetup.dateAndTime,
                meetup.numberOfAttendees,
                
            ];

            tableRow.push(meetupData)
        })

        doc.autoTable(tableColumn, tableRow, {startY:65});
        

        doc.setFont("Georgia");
        doc.setFontSize(20);
        doc.text('MEETUP SYSTEM',15, 30);

        doc.setFont("Georgia", "italic");
        doc.setFontSize(16);
        doc.text(`Printed on ${dateToDisplay}`, 15, 40);

        doc.setFont("Georgia", "italic");
        doc.setFontSize(18);
        doc.text('Report of All Meetups Of the Month of ... ',70, 55);
        
       
        doc.save("meetup_report.pdf");
        
}

export default pdfGenerator;