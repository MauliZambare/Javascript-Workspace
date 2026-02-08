// ✅ Initialize EmailJS
(function () {
  emailjs.init("s6ZSoodVSvkjpOLUh"); // 🔑 paste your PUBLIC KEY here
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const status = document.getElementById("status");
  status.style.color = "black";
  status.innerText = "Sending message...";

  emailjs.sendForm(
    "service_cfu8ugg",     // ✅ UPDATED SERVICE ID
    "template_kn2icph",    // 🔑 paste TEMPLATE ID here
    this
  )
  .then(() => {
    status.style.color = "green";
    status.innerText = "Message sent successfully!";
    this.reset();
  })
  .catch((error) => {
    status.style.color = "red";
    status.innerText = "Failed to send message!";
    console.error("EmailJS Error:", error);
  });
});
