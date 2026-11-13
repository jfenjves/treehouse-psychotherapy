// Sends the contact form to Formspree without leaving the page.
// Without JavaScript the form still posts normally and Formspree shows its own thank-you page.

const form = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (form && formStatus) {
  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.textContent;

  const showStatus = (message, isError) => {
    formStatus.textContent = message;
    formStatus.classList.toggle('is-error', isError);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    button.disabled = true;
    button.textContent = 'Sending…';
    showStatus('', false);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Formspree responded ${response.status}`);
      }

      form.hidden = true;
      showStatus("Thank you for reaching out. Your message has been sent, and I'll be in touch soon.", false);
      formStatus.focus();
    } catch (error) {
      showStatus('Sorry, your message could not be sent. Please try again in a moment.', true);
    } finally {
      button.disabled = false;
      button.textContent = buttonLabel;
    }
  });
}
