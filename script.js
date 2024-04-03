document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.getElementById('register-btn');
    registerBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const id = document.getElementById('id').value;
        const name = document.getElementById('fullname').value;
        const address = document.getElementById('address').value;
        const status = document.getElementById('status').value;
        console.log(name)

        if (!id) {
            document.getElementById('message').textContent = "ID cannot be empty.";
            return;
        }

        if (!name) {
            document.getElementById('message').textContent = "Name cannot be empty.";
            return;
        }

        if (!address) {
            document.getElementById('message').textContent = "Address cannot be empty.";
            return;
        }

        if (isNaN(Number(id))) {
            document.getElementById('message').textContent = "ID should be a number.";
            return;
        }

        fetch('https://a2-backend-mo6x.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                fullName: name,
                address: address,
                status: status
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response data
            handleReg(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

function handleReg(dataObj) {
    console.log(dataObj)
    document.getElementById('registration-table').style.display = 'none';
    const confirmationTable = document.getElementById('confirmation-table');
    confirmationTable.classList.remove('hidden');
    document.getElementById('conf-id').textContent = dataObj.id;
    document.getElementById('conf-fullname').textContent = dataObj.fullName;
    document.getElementById('conf-address').textContent = dataObj.address;
    document.getElementById('conf-status').textContent = upperFirstChar(dataObj.status);
    document.getElementById('conf-fee').textContent = `$${dataObj.fee}`;
}

function upperFirstChar(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
