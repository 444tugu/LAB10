const RSS_URL = "rss.xml";

function fetchNews() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", RSS_URL, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xml = xhr.responseXML;
            if (xml) {
                displayNewsTitles(xml);
            } else {
                console.error("XML өгөгдөл уншигдсангүй.");
            }
        }
    };
    xhr.send();
}

function displayNewsTitles(xml) {
    const items = xml.querySelectorAll("item");
    const content = document.getElementById("content");
    content.innerHTML = ""; 

    const list = document.createElement("ul"); 

    items.forEach((item, index) => {
        const title = item.querySelector("title").textContent;

        const listItem = document.createElement("li");
        listItem.textContent = title;
        listItem.style.cursor = "pointer";
        listItem.onclick = () => viewDetails(item);

        list.appendChild(listItem);
    });

    content.appendChild(list);
}

function viewDetails(item) {
    const title = item.querySelector("title").textContent;
    const description = item.querySelector("description").textContent;
    const link = item.querySelector("link").textContent;
    const pubDate = item.querySelector("pubDate").textContent;

    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <p><a href="${link}" target="_blank">Эх сурвалж руу очих</a></p>
        <small>${pubDate}</small>
        <p><a href="#" onclick="fetchNews()">Буцах</a></p>
    `;
}

document.addEventListener("DOMContentLoaded", fetchNews);
