// PDF Download functionality
const downloadBtn = document.getElementById('downloadBtn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', async () => {
        // Check if html2pdf library is available, if not load it
        if (typeof html2pdf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            document.head.appendChild(script);
            
            script.onload = () => {
                generatePDF();
            };
        } else {
            generatePDF();
        }
    });
}

function generatePDF() {
    const element = document.querySelector('.content') || document.querySelector('.chapter-content') || document.body;
    const opt = {
        margin: 10,
        filename: getFileName(),
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    html2pdf().set(opt).from(element).save();
}

function getFileName() {
    const currentPath = window.location.pathname;
    const chapterNames = {
        'index.html': 'গবেষণা-শুরু',
        '01-introduction.html': '01-ভূমিকা',
        '02-literature.html': '02-সাহিত্য-পর্যালোচনা',
        '03-conceptual.html': '03-ধারণাগত-কাঠামো',
        '04-history.html': '04-ঐতিহাসিক-প্রেক্ষাপট',
        '05-religious.html': '05-ধর্মীয়-দৃষ্টিভঙ্গি',
        '06-types.html': '06-ধরন-এবং-প্রক্রিয়া',
        '07-psychological.html': '07-মনস্তাত্ত্বিক-বিশ্লেষণ',
        '08-scientific.html': '08-বৈজ্ঞানিক-বিশ্লেষণ',
        '09-social.html': '09-সামাজিক-প্রভাব',
        '10-case-studies.html': '10-কেস-স্টাডি',
        '11-legal.html': '11-আইনগত-দৃষ্টিভঙ্গি',
        '12-ethical.html': '12-নৈতিক-দিক',
        '13-risks.html': '13-ঝুঁকি-এবং-নিরাপত্তা',
        '14-discussion.html': '14-আলোচনা',
        '15-conclusion.html': '15-উপসংহার',
        '16-recommendations.html': '16-সুপারিশ',
        '17-references.html': '17-তথ্যসূত্র'
    };

    let fileName = 'গবেষণা-ডকুমেন্ট';
    Object.keys(chapterNames).forEach(key => {
        if (currentPath.includes(key)) {
            fileName = chapterNames[key];
        }
    });

    return fileName + '-' + new Date().getTime() + '.pdf';
}
