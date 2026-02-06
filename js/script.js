const scheduleData = [
  {
    code: "IF21208",
    name: "Web Design",
    class: "B",
    day: "SENIN",
    time: "07:00:00-08:45:00",
    room: "Gedung Teknik C 202",
    sks: 2,
  },
  {
    code: "UNO101",
    name: "Pancasila",
    class: "B",
    day: "SENIN",
    time: "10:40:00-12:25:00",
    room: "Gedung Teknik C 206",
    sks: 2,
  },
  {
    code: "IF21203",
    name: "Struktur Data",
    class: "B",
    day: "SELASA",
    time: "07:00:00-08:45:00",
    room: "Gedung Teknik E 206",
    sks: 3,
  },
  {
    code: "IF21202",
    name: "Basis Data II",
    class: "B",
    day: "SELASA",
    time: "08:50:00-10:35:00",
    room: "Gedung Teknik C 206",
    sks: 2,
  },
  {
    code: "UNO114",
    name: "Jati Diri Unsoed",
    class: "B",
    day: "RABU",
    time: "07:00:00-08:45:00",
    room: "Gedung Teknik E 104",
    sks: 2,
  },
  {
    code: "IF21201",
    name: "Probabilitas & Statistika",
    class: "B",
    day: "RABU",
    time: "10:40:00-12:25:00",
    room: "Gedung Teknik E 206",
    sks: 2,
  },
  {
    code: "IF21205",
    name: "Matematika Diskrit",
    class: "B",
    day: "RABU",
    time: "13:00:00-14:45:00",
    room: "Gedung Teknik E 306",
    sks: 3,
  },
  {
    code: "IF21209",
    name: "E-Commerce",
    class: "B",
    day: "KAMIS",
    time: "07:00:00-08:45:00",
    room: "Gedung Teknik E 306",
    sks: 2,
  },
  {
    code: "IF21206",
    name: "Sistem Operasi",
    class: "B",
    day: "JUMAT",
    time: "07:00:00-08:45:00",
    room: "Gedung Teknik C 206",
    sks: 3,
  },

  {
    code: "IF21204",
    name: "Praktikum Str. Data",
    class: "G",
    day: "TBA",
    time: "TBA",
    room: "LAB. Pemrograman",
    sks: 1,
  },
  {
    code: "IF21207",
    name: "Praktikum Sisop",
    class: "H",
    day: "TBA",
    time: "TBA",
    room: "Gedung Teknik F212",
    sks: 1,
  },
];

const dayMap = {
  MINGGU: 0,
  SENIN: 1,
  SELASA: 2,
  RABU: 3,
  KAMIS: 4,
  JUMAT: 5,
  SABTU: 6,
};

const dayNames = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const formatTime = (timeStr) => {
  if (timeStr === "TBA") return "TBA";
  const [start, end] = timeStr.split("-");
  const cleanStart = start.substring(0, 5);
  const cleanEnd = end ? end.substring(0, 5) : "";
  return `${cleanStart} - ${cleanEnd}`;
};

const formatRoom = (roomStr) => {
  return roomStr.replace("Gedung Teknik", "GT").replace("GEDUNG TEKNIK", "GT");
};

document.addEventListener("DOMContentLoaded", () => {
  const todayIndex = new Date().getDay();
  const todayName = dayNames[todayIndex].toUpperCase();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("current-date").innerText =
    new Date().toLocaleDateString("id-ID", options);

  const todayContainer = document.getElementById("today-container");
  const scheduleContainer = document.getElementById("schedule-container");

  const todaySchedule = scheduleData.filter((item) => item.day === todayName);

  const allSchedule = scheduleData.sort((a, b) => {
    const dayA = dayMap[a.day] || 99;
    const dayB = dayMap[b.day] || 99;
    return dayA - dayB;
  });

  const groupedSchedule = allSchedule.reduce((acc, item) => {
    const day = item.day;
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const createCard = (item, isToday = false) => {
    const timeDisplay = formatTime(item.time);
    const roomDisplay = formatRoom(item.room);
    const activeClass = isToday ? "is-today" : "";

    return `
            <article class="card ${activeClass}">
                <div class="card-header">
                    <div class="time-slot">${timeDisplay}</div>
                    <div class="room-badge">${roomDisplay}</div>
                </div>
                <div class="course-name">${item.name}</div>
                <div class="card-footer">
                    <div class="meta-info">
                        <span>${item.code} (${item.class})</span>
                        <span>${item.sks} SKS</span>
                    </div>
                    ${
                      !isToday ? `<div class="day-label">${item.day}</div>` : ""
                    }
                </div>
            </article>
        `;
  };

  if (todaySchedule.length > 0) {
    todayContainer.innerHTML = todaySchedule
      .map((item) => createCard(item, true))
      .join("");
  } else {
    todayContainer.innerHTML = `
            <div class="empty-state">
                <p>☕ Tidak ada jadwal kuliah hari ini. Istirahatlah!</p>
            </div>
        `;
  }

  let html = "";
  for (const day in groupedSchedule) {
    const dayDisplay =
      day === "TBA"
        ? "TBA"
        : dayNames[dayMap[day]].charAt(0).toUpperCase() +
          dayNames[dayMap[day]].slice(1).toLowerCase();
    html += `<h3 class="day-header">${dayDisplay}</h3>`;
    html += groupedSchedule[day].map((item) => createCard(item)).join("");
  }
  scheduleContainer.innerHTML = html;
});
