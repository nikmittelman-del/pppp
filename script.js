function confirmArrival(event) {
    const btn = document.querySelector('.btn');
    const msg = document.getElementById('confirmationMsg');
    
    btn.style.display = 'none';
    msg.style.display = 'block';

    // יצירת אירוע יומן להורדה
    addToCalendar();
}

function addToCalendar() {
    // חישוב תאריך למחר ב-19:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // פורמט תאריך ל-iCal (YYYYMMDDTHHMMSS)
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    const startTime = `${year}${month}${day}T190000`;
    const endTime = `${year}${month}${day}T200000`;

    // מבנה קובץ היומן
    const icsMsg = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        "DTSTART:" + startTime,
        "DTEND:" + endTime,
        "SUMMARY:פגישת טיפול - זמן לעצמך 🌿",
        "DESCRIPTION:מפגש להתחדשות ושלווה פנימית",
        "LOCATION:קליניקה / זום",
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\n");

    // יצירת לינק להורדה אוטומטית
    const blob = new Blob([icsMsg], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'therapy_session.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}