const socket = io("http://localhost:4000");

socket.on("newsUpdate", (news) => {
    const newsList = document.getElementById("news-feed");
    
    const newsItem = document.createElement("li");
    newsItem.classList.add("news-item");
    newsItem.innerHTML = `<strong>${news.timestamp}</strong>: ${news.text}`;
    
    newsList.prepend(newsItem); // Add new news to the top
});
