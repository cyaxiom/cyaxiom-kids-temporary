function submitBootcampForm() {
  const form = document.getElementById("bootcampForm");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const parentEmail = form.parent_email.value.trim();
  const parentPhone = form.parent_phone.value.trim();

  // 🔍 Age Validation (must be under 17)
  const birthDate = new Date(form.birth_date.value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age >= 17) {
    showAgeWarningModal();
    return;
  }

  // Required fields (child_email, zip_code, address, schedule_availability removed)
  const requiredFields = [
    "parent_full_name",
    "parent_email",
    "parent_phone",
    "child_name",
    "child_gender",
    "birth_date",
    "grade",
    "city",
    "state",
  ];

  for (let field of requiredFields) {
    const input = form[field];
    if (!input || !input.value.trim()) {
      alert("Please fill in all required fields.");
      input.focus();
      return;
    }
  }

  if (!emailRegex.test(parentEmail)) {
    alert("Please enter a valid Guardian Email (e.g., abcd@example.com).");
    form.parent_email.focus();
    return;
  }

  const data = {
    parent: {
      full_name: form.parent_full_name.value.trim(),
      email: parentEmail,
      phone: parentPhone,
    },
    child: {
      name: form.child_name.value.trim(),
      gender: form.child_gender.value,
      birth_date: form.birth_date.value,
      grade: form.grade.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      special_case: form.special_case.value.trim(),
    },
  };

  console.log(data);

  // fetch("https://api.kids.cyaxiom.com/api/auth/register", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (!response.ok) throw new Error("Network error");
  //     return response.json();
  //   })
  //   .then((result) => {
  //     alert("Your submission has been successful. We’ll notify you soon!");
  //     form.reset();
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     alert("Failed to submit the form. Please try again.");
  //   });
}

function setCountdownDate(daysFromNow = 20) {
  const countdownEl = document.querySelector(".time-countdown[data-countdown]");
  const now = new Date();
  const targetDate = new Date(
    now.getTime() + daysFromNow * 24 * 60 * 60 * 1000
  );

  // Format as yyyy/mm/dd for consistency
  const formattedDate = `${targetDate.getFullYear()}/${
    targetDate.getMonth() + 1
  }/${targetDate.getDate()}`;
  countdownEl.setAttribute("data-countdown", formattedDate);
  return targetDate;
}

function startCountdown(targetDate) {
  const countdownEl = document.querySelector(".time-countdown[data-countdown]");

  function updateCountdown() {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdownEl.innerHTML = "Expired";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.innerHTML = `
      <span><strong>${days}</strong> Days</span>
      <span><strong>${hours}</strong> Hrs</span>
      <span><strong>${minutes}</strong> Min</span>
      <span><strong>${seconds}</strong> Sec</span>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const targetDate = setCountdownDate(20); // Set countdown date to 20 days from today
startCountdown(targetDate);

function handleSubscribeClick() {
  const form = document.getElementById("subscribeForm");
  const emailInput = form.email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput)) {
    alert("Please enter a valid email address (e.g., example@gmail.com).");
    return;
  }

  // Delay 1.5 seconds before showing success message
  setTimeout(() => {
    alert("Thank you for subscribing!");
    form.reset(); // Clear the form
  }, 1500);
}

// 👇 Modal for age restriction (17 or older)
function showAgeWarningModal() {
  const existingModal = document.getElementById("ageModal");
  if (existingModal) return;

  const modal = document.createElement("div");
  modal.id = "ageModal";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  modal.innerHTML = `
   <div id="ageModal" style="
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
">
  <div style="
    background: rgba(255, 255, 255, 0.9);
    border-radius: 18px;
    padding: 40px 32px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    text-align: center;
    font-family: 'Segoe UI', sans-serif;
    position: relative;
    transform: scale(0.95);
    animation: zoomFade 0.4s ease-out forwards;
  ">
    <button onclick="document.getElementById('ageModal').remove();" style="
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      font-size: 24px;
      color: #6b7280;
      cursor: pointer;
      transition: color 0.2s;
    " onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#6b7280'">&times;</button>

    <h2 style="color: #dc2626; font-size: 28px; margin-bottom: 18px;">Access Denied</h2>

    <p style="font-size: 16px; color: #374151; margin-bottom: 28px; line-height: 1.7;">
      The <strong>EthioHope Kids Bootcamp</strong> is open to students <strong>under 17</strong> years old only.
      <br /><br />
      If you're 17 or older, explore more opportunities on our main learning platform.
    </p>

    <button onclick="window.location.href='https://www.cyaxiom.com';" style="
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      color: white;
      border: none;
      padding: 14px 26px;
      border-radius: 12px;
      font-size: 15.5px;
      font-weight: 500;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 14px rgba(30, 64, 175, 0.5)'" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.4)'">
      Visit CyAxiom.com
    </button>
  </div>

  <style>
    @keyframes zoomFade {
      0% {
        opacity: 0;
        transform: scale(0.95);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  </style>
</div>

  `;
  document.body.appendChild(modal);

  // Optional: Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target.id === "ageModal") {
      document.body.removeChild(modal);
    }
  });
}
