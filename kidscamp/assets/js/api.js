function submitBootcampForm() {
  const form = document.getElementById("bootcampForm");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const parentEmail = form.parent_email.value.trim();
  const childEmail = form.child_email.value.trim();
  const parentPhone = form.parent_phone.value.trim();

  if (!emailRegex.test(parentEmail)) {
    alert("Please enter a valid Guardian Email (e.g., abcd@gmail.com).");
    return;
  }

  if (childEmail && !emailRegex.test(childEmail)) {
    alert("Please enter a valid Child Email (e.g., child@example.com).");
    return;
  }

  const data = {
    parent: {
      full_name: form.parent_full_name.value,
      email: parentEmail,
      phone: parentPhone,
    },
    child: {
      name: form.child_name.value,
      gender: form.child_gender.value,
      birth_date: form.birth_date.value,
      grade: form.grade.value,
      email: childEmail,
      address: form.address.value,
      city: form.city.value,
      state: form.state.value,
      zip_code: form.zip_code.value,
      special_case: form.special_case.value,
      schedule_availability: form.schedule_availability.value,
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
      alert("Form submitted successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to submit the form. Please try again.");
    });
}
