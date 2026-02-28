const collections = [
    {
        categoryName: "One Piece Episodes",
        videos: [
            { 
                title: "Episode 962", 
                poster: "https://i.animepahe.si/posters/14fdc4bb11b03ddd1e803582730fea4ab4782e7974ccf54e558dd50cd207f639.jpg", 
                embedUrl: "https://drive.google.com/file/d/1XsUm-Y_1mcD9Z4EHFmmCKPQqXIC9eMWi/preview" 
            },
            {
                 title: "Episode 969", 
                poster: "https://i.animepahe.si/posters/14fdc4bb11b03ddd1e803582730fea4ab4782e7974ccf54e558dd50cd207f639.jpg", 
                embedUrl: "https://drive.google.com/file/d/1ZuwCz_fh2D56kGh4-w2zZHHGLg-dRrAy/preview" 
            }
            
           
               ]
    },
    {
        categoryName: "Other Clips",
        videos: [
            { 
                title: "ByteHive Showcase", 
                poster: "ByteHive.jpg", 
                embedUrl: "" // Add another Drive preview link here
            }
        ]
    }
];

const container = document.getElementById("video-container");

// Generate Categorized Layout
collections.forEach((collection) => {
    const section = document.createElement("div");
    section.className = "category-section";
    section.id = collection.categoryName.replace(/\s+/g, '-'); 
    
    section.innerHTML = `
        <h2 class="category-title">${collection.categoryName}</h2>
        <div class="video-grid"></div>
    `;

    const grid = section.querySelector(".video-grid");

    collection.videos.forEach((video) => {
        const card = document.createElement("div");
        card.className = "video-card";
        card.onclick = () => openModal(video.embedUrl);

        card.innerHTML = `
            <div class="thumbnail-container">
                <img src="${video.poster}" alt="${video.title}">
                <div class="play-overlay">
                    <div class="play-button-icon">▶</div>
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(section);
});

// Modal Player Control
function openModal(url) {
    if (!url) return;
    const modal = document.getElementById("videoModal");
    const playerContainer = document.getElementById("player-container");
    
    playerContainer.innerHTML = `<iframe src="${url}" allow="autoplay" frameborder="0"></iframe>`;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    document.getElementById("player-container").innerHTML = "";
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Close if clicking outside the player
window.onclick = function(event) {
    if (event.target == document.getElementById("videoModal")) {
        closeVideo();
    }
}