const textInput = document.getElementById('text-input');
const speakButton = document.getElementById('speak-btn');
const voiceSelect = document.getElementById('voice-select');
// document.getElementById('signin-btn').addEventListener('click', function() {
//     // Handle sign-in logic here
//     alert('Sign In button clicked!');
// });


let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

window.speechSynthesis.onvoiceschanged = loadVoices;

function speakText() {
    const text = textInput.value;
    if (text === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
}

speakButton.addEventListener('click', speakText);

document.addEventListener('DOMContentLoaded', function() {
    const signinButton = document.getElementById('signin-btn');
    const signoutButton = document.getElementById('signout-btn');

    // Check login state on page load
    if (localStorage.getItem('isSignedIn') === 'true') {
        signinButton.style.display = 'none';
        signoutButton.style.display = 'inline-block';
    }

    // Handle "Sign In" click
    signinButton.addEventListener('click', function() {
        // Simulate sign-in action
        alert('Successfully signed in!');
        localStorage.setItem('isSignedIn', 'true');

        signinButton.style.display = 'none';
        signoutButton.style.display = 'inline-block';
    });

    // Handle "Sign Out" click
    signoutButton.addEventListener('click', function() {
        // Simulate sign-out action
        alert('Successfully signed out!');
        localStorage.setItem('isSignedIn', 'false');

        signoutButton.style.display = 'none';
        signinButton.style.display = 'inline-block';
    });
});
