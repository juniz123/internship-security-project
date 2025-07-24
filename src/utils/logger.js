// Already present
export function logFailedLogin(email, ip) {
  const timestamp = new Date().toISOString();
  const log = JSON.parse(localStorage.getItem('failedLoginLog')) || [];
  log.push({ timestamp, email, ip });
  localStorage.setItem('failedLoginLog', JSON.stringify(log));
}

// ➕ ADD THIS BELOW IT
export const getFailedLoginLogs = () => {
  return JSON.parse(localStorage.getItem('failedLoginLog')) || [];
};
