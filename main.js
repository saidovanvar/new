let form = document.querySelector('#form');
let name = document.querySelector('#name');
let exams = document.querySelector(".exams");



async function dataFetch() {
    let response = await fetch(`https://crm-test-api.duckdns.org/api/Sections`, {
        method: 'GET',
        headers: {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw"
        }
    });

    let res = await response.json();
    exams.innerHTML = "";
    fetchSections(res.sections);
}

function fetchSections(sections) {
    sections.forEach(section => {
        let sectionDiv = document.createElement("div");
        sectionDiv.innerHTML = `
        <div class=" bg-[#9C9C9C] rounded-md px-[20px] py-[20px] mb-2">
         <p class="text-[#fff] font-bold">${section.name}</p>
            <button onclick="deleteSection(${section.id})" class="bg-red-400 hover:bg-red-600 text-white px-4 py-2 mt-2 rounded"> O‘chirish</button>
        </div>
           
        `;

        section.categories.forEach(category => {
            let categoryDiv = document.createElement("div");

            categoryDiv.innerHTML = `
              <div class=" mt-2 p-2">
             <p class="text-black font-semibold">${category.name}</p>

            </div>
            `;

            category.leads.forEach(lead => {
                let leadDiv = document.createElement("div");
                leadDiv.className = " ";
                leadDiv.innerHTML = `
                <div class="mt-2  p-2 rounded ">
                  <p><strong>${lead.firstName} ${lead.lastName}</strong></p>
                    <p>${lead.categoryName}</p>
                    <p>${lead.phoneNumber}</p>
                    <p>${lead.comment}</p>
                </div>
                  
                `;
                categoryDiv.appendChild(leadDiv);
            });

            sectionDiv.appendChild(categoryDiv);
        });

        exams.appendChild(sectionDiv);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let sectionName = name.value.trim();
    if (!sectionName) return;

    let sections = localStorage.getItem("sections");
    sections = sections ? JSON.parse(sections) : [];
    sections.push(sectionName);
    localStorage.setItem("sections", JSON.stringify(sections));

    let response = await fetch(`https://crm-test-api.duckdns.org/api/Sections`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw"
        },
        body: JSON.stringify({ name: sectionName })
    });

    if (response.ok) {
        alert("malumot  qo‘shildi");
        dataFetch();
    } else {
        alert("Xatolik yuz berdi");
    }
});

async function deleteSection(id) {


    let response = await fetch(`https://crm-test-api.duckdns.org/api/Sections/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw"
        }
    });

    if (response.ok) {
        alert("o‘chirildi");
        dataFetch();
    } else {
        alert(" xatolik ");
    }
}

dataFetch();