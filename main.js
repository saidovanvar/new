let form = document.querySelector('#form');
let name = document.querySelector('#name');
let exams = document.querySelector(".exams");


const endpoints = {
    section: "Sections",
    category: "Categories",
    lead: "Leads"
};

let dataFetch = async () => {
    let response = await fetch(`https://crm-test-api.duckdns.org/api/Sections`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw`
        }
    });

    let res = await response.json();
    exams.innerHTML = "";
    fetchSections(res.sections);
};


function fetchSections(sections) {
    sections.forEach(section => {

        let li = document.createElement("li");
        li.innerHTML = `
      <div class="border bg-red-300 px-[20px] py-[20px]">
        <p class="text-black">${section.name}</p>
        <button data-id="${section.id}" data-type="section" class="btn_delete bg-red-500 p-4 w-full text-white mt-4 rounded-md hover:bg-blue-400">Delete Section</button>
      </div>
    `;

        section.categories.forEach(category => {
            let div = document.createElement("div");
            div.innerHTML = `
        <div class="border bg-red-300 px-[20px] py-[20px]">
          <p class="text-black">${category.name}</p> 
          <button data-id="${category.id}" data-type="category" class="btn_delete bg-red-500 p-4 w-full text-white mt-4 rounded-md hover:bg-blue-400">Delete Category</button>
        </div>
      `;

            category.leads.forEach(lead => {
                let leadText = document.createElement("div");
                leadText.innerHTML = ` 
          <div class="border bg-red-300 px-[20px] py-[20px] text-black">
            <p>${lead.firstName} ${lead.lastName}</p>
            <p>${lead.categoryName}</p>
            <p>${lead.phoneNumber}</p> 
            <p>${lead.comment}</p>
            <button data-id="${lead.id}" data-type="lead" class="btn_delete bg-red-500 p-4 w-full text-white mt-4 rounded-md hover:bg-blue-400">Delete Lead</button>
          </div>
        `;
                exams.appendChild(leadText);
            });

            exams.appendChild(div);
        });

        exams.appendChild(li);
    });


    let btn_delete = document.querySelectorAll(".btn_delete");
    btn_delete.forEach(button => {
        button.addEventListener('click', async (e) => {
            let id = e.target.getAttribute('data-id');
            let type = e.target.getAttribute('data-type');
            await deleteByType(id, type);
        });
    });
}


async function deleteByType(id, type) {
    let endpoint = endpoints[type];

    if (!endpoint) {
        alert("Noto‘g‘ri tur: " + type);
        return;
    }

    let url = `https://crm-test-api.duckdns.org/api/${endpoint}/${id}`;

    let res = await fetch(url, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw`
        }
    });

    if (res.ok) {
        alert(`${type} o'chirildi`);
        dataFetch();
    } else {
        alert(`O‘chirishda xatolik: ${res.status}`);
    }
}


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let response = await fetch(`https://crm-test-api.duckdns.org/api/Sections`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw`
        },
        body: JSON.stringify({
            name: name.value
        })
    });

    await response.json();

    if (response.ok) {
        alert("Yangi bo‘lim qo‘shildi");
        dataFetch();
    } else {
        alert("Qo‘shishda xatolik");
    }
});

dataFetch();
