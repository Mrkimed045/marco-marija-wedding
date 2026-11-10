// Wedding countdown timer
function updateCountdown() {
    const weddingDate = new Date(2027, 4, 22, 16, 30); // May 22, 2027 at 16:30
    const now = new Date();
    const timeDifference = weddingDate - now;

    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Wedding has passed
        document.getElementById('countdown').innerHTML = '<h3>Sretno vjenčani!</h3>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();

// Image slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slider-image');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

// Auto-rotate slides every 4 seconds
if (totalSlides > 0) {
    setInterval(nextSlide, 4000);
}

// Handle dot click navigation
dots.forEach(dot => {
    dot.addEventListener('click', function () {
        currentSlideIndex = parseInt(this.getAttribute('data-index'));
        showSlide(currentSlideIndex);
    });
});

// Calendar event details
const eventDetails = {
    title: 'Vjenčanje - Wedding',
    startDate: new Date(2027, 4, 22, 16, 30), // May 22, 2027 at 16:30
    endDate: new Date(2027, 4, 22, 23, 30),   // Same day, 23:30
    location: 'Hotel Omorika, Croatia',
    description: 'Svečano vjenčanje'
};

// Add to Google Calendar
function addToGoogleCalendar() {
    const startDate = eventDetails.startDate.toISOString().replace(/-|:|\.\d{3}/g, '');
    const endDate = eventDetails.endDate.toISOString().replace(/-|:|\.\d{3}/g, '');
    const description = encodeURIComponent(eventDetails.description);
    const location = encodeURIComponent(eventDetails.location);
    const title = encodeURIComponent(eventDetails.title);
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&location=${location}&details=${description}`;
    window.open(url, '_blank');
}

// Add to Outlook/Microsoft Calendar
function addToOutlook() {
    const startDate = eventDetails.startDate.toISOString();
    const endDate = eventDetails.endDate.toISOString();
    const location = encodeURIComponent(eventDetails.location);
    const title = encodeURIComponent(eventDetails.title);
    const description = encodeURIComponent(eventDetails.description);
    
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&location=${location}&body=${description}`;
    window.open(url, '_blank');
}

// Download as .ics file (works with Apple Calendar, Outlook, etc.)
function downloadICS() {
    const startDate = formatDateForICS(eventDetails.startDate);
    const endDate = formatDateForICS(eventDetails.endDate);
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${eventDetails.title}
X-WR-TIMEZONE:Europe/Zagreb
BEGIN:VEVENT
UID:wedding-2027-05-22@example.com
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventDetails.title}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    
    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'vjenčanje-2027.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// Helper function to format date for ICS format
function formatDateForICS(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}