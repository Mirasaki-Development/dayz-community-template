export function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Copy Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

export async function copyTextToClipboard(
  text: string,
  onFinish?: () => void
) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    if (onFinish) {
      onFinish();
    }
  }, function(err) {
    console.error('Async Copy: Could not copy text: ', err);
  });
}
