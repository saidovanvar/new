let form = document.querySelector('#form');
let name = document.querySelector('#name');
let exams = document.querySelector(".exams");
let editId
let add = document.querySelector('.add');
let a = false
const endpoints = {
    section: "Sections",
    category: "Categories",
    lead: "Leads"
};
if(a){
    add.textContent = "updata"
}else{
    add.textContent = "add"
}

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
        <div class="flex gap-4">
           <button data-id="${section.id}" data-type="section" class="btn_delete bg-red-500 p-4 w-full text-white mt-4 rounded-md hover:bg-blue-400">Delete Section</button>
              <button data-id="${section.id}" class="btn_edit bg-yellow-500 p-4 w-[150px] text-white cursor-pointer duration-150 mt-4 rounded-md hover:bg-yellow-700">
         Edit </button>
</div>
     
      </div>

    `;

        section.categories.forEach(category => {
            let div = document.createElement("div");
            div.innerHTML = `
        <div class="border bg-red-300 px-[20px] py-[20px]">
          <p class="text-black">${category.name}</p> 
          <button data-id="${category.id}" data-type="category" class="btn_delete bg-red-500 p-4 w-full text-white mt-4 rounded-md hover:bg-blue-400">Delete Category</button>
           <button data-id="${category.id}" class="btn_edit bg-yellow-500 p-4 w-full text-white cursor-pointer duration-150 mt-4 rounded-md hover:bg-yellow-700">
         Edit </button>
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
                 <button data-id="${lead.id}" class="btn_edit bg-yellow-500 p-4 w-full text-white cursor-pointer duration-150 mt-4 rounded-md hover:bg-yellow-700">
         Edit </button>
          </div>
       
        `;
                exams.appendChild(leadText);
            });

            exams.appendChild(div);
        });

        exams.appendChild(li);
    });

    let btn_edit = document.querySelectorAll(".btn_edit");
    let btn_delete = document.querySelectorAll(".btn_delete");
    btn_delete.forEach(button => {
        button.addEventListener('click', async (e) => {
            let id = e.target.getAttribute('data-id');
            let type = e.target.getAttribute('data-type');
            await deleteByType(id, type);
        });
    });
    btn_edit.forEach(edit => {
        edit.addEventListener('click', async (e) => {
            let id = e.target.getAttribute('data-id');
            await editAction(id)


        });
    });
}
async function editAction(id) {
    let response = await fetch(`https://crm-test-api.duckdns.org/api/Sections/${id}/` , {
        method: 'GET',
        headers: {
            "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw`
        }
    })
    let data = await response.json();
    name.value = data.name;
    editId = id
    a = true


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
        alert(` xatolik:`);
    }
}


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let response = async ()=> {
        let post

        if (a){


            post = await fetch(`https://crm-test-api.duckdns.org/api/Sections/${editId}/`, {

                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw`
                },
                body: JSON.stringify({
                    name: name.value
                })
            });

        } else {


            post = await fetch(`https://crm-test-api.duckdns.org/api/Sections`, {

                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImFzaWxiZWsiLCJ1bmlxdWVfbmFtZSI6Iis5OTg5MTQ1NDIzMzkiLCJqdGkiOiIzMjJjM2Y4Yi1mMTMxLTRkNmUtYmE2Zi1iZTlkMTY4MDQ2MmUiLCJUZW5hbnRJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc1NjkxNTc5NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.EYljRkOlh94fuprfOFInoSv51vhKtviP1icgZqik7Dw`
                },
                body: JSON.stringify({
                    name: name.value
                })
            })

        }


        await response.json();

        if (response.ok) {
            alert(" qo‘shildi");
            dataFetch();
        } else {
            alert(" xatolik");
        }
    }
    dataFetch();
})
