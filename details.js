const mobileMenuTab = document.getElementById('mobileMenuTab');
    const mobileMenu = document.getElementById('mobileMenu');
    const modalContent = document.getElementById('modalContent');
    
 const loader = document.getElementById('loader')

    function openMenu() {
      mobileMenuTab.classList.add('hidden');

      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
    //   bu lazimdirki transition opcaityde kecid effeck islesin, yoxsa hiddenlede yazmaq olar

      modalContent.classList.remove("translate-y-full");
       modalContent.classList.add("translate-y-0");   //yuxariya cixir
    }

    function closeModal() {
      mobileMenuTab.classList.remove('hidden');

      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');

      modalContent.classList.remove("translate-y-0");
     modalContent.classList.add("translate-y-full"); //asagiya dusur gorunmur
    }

const movieId = new URLSearchParams(window.location.search).get('id')

async function getMovieDetails() {
    const res = await fetch('https://parkcinema-data-eta.vercel.app/landing')
    const movieDetails = await res.json()
    const movies = movieDetails.find(item => item.id === movieId)
    showMovieDetails(movies)
    loader.style.display = 'none';
    
}
getMovieDetails()


// INFORMATION SECTION FOR ME 

// const movie = {
//   title: "Inception",
//   time: "20:00",
//   genre: "Sci-Fi"
// }; Js object
// {
//   "title": "Inception",
//   "time": "20:00",
//   "genre": "Sci-Fi"
// } - json format, so we usre .json() to convert totals string to const js obj so we can use it, but json format is how info is saved and send. Computers can only work directly with data in memory (objects, numbers, arrays).
// Text strings are just raw data — until parsed, the computer can’t easily get, for example, the value of "title". so parse and json is same.
// json string ise onu obj to string edirki server onu basa dussun

// JavaScript object  --JSON.stringify()-->  JSON string (text/raw data)  --network-->  Server
// Server  --parsing-->  Server-side object  --işlənir-->    //yeni server raw data ile isleyir.

const movieDetailsById = document.getElementById('movieDetailsById')

function embeded(url) {
    return url.replace("watch?v=", "embed/")
}
// youtube icaze vermirki biz linki basqa menbeded oldugu kimi acaq, ona gore bize lazimdi embed, bu formada acmaq olar
// "Embed" sözü "gömmək, yerləşdirmək" deməkdir. Web proqramlaşdırmada isə bu, başqa bir veb səhifənin və ya kontentin (məsələn video, xəritə, post və s.) sənin saytında göstərilməsi deməkdir. cox vaxti biz youtubede embed forma aliriq. birbasa watch yox



// code dəyişəni HTML kod parçalarını yığıb saxlayacaq bir konteyner kimi işləsin.
// Kodun içərisində += istifadə olunursa (yəni bir neçə kart, bir neçə film və s. göstərmək istəyirsənsə), o zaman bu dəyişənin əvvəlcə boş olması məntiqi və texniki cəhətdən vacibdir.
// Tək bir obyekt (ID ilə spesifik film)	code = ...
// Çoxlu obyekt (yenimap və ya bütün filmlər)	code += ... və map və ya forEach




  
  

function showMovieDetails(movies) {
    let movieGenres = movies.genres.map(item => item.title).join(', ')
    //   array idi onu string eledim, ayda youtube videos dehsetda oz videom
    let movieLang =  movies.languages.map(item =>  `<img  src="https://flagcdn.com/w40/${item.toLowerCase()}.png" alt="${item}" class="w-5 h-5 rounded-full" />`).join(' ') //eger burda array icinde direct sstringdirse orda birder onun icindeki nese yazmaga gerek yoxdu diret item yaz

        // arrayin check edende onun uzunluguna easesn edirik. cunki [] still truedu, ona gore bize empty or full lazim olanda lengthle yoxlayiriq
    let subtitles =  movies.subtitles.length === 0 ?`<span>Altyazı yoxdur</span>`: movies.subtitles.map(item =>  `<img  src="https://flagcdn.com/w40/${item.toLowerCase()}.png" alt="${item}" class="w-5 h-5 rounded-full" />`).join(' ')
    let allActors = movies.actors.map(item => item)
    
        const ageToNumber = {
            "zero": 0,
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9,
            "ten": 10,
            "eleven": 11,
            "twelve": 12,
            "thirteen": 13,
            "fourteen": 14,
            "fifteen": 15,
            "sixteen": 16,
            "seventeen": 17,
            "eighteen": 18,
            "nineteen": 19,
            "twenty": 20
        }

        const age = movies.ageLimit.toLowerCase()
        const number = ageToNumber[age]

        // const keys = Object.keys(ageToNumber)
        // console.log(keys);
        // property
        

        let firstScreenDate = movies.firstScreeningDate.split("T")[0].split("-").reverse().join(".")
        

        let hour = String(Math.floor(movies.duration / 60)).padStart(2, '0')
        let minute =  String(movies.duration % 60).padStart(2, '0')
        let second ='00'
        let totalMinute = `${hour}:${minute}:${second}`
        
 
    // men artiq bir cos seyi ciarmiramki maplayim
        movieDetailsById.innerHTML = 
        `
            <!-- Trailer -->
            <div class="min-[770px]:w-[50%] order-first min-[770px]:order-last">
                <iframe
                    class="w-full min-[770px]:h-[60%] h-full  rounded-lg"
                    src="${embeded(movies.youtubeUrl)}"
                    frameborder="0"
                    allowfullscreen
                >${movies.youtubeUrl}</iframe>
            </div>

            <div class="flex flex-col min-[770px]:w-[50%] text-[#D9DADB] order-last min-[770px]:order-first gap-4">
                <div class="flex w-full  gap-6" >
                    <div class="flex-shrink-0 w-full hidden lg:flex lg:w-1/3">
                            <img src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${movies.image}&w=640&q=75" alt="picture" class="rounded-xl w-full object-cover" />
                    </div>
                    <div class="space-y-2">
                        <h2 class="text-2xl font-bold">${movies.name}</h2>
                        <p class="text-sm text-gray-300">${movieGenres}</p>
                        <div class="flex items-center gap-2">
                            <p class="font-semibold">Dil:</p>
                            <p class="font-semibold flex gap-2">${movieLang}</p>
                        </div>
                        <p class="flex gap-2 items-center">
                            <span class="font-semibold">Altyazı:</span>
                             <span class="text-red-500">${subtitles}</span>
                        </p>
                        <p><span class="font-semibold">Müddət:</span> ${totalMinute}</p>
                        <p><span class="font-semibold">İl:</span> ${movies.year}</p>
                        <p><span class="font-semibold">Ölkə:</span> ${movies.country}</p>
                        <p><span class="font-semibold">Rejissor:</span> ${movies.director}</p>
                        <p><span class="font-semibold">Aktorlar:</span> ${allActors}</p>
                        <p><span class="font-semibold">Yaş Həddi:</span> ${number}+</p>
                        <p><span class="font-semibold">Nümayiş Tarixi:</span> ${firstScreenDate}</p>
                    </div>
                    
                </div>
                <div class="mt-8">
                    <p>${movies.description}</p>
                </div>
            </div>
            
        `
}


const buyTicket = document.getElementById('buyTicket')
async function chooseTicket() {
    const res = await fetch('https://parkcinema-data-eta.vercel.app/detail')
    const chooseTicketData = await res.json()
    console.log(chooseTicketData)
    showChosenTickets(chooseTicketData)    
}
chooseTicket()

const theatreTitle = document.getElementById('theatreTitle')
const chooseLanguage = document.getElementById('chooseLanguage')
let uniqueTheathe = new Set()

function showChosenTickets(chooseTicketData) {
    theatreTitle.innerHTML = ''
    chooseLanguage.innerHTML = ''
       
    const uniqueTheatre = [...new Set(chooseTicketData.map(item => item.theatreTitle))];

    theatreTitle.innerHTML = uniqueTheatre.map(theatre => 
        `<option class="bg-gray-700" value="${theatre}">${theatre}</option>`
    ).join('');

    const uniqueLanguages = [...new Set(chooseTicketData.map(item => item.language))];

    chooseLanguage.innerHTML = uniqueLanguages.map(lang =>
        `<option class="bg-gray-700" value="${lang}">${lang}</option>`
    ).join('');

    let code = ''
    chooseTicketData.map(item => { 


        code += 
        `
            <div class="flex items-center justify-between gap-4 p-4 text-white bg-[#3a3a3a] border-b border-gray-400">
                <span class="w-20 text-sm">${item.time}</span>
                <span class="w-20 text-sm">${item.movie.name}</span>
                <span class=" text-sm text-center">${item.theatreTitle} | ${item.hallTitle}</span>
                <span class="w-10 text-sm text-center">2D</span>
                <img src="https://flagcdn.com/w40/ru.png" alt="Russian" class="w-6 h-6 rounded-full object-cover" />
                <div class="px-3 py-1 text-center border border-white rounded-md leading-tight">
                    <div class="text-xs font-semibold">AZE</div>
                    <div class="text-[10px] text-gray-300">sub</div>
                </div>
                <button onclick="window.location.href='http://127.0.0.1:5500/ticketPage.htm?id=${item.sessionId}'" class="px-6 py-2 text-sm font-semibold text-white bg-[#a63128] rounded-full">
                    Book a ticket
                </button>
            </div>
        `
        
    })
    buyTicket.innerHTML = code
}

