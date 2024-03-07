document.addEventListener('DOMContentLoaded', fetchParties);

function fetchParties() {
    fetch('/api/parties')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('parties');
        list.innerHTML = ''; 
        data.forEach(party => {
            const item = document.createElement('li');
            item.textContent = `${party.name}, Date: ${party.date}, Time: ${party.time}, Location: ${party.location}, Description: ${party.description}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() { deleteParty(party.id); };
            item.appendChild(deleteButton);
            list.appendChild(item);
        });
    });
}

function addParty() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    fetch('/api/parties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date, time, location, description }),
    })
    .then(response => response.json())
    .then(() => {
        fetchParties();
    });
}

function deleteParty(id) {
    fetch(`/api/parties/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        fetchParties(); 
    });
}
