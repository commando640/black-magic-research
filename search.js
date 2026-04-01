// Search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Sample searchable content data
const searchableContent = {
    'কালো যাদু': ['01-introduction.html', '03-conceptual.html', '06-types.html'],
    'জিন': ['03-conceptual.html', '05-religious.html', '06-types.html'],
    'কুফরি': ['01-introduction.html', '05-religious.html', '12-ethical.html'],
    'ইসলাম': ['05-religious.html', '12-ethical.html', '14-discussion.html'],
    'বৈজ্ঞানিক': ['08-scientific.html', '07-psychological.html', '14-discussion.html'],
    'মনস্তাত্ত্বিক': ['07-psychological.html', '09-social.html', '10-case-studies.html'],
    'সামাজিক': ['09-social.html', '10-case-studies.html', '14-discussion.html'],
    'আইনি': ['11-legal.html', '12-ethical.html', '16-recommendations.html'],
    'প্রতারণা': ['09-social.html', '11-legal.html', '12-ethical.html'],
    'ঐতিহাসিক': ['04-history.html', '02-literature.html'],
    'গবেষণা': ['02-literature.html', '08-scientific.html', '10-case-studies.html'],
    'ঝুঁকি': ['13-risks.html', '14-discussion.html', '16-recommendations.html'],
    'সচেতনতা': ['16-recommendations.html', '14-discussion.html', '09-social.html'],
    'শিক্ষা': ['16-recommendations.html', '15-conclusion.html'],
    'নৈতিকতা': ['12-ethical.html', '14-discussion.html', '15-conclusion.html']
};

const chapterTitles = {
    '01-introduction.html': 'ভূমিকা',
    '02-literature.html': 'সাহিত্য পর্যালোচনা',
    '03-conceptual.html': 'ধারণাগত কাঠামো',
    '04-history.html': 'ঐতিহাসিক প্রেক্ষাপট',
    '05-religious.html': 'ধর্মীয় দৃষ্টিভঙ্গি',
    '06-types.html': 'ধরন ও প্রক্রিয়া',
    '07-psychological.html': 'মনস্তাত্ত্বিক বিশ্লেষণ',
    '08-scientific.html': 'বৈজ্ঞানিক বিশ্লেষণ',
    '09-social.html': 'সামাজিক প্রভাব',
    '10-case-studies.html': 'কেস স্টাডি',
    '11-legal.html': 'আইনগত দৃষ্টিভঙ্গি',
    '12-ethical.html': 'নৈতিক দিক',
    '13-risks.html': 'ঝুঁকি ও নিরাপত্তা',
    '14-discussion.html': 'আলোচনা',
    '15-conclusion.html': 'উপসংহার',
    '16-recommendations.html': 'সুপারিশ',
    '17-references.html': 'তথ্যসূত্র'
};

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const results = performSearch(query);
        displaySearchResults(results, query);
    });

    // Close search results when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

function performSearch(query) {
    const results = new Set();
    
    // Search in keywords
    Object.keys(searchableContent).forEach(keyword => {
        if (keyword.includes(query)) {
            searchableContent[keyword].forEach(chapter => results.add(chapter));
        }
    });

    // Search in chapter titles
    Object.entries(chapterTitles).forEach(([chapter, title]) => {
        if (title.includes(query)) {
            results.add(chapter);
        }
    });

    return Array.from(results);
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item" style="text-align: center; color: gray;">কোনো ফলাফল পাওয়া যায়নি</div>';
        searchResults.classList.add('active');
        return;
    }

    const html = results.map(chapter => `
        <a href="chapters/${chapter}" class="search-result-item">
            <strong>${chapterTitles[chapter] || chapter}</strong>
            <small style="display: block; margin-top: 5px; opacity: 0.7;">খুঁজে পাওয়া: "${query}"</small>
        </a>
    `).join('');

    searchResults.innerHTML = html;
    searchResults.classList.add('active');
}
