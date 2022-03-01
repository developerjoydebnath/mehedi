const searchField = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = (phones) => {
    // console.log(phones)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (phones.length < 20) {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top pt-3 w-50 mx-auto" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                        <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
    else {
        console.log(phones)
        const cutExtras = phones.slice(0, 20);
        console.log(cutExtras)
        const allPhones = phones.slice(20, phones.length);
        console.log('allPhone: ', allPhones)
        const showMoreDiv = document.createElement('div');
        showMoreDiv.innerHTML = `
        <div class="col h-100">
                <div class="card h-100">
                    <div class="card-body">
                    <button onclick="showMorePhones(${allPhones})" type="button" class="btn btn-primary">
                    Show More
                    </button>
                    </div>
                </div>
            </div>
        `;
        cutExtras.forEach(phone => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top pt-3 w-50 mx-auto" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Name: ${phone.phone_name}</h5>
                        <p class="card-text">Brand: ${phone.brand}</p>
                        <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
            `;

            searchResult.appendChild(div);
            searchResult.appendChild(showMoreDiv);
        });
    }
}

// fhlkfhfkjsg
const showMorePhones = (more) => {
    console.log(more);
}

const phoneDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

const displayPhoneDetails = (details) => {
    const detailsContainer = document.getElementById('show-details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="w-50 mx-auto">
        <img src="${details.image}" class="card-img-top pt-3" alt="">
        </div>
        <h5 class="text-center my-2">${details.name}</h5>
        <h5 class="text-center my-2">Brand: ${details.brand}</h5>
        <p class="text-center my-2">Release Date: ${details.releaseDate}</p>
        <ul class="list-group">
            <li class="list-group-item">Display: ${details.mainFeatures.displaySize}</li>
            <li class="list-group-item">Chipset: ${details.mainFeatures.chipSet}</li>
            <li class="list-group-item">Memory: ${details.mainFeatures.memory}</li>
            <li class="list-group-item">Storage: ${details.mainFeatures.storage}</li>
            <li class="list-group-item">Sensor: ${details.mainFeatures.sensors[0]}, ${details.mainFeatures.sensors[1]}, ${details.mainFeatures.sensors[2]}, ${details.mainFeatures.sensors[3]}, ${details.mainFeatures.sensors[4]}, ${details.mainFeatures.sensors[5]}</li>
            <li class="list-group-item">Others: ${details.brand}</li>
        </ul>
    `;
    detailsContainer.appendChild(div);

}