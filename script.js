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

    const allCards  = document.getElementById('allCards')


    async function getMovieCards() {
        const res = await fetch('https://parkcinema-data-eta.vercel.app/landing')
        const movieData = await res.json()
        console.log(movieData);
        showMovieCards(movieData)
    }
    getMovieCards()

    function showMovieCards(movieData){
        let code = ''
        
        movieData.map(item => {
            let movieLanguage = item.languages.map(item => ` <img src="https://flagcdn.com/w40/${item.toLowerCase()}.png" alt="${item}" class="w-5 h-5 rounded-full" />`)
           
            let date = item.firstScreeningDate
            let splittedDate = date.split('T')[0].split('-').reverse().join('.')            
            code += `
                <div onclick="window.location.href='details.htm?id=${item.id}'" class="relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-lg text-white">
                    <img  src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${item.image}&w=640&q=75" alt="Sharp Corner Poster" class="w-full h-auto object-cover" />
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <h2 class="text-lg font-semibold">${item.name}</h2>
                        <p class="text-sm text-gray-300">${splittedDate}</p>
                        <div class="flex items-center justify-between mt-1">
                            <span class="text-xs bg-gray-700 px-2 py-0.5 rounded">18+</span>
                            <p class="font-semibold flex gap-2">${movieLanguage}</p>
                           
                        </div>
                    </div>
                </div>

            `
        })
        allCards.innerHTML = code
    }

