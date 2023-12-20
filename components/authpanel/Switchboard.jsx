import React from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../states/auth/authState';

const Switchboard = () => {
  const [authStates, setAuthStates] = useRecoilState(authState);
  const [currentPlatform, setCurrentPlatform] = React.useState(null);

// Initiate OAuth flow here if needed  const handleToggle = (platform) => {
    setAuthStates({ ...authStates, [platform]: !authStates[platform] });
    setCurrentPlatform(platform);
     // Initiate OAuth flow here if needed
  };

  // Rest of the component remains the same
  // ...

  return (
    <div>
      <table>
        {Object.entries(toggles).map(([platform, isEnabled]) => (
          <tr key={platform}>
            <td>{platform}</td>
            <td>
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={() => handleToggle(platform)}
              />
            </td>
          </tr>
        ))}
      </table>
      {currentPlatform && (
        <div className="modal">
          <p>Authenticate with {currentPlatform}</p>
          <button onClick={() => initiateOAuthFlow(currentPlatform)}>
            Start Authentication
          </button>
          <button onClick={() => setCurrentPlatform(null)}>Close</button>
        </div>
      )}
    </div>
  );
export default Switchboard;