// import React from 'react';

// const Header = () => {
//   return (
//     <div style={headerStyles.container}>
//       <h1 style={headerStyles.title}>Become the ultimate Quizard</h1>
//     </div>
//   );
// };

// const headerStyles = {
//   container: {
//     textAlign: 'center',
//     // Remove background gradient if you don't want a background
//     background: 'none',  // No background
//     padding: '20px',
//     marginBottom: '20px',  // Add margin if you want some spacing
//   },
//   title: {
//     color: 'white',
//     fontSize: '36px', // Adjust the size as necessary
//   },
// };

// export default Header;
import React from 'react';

const Header = () => {
  return (
    <div style={headerStyles.container}>
      <h1 style={headerStyles.title}>Become the ultimate Quizard</h1>
    </div>
  );
};

const headerStyles = {
  container: {
    position: 'fixed', // Keep header fixed at the top
    top: '150px',
    left: 0,
    right: 0,
    textAlign: 'center',

    padding: '20px 0',
    zIndex: 1000, // Ensure the header is above other content
  },
  title: {
    color: 'white',
    fontSize: '50px', // Adjust as needed
    margin: '0',
  },
};

export default Header;

