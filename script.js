const collections = [
    {
        categoryName: "One Piece",
        categoryImage: "onepiece.jpg", // The image for the header
        videos: [
            { title: "Episode 962", poster: "onepiece.jpg", embedUrl: "https://drive.google.com/file/d/1XsUm-Y_1mcD9Z4EHFmmCKPQqXIC9eMWi/preview" },
            { title: "Episode 969", poster: "onepiece.jpg", embedUrl: "https://drive.google.com/file/d/1ZuwCz_fh2D56kGh4-w2zZHHGLg-dRrAy/preview" },
            { title: "Episode 970", poster: "onepiece.jpg", embedUrl: "https://drive.google.com/file/d/1G-jMuqoKT-s19Cv6_Xv1LO4Q8-DQ2mkZ/preview" }
        ]
    },
    {
        categoryName: "KaijU NO.8",
        categoryImage: "kaiju.jpg", // The image for the header
        videos: [ 
            { title: "Episode 01", poster: "kaiju.jpg", embedUrl: "https://drive.google.com/file/d/1vucYtLiFYQJz3yrrc7ekZU3vCu_ymqq1/preview" }
        ]
    },
    {
        categoryName: "Other Clips",
        categoryImage: "ByteHive.jpg", // The image for the header
        videos: [
            { title: "ByteHive Showcase", poster: "ByteHive.jpg", embedUrl: "" }
        ]
    }
];

const container = document.getElementById("video-container");

collections.forEach((collection) => {
    const section = document.createElement("div");
    section.className = "category-section";
    
    // Updated header HTML to include the small category image
    section.innerHTML = `
        <div class="category-header">
            <div class="header-left">
                <img src="${collection.categoryImage}" class="category-icon" alt="">
                <h2 class="category-title">${collection.categoryName}</h2>
            </div>
            <span class="dropdown-arrow">▼</span>
        </div>
        <div class="video-grid hidden"></div>
    `;

    const header = section.querySelector(".category-header");
    const grid = section.querySelector(".video-grid");
    const arrow = section.querySelector(".dropdown-arrow");

    header.onclick = () => {
        const isHidden = grid.classList.toggle("hidden");
        arrow.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
    };

    collection.videos.forEach((video) => {
        const card = document.createElement("div");
        card.className = "video-card";
        if (video.embedUrl) {
            card.onclick = (e) => {
                e.stopPropagation(); 
                openModal(video.embedUrl);
            };
        }

        card.innerHTML = `
            <div class="thumbnail-container">
                <img src="${video.poster}" alt="${video.title}">
                ${video.embedUrl ? `<div class="play-overlay"><div class="play-button-icon">▶</div></div>` : ''}
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
            </div>
        `;
        grid.appendChild(card);
    });

    container.appendChild(section);
});

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

window.onclick = function(event) {
    if (event.target == document.getElementById("videoModal")) {
        closeVideo();
    }
};
