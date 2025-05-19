function submitBootcampForm() {
  const form = document.getElementById("bootcampForm");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const parentEmail = form.parent_email.value.trim();
  const childEmail = form.child_email.value.trim();
  const parentPhone = form.parent_phone.value.trim();

  // Check all required fields except child_email
  const requiredFields = [
    "parent_full_name",
    "parent_email",
    "parent_phone",
    "child_name",
    "child_gender",
    "birth_date",
    "grade",
    "address",
    "city",
    "state",
    "zip_code",
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

  if (childEmail && !emailRegex.test(childEmail)) {
    alert("Please enter a valid Child Email (e.g., child@example.com).");
    form.child_email.focus();
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
      email: childEmail,
      address: form.address.value.trim(),
      city: form.city.value.trim(),
      state: form.state.value.trim(),
      zip_code: form.zip_code.value.trim(),
      special_case: form.special_case.value.trim(),
      schedule_availability: form.schedule_availability.value.trim(),
    },
  };

  console.log(data);

  fetch("https://api.kids.cyaxiom.com/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then((result) => {
      alert("Your submission has been successful. We’ll notify you soon!");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to submit the form. Please try again.");
    });
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
