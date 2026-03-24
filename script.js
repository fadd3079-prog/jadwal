const schedule = {
  SENIN: [
    { matkul: "Web Design", jam: "07:00", ruang: "C202" },
    { matkul: "Pancasila", jam: "10:40", ruang: "C206" }
  ],
  SELASA: [
    { matkul: "Struktur Data", jam: "07:00", ruang: "E206" },
    { matkul: "Basis Data II", jam: "08:50", ruang: "C206" },
    { matkul: "Praktikum Struktur Data", jam: "10:30", ruang: "Lab Pemrograman" }
  ],
  RABU: [
    { matkul: "Jati Diri Unsoed", jam: "07:00", ruang: "E104" },
    { matkul: "Probabilitas", jam: "10:40", ruang: "E206" },
    { matkul: "Matematika Diskrit", jam: "13:00", ruang: "E306" }
  ],
  KAMIS: [
    { matkul: "E-Commerce", jam: "07:00", ruang: "E306" },
    { matkul: "Praktikum Sistem Operasi", jam: "13:00", ruang: "Lab Baru" }
  ],
  JUMAT: [
    { matkul: "Sistem Operasi", jam: "07:00", ruang: "C206" }
  ]
};

const hariList = ["MINGGU","SENIN","SELASA","RABU","KAMIS","JUMAT","SABTU"];
const todayName = hariList[new Date().getDay()];

const scheduleDiv = document.getElementById("schedule");
const todayDiv = document.getElementById("todayList");

// fungsi cari kelas berikutnya
function isNextClass(jam) {
  const now = new Date();
  const [h, m] = jam.split(":").map(Number);

  const kelas = new Date();
  kelas.setHours(h, m, 0);

  return kelas > now;
}

// render hari ini
if (schedule[todayName]) {
  let nextFound = false;

  schedule[todayName].forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    if (!nextFound && isNextClass(item.jam)) {
      card.classList.add("next");
      nextFound = true;
    }

    card.innerHTML = `
  <div class="title">${item.matkul}</div>
  <div class="meta">
    <div class="time">${item.jam}</div>
    <div class="room">${item.ruang}</div>
  </div>
`;
    todayDiv.appendChild(card);
  });
} else {
  todayDiv.innerHTML = `<div class="meta">Tidak ada jadwal</div>`;
}

// render semua
for (let day in schedule) {
  const section = document.createElement("div");

  section.innerHTML = `<h2>${day}</h2>`;

  schedule[day].forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="title">${item.matkul}</div>
      <div class="meta">${item.jam} | ${item.ruang}</div>
    `;

    section.appendChild(card);
  });

  scheduleDiv.appendChild(section);
}

// NOTIFIKASI
if ("Notification" in window) {
  Notification.requestPermission();
}

function checkReminder() {
  const now = new Date();
  const today = schedule[todayName];

  if (!today) return;

  today.forEach(item => {
    const [h, m] = item.jam.split(":").map(Number);

    const target = new Date();
    target.setHours(h);
    target.setMinutes(m - 35);
    target.setSeconds(0);

    if (Math.abs(now - target) < 60000) {
      new Notification("Pengingat", {
        body: `${item.matkul} ${item.jam} (${item.ruang})`
      });
    }
  });
}

setInterval(checkReminder, 30000);
