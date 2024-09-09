// popup.js

document.getElementById('analyzeButton').addEventListener('click', () => {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Send a message to the content script to start analyzing links
        chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzeLinks' }, (response) => {
            const linksList = document.getElementById('linksList');
            linksList.innerHTML = ''; // Clear previous results

            if (response && response.links && response.links.length > 0) {
                // Alert each link's URL
             
                response.links.forEach(link => {
                    alert(`URL: ${link.href}`);
                    
                //   Create a list item and append it to the popup
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${link.href}" target="_blank">${link.text}</a>`;
                    linksList.appendChild(listItem);
                });
            } 
        });
    });
});




