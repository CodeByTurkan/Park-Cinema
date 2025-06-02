const ticketSessionId  = new URLSearchParams(window.location.search).get('id')
console.log(ticketSessionId);
 const loader = document.getElementById('loader')

const ticketItems = document.getElementById('ticketItems')
async function chooseTicket() {
    const res = await fetch('https://parkcinema-data-eta.vercel.app/detail')
    const selectTicket = await res.json()
    const sessionId = selectTicket.find(item => item.sessionId == ticketSessionId)
    console.log(sessionId)
    showChosenTickets(sessionId)   
    
    loader.style.display = 'none'; 
}
chooseTicket()

function showChosenTickets(sessionId) {
        ticketItems.innerHTML = 
        `
           <div class="w-full relative h-[300px] bg-[url('img/movie-herobg.svg')] bg-cover rounded-xl z-0 overflow-hidden before:absolute before:w-full before:z-[-1] before:h-full before:bg-[#161616d6]">
            <div class="text-[#D9DADB] duration-200 p-3 max-lg:w-full md:w-1/2 lg:w-1/3 h-full flex gap-4">
                <div class=" max-md:w-[50%] md:w-[40%] rounded-xl overflow-hidden"> 
                    <img class="hover:scale-105 h-full duration-300" src="https://new.parkcinema.az/_next/image?url=https%3A%2F%2Fnew.parkcinema.az%2Fapi%2Ffile%2FgetFile%2F${sessionId.movie.image}&w=640&q=75" alt="movie" />
                </div>
                <div class="flex flex-col justify-between max-md:w-[50%]">
                    <div class="flex flex-col max-md:gap-2 md:gap-3 max-sm:text-[15px]">
                        <h1 class="text-nowrap truncate">${sessionId.movie.name}</h1>
                        <div class="flex items-center gap-3">
                        <div class="text-[18px] mt-[1px] font-semibold">
                            <div>2D</div>
                        </div>
                        </div>
                        <p class="flex items-center gap-2">
                        <img
                            src="img/date.svg" 
                        />
                        01.06.2025
                        </p>
                        <p class="flex items-center gap-2">
                        <img
                            src="img/time.svg" 
                        />
                        23:40
                        </p>
                    </div>
                    <div class="flex flex-col max-md:gap-1 md:gap-2 max-sm:text-[13px]">
                        <p class="text-[#D9DADB] !text-[16px] font-normal">
                        <span class="!text-[16px] font-semibold">Language:</span> ${sessionId.language}
                        </p>
                        <p class="text-[#D9DADB] !text-[16px] font-normal">
                        <span class="!text-[16px] font-semibold">Cinema: ${sessionId.theatreTitle}</span>
                        </p>
                        <p class="text-[#D9DADB] !text-[16px] font-normal">
                        <span class="!text-[16px] font-semibold">${sessionId.hallTitle} </span> 
                        </p>
                        <p class="text-[#D9DADB] !text-[16px] font-normal">
                            <span class="!text-[16px] font-semibold">Duration:</span> ${sessionId.movie.duration} 
                        </p>
                    </div>
                </div>
            </div>
            </div>

        `
}

const chooseSeat = document.getElementById('chooseSeat')
let totalSelectedSeats = 0
let familySeatsChosen = 0
const maxFamilySeats = 4

let familySelectionInProgress = false // Tracks if user still needs to complete family seats

// Generate seats
let code = ''
for (let row = 5; row >= 1; row--) {
  code += `<div class="flex items-center justify-between gap-2 mb-2">`
  code += `<div class="w-[40px] h-[40px] rounded-lg flex items-center justify-center text-white text-[16px] font-medium">${row}</div>`
  for (let col = 1; col <= 10; col++) {
    code += `
      <div class="seat-container flex flex-col items-center">
        <div onclick="chooseSeatPlace(this)" class="seat w-[40px] h-[40px] bg-[#D9DADB] rounded-lg flex items-center justify-center text-black text-[16px] font-medium cursor-pointer" data-selected="false" data-type="">
          ${col}
        </div>
        <div class="selectOption hidden mt-1 text-black rounded-lg border-white border-2 bg-white p-1 space-x-1 z-10" onclick="event.stopPropagation()">
          <!-- buttons injected dynamically -->
        </div>
      </div>
    `
  }
  code += `</div>`
}
chooseSeat.innerHTML = code

function chooseSeatPlace(seatElement) {
  const selected = seatElement.dataset.selected === "true"
  const seatType = seatElement.dataset.type

  // Hide all open option boxes first
  document.querySelectorAll('.selectOption').forEach(opt => opt.classList.add('hidden'))

  if (selected) {
    // Unselecting the seat
    seatElement.dataset.selected = "false"
    seatElement.dataset.type = ""
    seatElement.classList.remove('bg-red-600', 'text-white')
    seatElement.classList.add('bg-[#D9DADB]', 'text-black')

    totalSelectedSeats--

    if (seatType === 'family') {
      familySeatsChosen--
      familySelectionInProgress = true // family seats not completed if one removed
    }

    updateSummary()  // <-- Add this here to refresh summary on deselect

    return
  }

  if (familySeatsChosen < maxFamilySeats && familySelectionInProgress) {
    seatElement.dataset.selected = "true"
    seatElement.dataset.type = "family"
    seatElement.classList.remove('bg-[#D9DADB]')
    seatElement.classList.add('bg-red-600', 'text-white')

    familySeatsChosen++
    totalSelectedSeats++

    if (familySeatsChosen === maxFamilySeats) {
      familySelectionInProgress = false
    }

    updateSummary()  // <-- Add this here to refresh summary on auto family select

    return
  }

  const container = seatElement.parentElement
  const optionBox = container.querySelector('.selectOption')

  if (familySeatsChosen < maxFamilySeats) {
    optionBox.innerHTML = `
      <button onclick="selectType(this, 'family')"
              class="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200">Family</button>
      <button onclick="selectType(this, 'adult')"
              class="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200">Adult</button>
    `
    optionBox.classList.remove('hidden')
  } else {
    optionBox.innerHTML = `
      <button onclick="selectType(this, 'adultBig')"
              class="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200">Adult (Big)</button>
    `
    optionBox.classList.remove('hidden')
  }
}

function selectType(button, type) {
  const optionBox = button.parentElement
  const seat = optionBox.previousElementSibling

  if (seat.dataset.selected === "true") return

  seat.dataset.selected = "true"
  seat.dataset.type = type
  totalSelectedSeats++

  if (type === 'family') {
    familySeatsChosen++
    if (familySeatsChosen === maxFamilySeats) {
      familySelectionInProgress = false
    } else {
      familySelectionInProgress = true
    }
  }

  seat.classList.remove('bg-[#D9DADB]')
  seat.classList.add('bg-red-600', 'text-white')

  optionBox.classList.add('hidden')

  updateSummary()  // <-- Add this here to refresh summary on seat select

  console.log(`Seat chosen as: ${type}`)
  console.log(`Family seats selected: ${familySeatsChosen} / ${maxFamilySeats}`)
}


function updateSummary() {
  const seats = document.querySelectorAll('.seat[data-selected="true"]')
  const seatInfoDiv = document.getElementById('selectedSeatsInfo')
  const totalPriceSpan = document.getElementById('totalPrice')
  const bookBtn = document.getElementById('bookTicketBtn')

  if (seats.length === 0) {
    seatInfoDiv.innerHTML = `<p>No seats selected</p>`
    totalPriceSpan.textContent = '0 AZN'
    bookBtn.disabled = true
    return
  }

  let totalPrice = 0
  const seatDescriptions = []

  seats.forEach(seat => {
    const type = seat.dataset.type
    // Get seat position (row and seat number)
    const colNumber = seat.textContent.trim()
    // Row number is in the first div sibling of seat's parent container's parent (the row div)
    const rowDiv = seat.closest('div.flex.items-center.justify-between.gap-2.mb-2')
    const rowNumber = rowDiv ? rowDiv.querySelector('div').textContent.trim() : '?'

    let price = 0
    let label = ''
    if (type === 'family') {
      price = 4
      label = 'Family'
    } else if (type === 'adult') {
      price = 5
      label = 'Adult'
    } else if (type === 'adultBig') {
      price = 7 // assuming Adult (Big) costs 7 AZN, adjust if you want
      label = 'Adult (Big)'
    }

    totalPrice += price
    seatDescriptions.push(`Row ${rowNumber}, Seat ${colNumber} <span class="text-sm text-gray-300">(${label})</span>`)
  })

  // Update HTML with seat info separated by line breaks
  seatInfoDiv.innerHTML = seatDescriptions.map(desc => `<p>${desc}</p>`).join('')

  // Update total price text
  totalPriceSpan.textContent = `${totalPrice} AZN`

  bookBtn.disabled = false
}

updateSummary()