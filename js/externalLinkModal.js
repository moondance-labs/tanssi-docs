/** Grab the body so we can append the modal to it */
const main = document.querySelector('main');

/** Create the modal */
const externalLinkModalContainer = document.createElement('div');
const externalLinkModal = document.createElement('div');
const externalLinkModalHeader = document.createElement('h3');
const externalLinkModalMessage = document.createElement('p');
const closeExternalLinkModal = document.createElement('span');
const buttonWrapper = document.createElement('div');
const cancelButton = document.createElement('button');
const continueToExternalButton = document.createElement('button');
const externalLinkAnchor = document.createElement('a');

/** Add classes to modal elements so we can find and update as needed */
externalLinkModalContainer.className = 'external-link-modal-container';
externalLinkModalHeader.className = 'external-link-modal-header';
externalLinkModal.className = 'external-link-modal';
externalLinkModalMessage.className = 'external-link-message';
closeExternalLinkModal.className = 'close-modal';

/** Set the display to none to hide the modal until it is needed */
externalLinkModalContainer.style.display = 'none';

/** Set text inside the modal */
externalLinkModalHeader.innerHTML = `You're Leaving the Tanssi Documentation Website`;
externalLinkModalMessage.innerHTML =
  `A new tab will open and you'll be sent to an independent, third-party website that is not affiliated with Tanssi.`;

/** Set button text and classes */
cancelButton.innerHTML = 'Cancel';
cancelButton.classList.add('md-button');

continueToExternalButton.innerHTML = 'Continue to External Site';
continueToExternalButton.classList.add('md-button--primary', 'md-button');

buttonWrapper.classList.add('row', 'modal-buttons', 'md-typeset');

/** Set up close button */
closeExternalLinkModal.innerHTML = '&times;';
closeExternalLinkModal.onclick = () => {
  externalLinkModalContainer.style.display = 'none';
};

/** Put the modal together and append it to the main area on the page */
externalLinkModal.appendChild(closeExternalLinkModal);
externalLinkModal.appendChild(externalLinkModalHeader);
externalLinkModal.appendChild(externalLinkModalMessage);
externalLinkAnchor.appendChild(continueToExternalButton);
buttonWrapper.appendChild(cancelButton);
buttonWrapper.appendChild(externalLinkAnchor);
externalLinkModal.appendChild(buttonWrapper);
externalLinkModalContainer.appendChild(externalLinkModal);
main.append(externalLinkModalContainer);

/** Add logic so the modal pop-ups whenever an external link is clicked */
// Get all external links on the page and add this pop-up
const links = document.querySelectorAll('a');

// Origin will tell us if it's the documentation site
const origin = window.location.origin;

// We don't need to have a pop-up if the link goes to the Tanssi Network or Tanssi Foundation website
const tanssiLinks = [
  origin,
  'https://www.tanssi.network',
  'https://tanssi.network',
  'https://apps.tanssi.network/'
];
const checkIfTanssiLink = (href) => {
  return tanssiLinks.some((link) => href.startsWith(link));
};

for (let i = 0; i < links.length; i++) {
  const href = links[i].href;
  const isTanssiLink = tanssiLinks.some((link) => href.startsWith(link));

  if (!isTanssiLink && href) {
    links[i].onclick = (e) => {
      e.preventDefault();

      // Show the modal
      externalLinkModalContainer.style.display = 'block';

      // Add the original link to the Continue to External Site button
      // So when it's clicked, the user gets to their final destination
      externalLinkAnchor.href = href;
      externalLinkAnchor.setAttribute('target', '_blank');

      // Close the modal if a user clicks on one of the buttons
      cancelButton.onclick = () => {
        externalLinkModalContainer.style.display = 'none';
      };
      continueToExternalButton.onclick = () => {
        externalLinkModalContainer.style.display = 'none';
      };
    };
  } else {
    if (!href.startsWith(origin)) {
      links[i].setAttribute('target', '_blank');
    }
  }
}

const externalLinks = [];
