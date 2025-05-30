const mobileMenuTab = document.getElementById('mobileMenuTab');
    const mobileMenu = document.getElementById('mobileMenu');
    const modalContent = document.getElementById('modalContent');

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
console.log(movieId)

async function getMovieDetails() {
    const res = await fetch('https://parkcinema-data-eta.vercel.app/landing')
    const movieDetails = await res.json()
    const movies = movieDetails.find(item => item.id === movieId)
    console.log(movies)
    showMovieDetails(movies)
    
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
    let movieGenres = movies.genres.map(item => item.title).join('')
    //   array idi onu string eledim, ayda youtube videos dehsetda oz videom
    let movieLang =  movies.languages.map(item =>  `<img  src="https://flagcdn.com/w40/${item.toLowerCase()}.png" alt="${item}" class="w-5 h-5 rounded-full" />`).join(' ') //eger burda array icinde direct sstringdirse orda birder onun icindeki nese yazmaga gerek yoxdu diret item yaz
    console.log();
    

    // men artiq bir cos seyi ciarmiramki maplayim
        movieDetailsById.innerHTML = 
        `
            <!-- Trailer -->
            <div class="min-[770px]:w-[50%] order-first min-[770px]:order-last">
                <iframe
                    class="w-full min-[770px]:h-[50%] h-full  rounded-lg"
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
                        <p><span class="font-semibold">Altyazı:</span> <span class="text-red-500">Altyazı yoxdur</span></p>
                        <p><span class="font-semibold">Müddət:</span> ${movies.duration}</p>
                        <p><span class="font-semibold">İl:</span> 2025</p>
                        <p><span class="font-semibold">Ölkə:</span> ${movies.country}</p>
                        <p><span class="font-semibold">Rejissor:</span> ${movies.director}</p>
                        <p><span class="font-semibold">Aktorlar:</span> Cimi Gela, Selesta Barber</p>
                        <p><span class="font-semibold">Yaş Həddi:</span> 6+</p>
                        <p><span class="font-semibold">Nümayiş Tarixi:</span> 05.06.2025</p>
                    </div>
                    
                </div>
                <div class="mt-10">
                    <p>${movies.description}</p>
                </div>
            </div>
            
        `
        
}